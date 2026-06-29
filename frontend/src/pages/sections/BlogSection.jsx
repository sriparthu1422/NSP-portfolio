import React from 'react';
import SectionHeading from '../../components/common/SectionHeading';
import Section from '../../components/layout/Section';
import Spinner from '../../components/common/Spinner';
import EmptyState from '../../components/common/EmptyState';
import BlogCard from '../../components/cards/BlogCard';

const BlogSection = ({ blogs, loading }) => {
  React.useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        document.title = "Blog of SriParthu | Full Stack Developer, Digital Marketer & AI Enthusiast";
        document.querySelector('meta[name="description"]')?.setAttribute("content", "Read the latest articles and blog posts by SriParthu on web development, digital marketing, AI technologies, and industry trends.");
      }
    }, { threshold: 0.3 });
    
    const section = document.getElementById('blog');
    if (section) observer.observe(section);
    return () => {
      if (section) observer.unobserve(section);
    };
  }, []);

  return (
    <Section id="blog">
      <SectionHeading subtitle="Sharing insights on technologies and industry trends.">
        Latest Posts
      </SectionHeading>

      {loading ? (
        <Spinner />
      ) : blogs.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 grid-stagger">
          {blogs.map((blog) => (
            <BlogCard key={blog._id} blog={blog} />
          ))}
        </div>
      ) : (
        <EmptyState message="No posts found yet. Check back later!" />
      )}
    </Section>
  );
};

export default BlogSection;
