import asyncHandler from '../middleware/asyncHandler.js';
import Contact from '../models/Contact.js';
import nodemailer from 'nodemailer';

// @desc    Submit contact form
// @route   POST /api/v1/contacts
// @access  Public
export const submitContact = asyncHandler(async (req, res, next) => {
  const contact = await Contact.create(req.body);

  // Send email (optional background task)
  // Simplified for now
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: `"${process.env.FROM_NAME}" <${process.env.FROM_EMAIL}>`,
      to: process.env.FROM_EMAIL,
      subject: `New Portfolio Inquiry: ${req.body.subject}`,
      text: `Name: ${req.body.name}\nEmail: ${req.body.email}\n\nMessage:\n${req.body.message}`,
    });
  } catch (err) {
    console.error('Email failed to send:', err.message);
  }

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
