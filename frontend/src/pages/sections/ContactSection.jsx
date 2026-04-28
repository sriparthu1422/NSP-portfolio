import React from 'react';
import SectionHeading from '../../components/common/SectionHeading';
import Section from '../../components/layout/Section';
import ContactForm from '../../components/forms/ContactForm';

const ContactSection = () => (
  <Section id="contact">
    <SectionHeading subtitle="Interested in working together? Let's connect.">
      Get In Touch
    </SectionHeading>
    <div className="max-w-2xl mx-auto glass p-6 sm:p-8 md:p-12 rounded-2xl md:rounded-3xl">
      <ContactForm />
    </div>
  </Section>
);

export default ContactSection;
