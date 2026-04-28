import React from 'react';
import { ExternalLink, Calendar } from 'lucide-react';

const BlogCard = ({ blog }) => {
  const { title, preview, tag, externalUrl, createdAt } = blog;
  const date = new Date(createdAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <div className="glass rounded-2xl overflow-hidden hover:shadow-xl transition-all border-white/10 flex flex-col h-full opacity-0 translate-y-8">
      {blog.image?.url && (
        <div className="aspect-video w-full overflow-hidden">
          <img src={blog.image.url} alt={title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
        </div>
      )}
      <div className="p-6 flex flex-col flex-grow">
      <div className="flex justify-between items-start mb-4">
        <span className={`text-[10px] uppercase tracking-widest font-bold px-2 py-1 rounded-md ${
          tag === 'LinkedIn' ? 'bg-blue-600/10 text-blue-600' : 
          tag === 'Hashnode' ? 'bg-blue-400/10 text-blue-400' :
          tag === 'Education' ? 'bg-purple-500/10 text-purple-500' :
          'bg-accent-orange/10 text-accent-orange'
        }`}>
          {tag}
        </span>
        <span className="text-xs text-slate-500 flex items-center gap-1">
          <Calendar size={12} /> {date}
        </span>
      </div>

      <h3 className="text-xl font-bold mb-3 line-clamp-2 leading-tight hover:text-accent-orange transition-colors cursor-pointer">
        {title}
      </h3>
      
      <p className="text-slate-500 dark:text-slate-400 text-sm mb-6 line-clamp-3">
        {preview}
      </p>

      <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between">
        {externalUrl ? (
          <a 
            href={externalUrl} 
            target="_blank" 
            rel="noreferrer" 
            className="text-accent-orange text-xs font-bold flex items-center gap-1 hover:underline"
          >
            Read on {tag} <ExternalLink size={12} />
          </a>
        ) : (
          <button className="text-accent-orange text-xs font-bold hover:underline">
            Read Full Article
          </button>
        )}
      </div>
      </div>
    </div>
  );
};

export default BlogCard;
