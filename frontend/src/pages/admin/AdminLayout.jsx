import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Briefcase, 
  FileText, 
  MessageSquare, 
  LogOut, 
  ChevronRight,
  ExternalLink
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const AdminLayout = ({ children }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navItems = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/admin' },
    { name: 'Projects', icon: Briefcase, path: '/admin/projects' },
    { name: 'Blogs', icon: FileText, path: '/admin/blogs' },
    { name: 'Messages', icon: MessageSquare, path: '/admin/messages' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex">
      {/* Sidebar */}
      <aside className="w-64 glass border-r border-white/20 dark:border-slate-800/20 hidden md:flex flex-col fixed h-full z-10">
        <div className="p-6">
          <Link to="/" className="text-2xl font-display font-bold tracking-tight text-accent-orange">
            SP<span className="text-slate-800 dark:text-white">. Admin</span>
          </Link>
        </div>

        <nav className="flex-grow px-4 space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                location.pathname === item.path 
                  ? 'bg-accent-orange text-white shadow-lg shadow-orange-500/20' 
                  : 'hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400'
              }`}
            >
              <item.icon size={20} />
              <span className="font-medium">{item.name}</span>
              {location.pathname === item.path && <ChevronRight size={16} className="ml-auto" />}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-white/20 dark:border-slate-800/20">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-red-500 hover:bg-red-500/10 transition-all font-medium"
          >
            <LogOut size={20} />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow md:ml-64 p-4 md:p-8">
        <header className="flex justify-between items-center mb-8 glass p-4 rounded-2xl md:bg-transparent md:backdrop-blur-none md:border-none">
          <div>
            <h1 className="text-2xl font-bold">Admin Dashboard</h1>
            <p className="text-sm text-slate-500">Welcome back, {user?.name}</p>
          </div>
          <Link to="/" target="_blank" className="flex items-center gap-2 text-sm font-bold text-accent-orange hover:underline">
            View Live Site <ExternalLink size={14} />
          </Link>
        </header>

        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
           {children}
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
