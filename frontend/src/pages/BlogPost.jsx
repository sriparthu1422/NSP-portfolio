import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { ArrowLeft, Calendar, Loader2 } from 'lucide-react';

const BlogPost = () => {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const { data } = await axios.get(`/api/v1/blogs/slug/${slug}`);
        setBlog(data.data);
      } catch (err) {
        setError('Post not found');
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loader2 className="animate-spin text-accent-orange" size={40} />
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold mb-4">Post not found</h1>
        <Link to="/#blog" className="text-accent-orange hover:underline">
          ← Back to blog
        </Link>
      </div>
    );
  }

  const date = new Date(blog.createdAt).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <article className="max-w-3xl mx-auto px-4 py-12 md:py-16">
      <Link
        to="/#blog"
        className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-accent-orange mb-8 transition-colors"
      >
        <ArrowLeft size={16} /> Back to all posts
      </Link>

      {blog.image?.url && (
        <div className="aspect-video rounded-2xl overflow-hidden mb-8 border border-white/10">
          <img src={blog.image.url} alt={blog.title} className="w-full h-full object-cover" />
        </div>
      )}

      <header className="mb-10">
        <span className="text-[10px] uppercase tracking-widest font-bold px-2 py-1 rounded-md bg-accent-orange/10 text-accent-orange">
          {blog.tag}
        </span>
        <h1 className="text-3xl md:text-4xl font-display font-bold mt-4 mb-4 leading-tight">
          {blog.title}
        </h1>
        <p className="text-slate-500 flex items-center gap-2 text-sm">
          <Calendar size={14} /> {date}
        </p>
        {blog.preview && (
          <p className="text-lg text-slate-600 dark:text-slate-400 mt-4 leading-relaxed">
            {blog.preview}
          </p>
        )}
      </header>

      <div className="blog-content space-y-4 text-slate-700 dark:text-slate-300 leading-relaxed [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:font-display [&_h2]:mt-10 [&_h2]:mb-4 [&_h3]:text-xl [&_h3]:font-bold [&_h3]:mt-8 [&_h3]:mb-3 [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:list-decimal [&_ol]:pl-6 [&_a]:text-accent-orange [&_a]:underline [&_table]:w-full [&_table]:text-sm [&_th]:border [&_th]:border-white/10 [&_th]:p-2 [&_td]:border [&_td]:border-white/10 [&_td]:p-2 [&_hr]:border-white/10 [&_hr]:my-8">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{blog.content}</ReactMarkdown>
      </div>
    </article>
  );
};

export default BlogPost;
