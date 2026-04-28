import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Briefcase, FileText, MessageSquare, Plus, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

const StatCard = ({ title, count, icon: Icon, color }) => (
  <div className="glass p-6 rounded-3xl border-white/20">
    <div className="flex justify-between items-center mb-4">
      <div className={`p-3 rounded-2xl ${color}`}>
        <Icon size={24} className="text-white" />
      </div>
      <span className="text-sm font-bold text-slate-500 uppercase tracking-wider">{title}</span>
    </div>
    <div className="text-4xl font-display font-black tracking-tight">
      {count}
    </div>
  </div>
);

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    projects: 0,
    blogs: 0,
    contacts: 0
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [proj, blog, cont] = await Promise.all([
          axios.get('/api/v1/projects'),
          axios.get('/api/v1/blogs'),
          axios.get('/api/v1/contacts')
        ]);
        setStats({
          projects: proj.data.count,
          blogs: blog.data.count,
          contacts: cont.data.count
        });
      } catch (err) {
        console.error('Error fetching stats:', err);
      }
    };
    fetchStats();
  }, []);

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard title="Total Projects" count={stats.projects} icon={Briefcase} color="bg-blue-500" />
        <StatCard title="Blog Posts" count={stats.blogs} icon={FileText} color="bg-purple-500" />
        <StatCard title="Inquiries" count={stats.contacts} icon={MessageSquare} color="bg-orange-500" />
      </div>

      <div className="grid md:grid-cols-2 gap-8 mt-12">
        {/* Quick Actions */}
        <div className="glass p-8 rounded-3xl border-white/20">
          <h3 className="text-xl font-bold mb-6">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-4">
            <Link to="/admin/projects" className="p-4 glass hover:bg-accent-orange hover:text-white transition-all rounded-2xl flex flex-col items-center gap-2 group">
              <Plus size={24} />
              <span className="text-sm font-bold">New Project</span>
            </Link>
            <Link to="/admin/blogs" className="p-4 glass hover:bg-accent-orange hover:text-white transition-all rounded-2xl flex flex-col items-center gap-2 group">
              <Plus size={24} />
              <span className="text-sm font-bold">New Blog</span>
            </Link>
          </div>
        </div>

        {/* System Info */}
        <div className="glass p-8 rounded-3xl border-white/20">
          <h3 className="text-xl font-bold mb-6">System Health</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center text-sm">
              <span className="text-slate-500">Database Connection</span>
              <span className="text-green-500 font-bold">Active</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-slate-500">Cloudinary Sync</span>
              <span className="text-green-500 font-bold">Connected</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-slate-500">Node Environment</span>
              <span className="text-accent-orange font-bold uppercase">Development</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
