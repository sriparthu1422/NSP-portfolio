import React, { useRef } from 'react';
import useScrollReveal from '../hooks/useScrollReveal';
import useFetchData from '../hooks/useFetchData';

// Section components
import HeroSection from './sections/HeroSection';
import AboutSection from './sections/AboutSection';
import ProjectsSection from './sections/ProjectsSection';
import BlogSection from './sections/BlogSection';
import ContactSection from './sections/ContactSection';

const Home = () => {
  const containerRef = useRef();
  const { data: projects, loading: projLoading } = useFetchData('/api/v1/projects');
  const { data: blogs, loading: blogLoading } = useFetchData('/api/v1/blogs');

  // Initialize scroll-reveal animations for all sections
  useScrollReveal(containerRef, [projects, blogs]);

  return (
    <div ref={containerRef} className="space-y-20 md:space-y-32 pb-16 md:pb-20 overflow-hidden">
      <HeroSection />
      <AboutSection />
      <ProjectsSection projects={projects} loading={projLoading} />
      <BlogSection blogs={blogs} loading={blogLoading} />
      <ContactSection />
    </div>
  );
};

export default Home;
