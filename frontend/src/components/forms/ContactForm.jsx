import React, { useState, useRef } from 'react';
import axios from 'axios';
import { Send, CheckCircle, AlertCircle } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [status, setStatus] = useState('idle'); // idle, loading, success, error
  const [errorMessage, setErrorMessage] = useState('');
  const formRef = useRef();
  const successRef = useRef();

  useGSAP(() => {
    if (status === 'success') {
      gsap.fromTo(successRef.current, 
        { opacity: 0, y: 10, scale: 0.95 }, 
        { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: 'back.out(2)' }
      );
    }
  }, { dependencies: [status], scope: formRef });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');
    try {
      await axios.post('/api/v1/contacts', formData);
      setStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setStatus('idle'), 5000);
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Failed to send message. Please check your internet or try again.';
      console.error('Submission error:', err.response?.data || err.message);
      setErrorMessage(errorMsg);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  const onInputFocus = (e) => {
    gsap.to(e.target, { scale: 1.01, duration: 0.3, ease: 'power2.out' });
  };

  const onInputBlur = (e) => {
    gsap.to(e.target, { scale: 1, duration: 0.3, ease: 'power2.in' });
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label htmlFor="contact-name" className="text-sm font-bold text-slate-500 uppercase tracking-wider">Name</label>
          <input
            id="contact-name"
            type="text"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            onFocus={onInputFocus}
            onBlur={onInputBlur}
            className="w-full bg-white/50 dark:bg-slate-900/50 border border-white/20 dark:border-slate-800/20 rounded-xl px-4 py-3 focus:border-accent-orange focus:ring-1 focus:ring-accent-orange outline-none transition-all shadow-sm"
            placeholder="Your Name"
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="contact-email" className="text-sm font-bold text-slate-500 uppercase tracking-wider">Email</label>
          <input
            id="contact-email"
            type="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            onFocus={onInputFocus}
            onBlur={onInputBlur}
            className="w-full bg-white/50 dark:bg-slate-900/50 border border-white/20 dark:border-slate-800/20 rounded-xl px-4 py-3 focus:border-accent-orange focus:ring-1 focus:ring-accent-orange outline-none transition-all shadow-sm"
            placeholder="Your Email"
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <label htmlFor="contact-subject" className="text-sm font-bold text-slate-500 uppercase tracking-wider">Subject</label>
        <input
          id="contact-subject"
          type="text"
          name="subject"
          required
          value={formData.subject}
          onChange={handleChange}
          onFocus={onInputFocus}
          onBlur={onInputBlur}
          className="w-full bg-white/50 dark:bg-slate-900/50 border border-white/20 dark:border-slate-800/20 rounded-xl px-4 py-3 focus:border-accent-orange focus:ring-1 focus:ring-accent-orange outline-none transition-all shadow-sm"
          placeholder="Project Inquiry"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="contact-message" className="text-sm font-bold text-slate-500 uppercase tracking-wider">Message</label>
        <textarea
          id="contact-message"
          name="message"
          required
          rows="5"
          value={formData.message}
          onChange={handleChange}
          onFocus={onInputFocus}
          onBlur={onInputBlur}
          className="w-full bg-white/50 dark:bg-slate-900/50 border border-white/20 dark:border-slate-800/20 rounded-xl px-4 py-3 focus:border-accent-orange focus:ring-1 focus:ring-accent-orange outline-none transition-all resize-none shadow-sm"
          placeholder="Tell me about your project..."
        ></textarea>
      </div>

      <button
        type="submit"
        disabled={status === 'loading'}
        className={`w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all active:scale-[0.98] ${
          status === 'loading' ? 'bg-slate-400 cursor-not-allowed' : 'bg-accent-orange text-white hover:shadow-lg hover:shadow-orange-500/30'
        }`}
      >
        {status === 'loading' ? 'Sending...' : status === 'success' ? 'Sent!' : 'Send Message'}
        {status === 'success' ? <CheckCircle size={20} /> : <Send size={20} />}
      </button>

      {status === 'success' && (
        <div ref={successRef} className="flex flex-col items-center gap-3 p-6 glass border-green-500/50 text-green-500 rounded-2xl animate-in zoom-in duration-500">
          <div className="bg-green-500/20 p-3 rounded-full">
            <CheckCircle size={32} />
          </div>
          <p className="font-bold text-lg">Message Sent Successfully!</p>
          <p className="text-slate-400 text-sm">I'll get back to you as soon as possible.</p>
        </div>
      )}
      {status === 'error' && (
        <div className="flex items-center gap-2 text-red-500 text-sm justify-center p-4 glass border-red-500/20 rounded-xl">
          <AlertCircle size={16} /> 
          <span>{errorMessage}</span>
        </div>
      )}
    </form>
  );
};

export default ContactForm;
