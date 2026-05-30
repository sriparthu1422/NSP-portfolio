import asyncHandler from '../middleware/asyncHandler.js';
import Contact from '../models/Contact.js';
import nodemailer from 'nodemailer';
import { z } from 'zod';

// @desc    Submit contact form
// @route   POST /api/v1/contacts
// @access  Public
export const submitContact = asyncHandler(async (req, res, next) => {
  const contactSchema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters').max(50),
    email: z.string().email('Invalid email address'),
    subject: z.string().min(2, 'Subject must be at least 2 characters').max(100),
    message: z.string().min(10, 'Message must be at least 10 characters').max(2000),
  });

  const parsed = contactSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ message: parsed.error.issues[0].message });
  }

  const contact = await Contact.create(parsed.data);

  // Send email (Non-blocking background task)
  const sendEmail = async () => {
    try {
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        secure: process.env.SMTP_PORT == 465,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
        connectionTimeout: 5000, // 5 seconds timeout
      });

      await transporter.sendMail({
        from: `"${process.env.FROM_NAME}" <${process.env.FROM_EMAIL}>`,
        to: process.env.FROM_EMAIL,
        subject: `New Portfolio Inquiry: ${req.body.subject}`,
        text: `Name: ${req.body.name}\nEmail: ${req.body.email}\n\nMessage:\n${req.body.message}`,
      });
    } catch (err) {
      console.error('Background Email failed:', err.message);
    }
  };

  // Trigger email in background without 'await' to respond to user immediately
  sendEmail();

  res.status(201).json({
    success: true,
    data: contact,
  });
});

// @desc    Get all contact messages
// @route   GET /api/v1/contacts
// @access  Private
export const getContacts = asyncHandler(async (req, res, next) => {
  const contacts = await Contact.find().sort('-createdAt');

  res.status(200).json({
    success: true,
    count: contacts.length,
    data: contacts,
  });
});

// @desc    Delete contact message
// @route   DELETE /api/v1/contacts/:id
// @access  Private
export const deleteContact = asyncHandler(async (req, res, next) => {
  const contact = await Contact.findById(req.params.id);

  if (!contact) {
    return res.status(404).json({ message: 'Contact not found' });
  }

  await contact.deleteOne();

  res.status(200).json({
    success: true,
    data: {},
  });
});
