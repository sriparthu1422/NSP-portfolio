import React from 'react';
import SectionHeading from '../../components/common/SectionHeading';
import Section from '../../components/layout/Section';
import Spinner from '../../components/common/Spinner';
import EmptyState from '../../components/common/EmptyState';
import BlogCard from '../../components/cards/BlogCard';

const BlogSection = ({ blogs, loading }) => (
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

export default BlogSection;
