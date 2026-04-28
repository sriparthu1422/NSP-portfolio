import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Plus, Edit2, Trash2, X, Upload, Loader2, Link as LinkIcon, Github, Globe } from 'lucide-react';

const AdminProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [uploading, setUploading] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    techStack: '',
    liveLink: '',
    githubLink: '',
    image: { url: '', publicId: '' },
    featured: false,
    order: 0,
  });

  const fetchProjects = async () => {
    try {
      const { data } = await axios.get('/api/v1/projects');
      setProjects(data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleOpenModal = (project = null) => {
    if (project) {
      setEditingProject(project);
      setFormData({
        ...project,
        techStack: project.techStack.join(', '),
      });
    } else {
      setEditingProject(null);
      setFormData({
        title: '',
        description: '',
        techStack: '',
        liveLink: '',
        githubLink: '',
        image: { url: '', publicId: '' },
        featured: false,
        order: 0,
      });
    }
    setIsModalOpen(true);
  };

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const uploadData = new FormData();
    uploadData.append('image', file);

    setUploading(true);
    try {
      const { data } = await axios.post('/api/v1/upload', uploadData);
      setFormData({ ...formData, image: data.data });
    } catch (err) {
      console.error(err);
      alert('Upload failed');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const dataToSend = {
      ...formData,
      techStack: formData.techStack.split(',').map((s) => s.trim()).filter(Boolean),
    };

    try {
      if (editingProject) {
        await axios.put(`/api/v1/projects/${editingProject._id}`, dataToSend);
      } else {
        await axios.post('/api/v1/projects', dataToSend);
      }
      fetchProjects();
      setIsModalOpen(false);
    } catch (err) {
      console.error(err);
      alert('Save failed');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this project?')) {
      try {
        await axios.delete(`/api/v1/projects/${id}`);
        fetchProjects();
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-display font-bold">Manage Projects</h2>
        <button 
          onClick={() => handleOpenModal()}
          className="flex items-center gap-2 bg-accent-orange text-white px-6 py-3 rounded-xl font-bold hover:shadow-lg hover:shadow-orange-500/20 transition-all"
        >
          <Plus size={20} /> Add Project
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="animate-spin text-accent-orange" size={40} />
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div key={project._id} className="glass rounded-2xl overflow-hidden hover:shadow-xl transition-all border-white/20">
               <div className="aspect-video relative">
                 <img src={project.image?.url} alt={project.title} className="w-full h-full object-cover" />
                 <div className="absolute top-2 right-2 flex gap-2">
                    <button onClick={() => handleOpenModal(project)} className="p-2 bg-white/80 dark:bg-slate-900/80 rounded-lg hover:text-accent-orange"><Edit2 size={16} /></button>
                    <button onClick={() => handleDelete(project._id)} className="p-2 bg-white/80 dark:bg-slate-900/80 rounded-lg hover:text-red-500"><Trash2 size={16} /></button>
                 </div>
               </div>
               <div className="p-4">
                 <h3 className="font-bold text-lg mb-1">{project.title}</h3>
                 <div className="flex flex-wrap gap-1">
                   {project.techStack.map(t => <span key={t} className="text-[10px] bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded uppercase">{t}</span>)}
                 </div>
               </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal Overlay */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/40 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="glass w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl p-8 md:p-10 border-white/20">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-2xl font-bold">{editingProject ? 'Edit Project' : 'New Project'}</h3>
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
                    className="w-full bg-white/50 dark:bg-slate-900/50 border border-white/20 dark:border-slate-800/20 rounded-xl px-4 py-3 focus:border-accent-orange outline-none transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Tech Stack (comma separated)</label>
                  <input
                    type="text"
                    value={formData.techStack}
                    onChange={(e) => setFormData({ ...formData, techStack: e.target.value })}
                    className="w-full bg-white/50 dark:bg-slate-900/50 border border-white/20 dark:border-slate-800/20 rounded-xl px-4 py-3 focus:border-accent-orange outline-none transition-all"
                    placeholder="React, Node, Express"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Description</label>
                <textarea
                  required
                  rows="3"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full bg-white/50 dark:bg-slate-900/50 border border-white/20 dark:border-slate-800/20 rounded-xl px-4 py-3 focus:border-accent-orange outline-none transition-all resize-none"
                ></textarea>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Image</label>
                  <div className="flex items-center gap-4">
                    <div className="w-20 h-20 glass rounded-xl overflow-hidden border-orange-500/20 flex-shrink-0">
                      {formData.image.url ? <img src={formData.image.url} className="w-full h-full object-cover" /> : <Upload className="m-auto text-slate-400 mt-6" />}
                    </div>
                    <label className="flex-grow cursor-pointer glass hover:bg-slate-100 dark:hover:bg-slate-800 border-dashed border-white/40 border-2 rounded-xl h-20 flex items-center justify-center transition-all">
                      <input type="file" onChange={handleUpload} className="hidden" />
                      {uploading ? <Loader2 className="animate-spin text-accent-orange" /> : <div className="flex flex-col items-center"><Upload size={20} className="text-slate-400" /><span className="text-[10px] text-slate-500 mt-1">Upload New</span></div>}
                    </label>
                  </div>
                </div>
                <div className="space-y-4">
                   <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Github Link</label>
                    <div className="relative">
                      <Github className="absolute left-3 top-2.5 text-slate-400" size={16} />
                      <input type="text" value={formData.githubLink} onChange={(e) => setFormData({ ...formData, githubLink: e.target.value })} className="w-full bg-white/50 dark:bg-slate-900/50 border border-white/20 dark:border-slate-800/20 rounded-xl pl-10 pr-4 py-2.5 focus:border-accent-orange outline-none" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Live Demo</label>
                    <div className="relative">
                      <Globe className="absolute left-3 top-2.5 text-slate-400" size={16} />
                      <input type="text" value={formData.liveLink} onChange={(e) => setFormData({ ...formData, liveLink: e.target.value })} className="w-full bg-white/50 dark:bg-slate-900/50 border border-white/20 dark:border-slate-800/20 rounded-xl pl-10 pr-4 py-2.5 focus:border-accent-orange outline-none" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-4 pt-4 border-t border-white/10">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-6 py-3 rounded-xl font-bold text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800">Cancel</button>
                <button type="submit" className="px-8 py-3 bg-accent-orange text-white rounded-xl font-bold hover:shadow-lg shadow-orange-500/20">Save Changes</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProjects;
