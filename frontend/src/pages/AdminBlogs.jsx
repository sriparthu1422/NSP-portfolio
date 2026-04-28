import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Plus, Edit2, Trash2, X, Link as LinkIcon, Loader2, Search, ExternalLink, Calendar } from 'lucide-react';

const AdminBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBlog, setEditingBlog] = useState(null);
  const [fetchingMetadata, setFetchingMetadata] = useState(false);
  const [importUrl, setImportUrl] = useState('');

  const [formData, setFormData] = useState({
    title: '',
    preview: '',
    content: '',
    tag: 'Technical',
    externalUrl: '',
    image: { url: '', publicId: '' },
    isPublished: true,
  });

  const fetchBlogs = async () => {
    try {
      const { data } = await axios.get('/api/v1/blogs');
      setBlogs(data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleOpenModal = (blog = null) => {
    if (blog) {
      setEditingBlog(blog);
      setFormData(blog);
    } else {
      setEditingBlog(null);
      setFormData({
        title: '',
        preview: '',
        content: '',
        tag: 'Technical',
        externalUrl: '',
        image: { url: '', publicId: '' },
        isPublished: true,
      });
    }
    setIsModalOpen(true);
  };

  const handleImport = async () => {
    if (!importUrl) return;
    setFetchingMetadata(true);
    try {
      const { data } = await axios.post('/api/v1/metadata/fetch-metadata', { url: importUrl });
      const meta = data.data;
      setFormData({
        ...formData,
        title: meta.title || '',
        preview: meta.preview || '',
        externalUrl: meta.externalUrl || importUrl,
        tag: meta.tag || 'Technical',
        content: `Imported from ${importUrl}`,
        image: meta.image ? { url: meta.image, publicId: '' } : formData.image
      });
      setImportUrl('');
    } catch (err) {
      alert('Failed to fetch metadata. Please fill manually.');
    } finally {
      setFetchingMetadata(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingBlog) {
        await axios.put(`/api/v1/blogs/${editingBlog._id}`, formData);
      } else {
        await axios.post('/api/v1/blogs', formData);
      }
      fetchBlogs();
      setIsModalOpen(false);
    } catch (err) {
      console.error(err);
      alert('Save failed');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this blog post?')) {
      try {
        await axios.delete(`/api/v1/blogs/${id}`);
        fetchBlogs();
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-display font-bold">Blog Management</h2>
        <button 
          onClick={() => handleOpenModal()}
          className="flex items-center gap-2 bg-accent-orange text-white px-6 py-3 rounded-xl font-bold hover:shadow-lg transition-all"
        >
          <Plus size={20} /> New Blog
        </button>
      </div>

      <div className="glass p-6 rounded-3xl border-white/20">
        <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-4">LinkedIn / Article Bridge</h3>
        <div className="flex gap-4">
          <div className="relative flex-grow">
            <LinkIcon className="absolute left-4 top-3.5 text-slate-400" size={20} />
            <input 
              type="text" 
              placeholder="Paste LinkedIn or Blog Post URL..."
              value={importUrl}
              onChange={(e) => setImportUrl(e.target.value)}
              className="w-full bg-white/50 dark:bg-slate-900/50 border border-white/10 rounded-xl pl-12 pr-4 py-3.5 outline-none focus:border-accent-orange transition-all"
            />
          </div>
          <button 
            onClick={handleImport}
            disabled={fetchingMetadata}
            className="px-8 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl font-bold hover:opacity-90 transition-all flex items-center gap-2 disabled:opacity-50"
          >
            {fetchingMetadata ? <Loader2 className="animate-spin" size={20} /> : <><Search size={20} /> Fetch</>}
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="animate-spin text-accent-orange" size={40} />
        </div>
      ) : (
        <div className="grid gap-4">
          {blogs.map((blog) => (
            <div key={blog._id} className="glass p-6 rounded-2xl flex justify-between items-center border-white/20 hover:bg-white/40 dark:hover:bg-slate-900/40 transition-all group">
               <div className="flex items-center gap-6">
                 <div className={`p-4 rounded-xl ${blog.tag === 'LinkedIn' ? 'bg-blue-500/10 text-blue-500' : 'bg-orange-500/10 text-orange-500'}`}>
                    <FileText size={24} />
                 </div>
                 <div>
                    <h4 className="font-bold text-lg leading-tight">{blog.title}</h4>
                    <div className="flex items-center gap-4 mt-1 text-sm text-slate-500">
                      <span className="flex items-center gap-1"><Calendar size={14} /> {new Date(blog.createdAt).toLocaleDateString()}</span>
                      <span className="flex items-center gap-1"><LinkIcon size={14} /> {blog.tag}</span>
                    </div>
                 </div>
               </div>
               <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => handleOpenModal(blog)} className="p-3 glass hover:text-accent-orange rounded-xl"><Edit2 size={18} /></button>
                  <button onClick={() => handleDelete(blog._id)} className="p-3 glass hover:text-red-500 rounded-xl"><Trash2 size={18} /></button>
               </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/40 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="glass w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl p-8 md:p-10 border-white/20">
             <div className="flex justify-between items-center mb-8">
              <h3 className="text-2xl font-bold">{editingBlog ? 'Edit Post' : 'New Blog Post'}</h3>
              <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-all"><X size={24} /></button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Title</label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full bg-white/50 dark:bg-slate-900/50 border border-white/20 rounded-xl px-4 py-3 focus:border-accent-orange outline-none"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Tag</label>
                  <select 
                    value={formData.tag}
                    onChange={(e) => setFormData({ ...formData, tag: e.target.value })}
                    className="w-full bg-white/50 dark:bg-slate-900/50 border border-white/20 rounded-xl px-4 py-3 focus:border-accent-orange outline-none"
                  >
                    <option value="Technical">Technical</option>
                    <option value="LinkedIn">LinkedIn</option>
                    <option value="Custom">Custom</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Link URL (Optional)</label>
                <input
                  type="text"
                  value={formData.externalUrl}
                  onChange={(e) => setFormData({ ...formData, externalUrl: e.target.value })}
                  className="w-full bg-white/50 dark:bg-slate-900/50 border border-white/20 rounded-xl px-4 py-3 focus:border-accent-orange outline-none"
                  placeholder="https://linkedin.com/posts/..."
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Preview Text / Summary</label>
                <textarea
                  required
                  rows="3"
                  value={formData.preview}
                  onChange={(e) => setFormData({ ...formData, preview: e.target.value })}
                  className="w-full bg-white/50 dark:bg-slate-900/50 border border-white/20 rounded-xl px-4 py-3 focus:border-accent-orange outline-none resize-none"
                ></textarea>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Content (Full Post or Details)</label>
                <textarea
                  required
                  rows="6"
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  className="w-full bg-white/50 dark:bg-slate-900/50 border border-white/20 rounded-xl px-4 py-3 focus:border-accent-orange outline-none resize-none"
                ></textarea>
              </div>

              <div className="flex justify-end gap-4 pt-4 border-t border-white/10">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-6 py-3 rounded-xl font-bold text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800">Cancel</button>
                <button type="submit" className="px-8 py-3 bg-accent-orange text-white rounded-xl font-bold hover:shadow-lg">Save Article</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

// Internal icon import
import { FileText } from 'lucide-react';

export default AdminBlogs;
