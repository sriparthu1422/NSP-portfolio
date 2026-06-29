import React from 'react';
import SectionHeading from '../../components/common/SectionHeading';
import Section from '../../components/layout/Section';
import ContactForm from '../../components/forms/ContactForm';

const ContactSection = () => {
  React.useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        document.title = "Contact SriParthu | Full Stack Developer, Digital Marketer & AI Enthusiast";
        document.querySelector('meta[name="description"]')?.setAttribute("content", "Get in touch with SriParthu for freelance projects, full-stack development opportunities, digital marketing collaborations, and AI solutions.");
      }
    }, { threshold: 0.3 });
    
    const section = document.getElementById('contact');
    if (section) observer.observe(section);
    return () => {
      if (section) observer.unobserve(section);
    };
  }, []);

  return (
    <Section id="contact">
      <SectionHeading subtitle="Interested in working together? Let's connect.">
        Get In Touch
      </SectionHeading>
      <div className="max-w-2xl mx-auto glass p-6 sm:p-8 md:p-12 rounded-2xl md:rounded-3xl">
        <ContactForm />
      </div>
    </Section>
  );
};

export default ContactSection;
