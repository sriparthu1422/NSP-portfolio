import React, { useState, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import CustomCursor from './components/common/CustomCursor';
import IntroVideo from './components/common/IntroVideo';
import { Loader2 } from 'lucide-react';

// Lazy-load pages for code splitting
const Home = lazy(() => import('./pages/Home'));
const Login = lazy(() => import('./pages/Login'));
const AdminLayout = lazy(() => import('./pages/admin/AdminLayout'));
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'));
const AdminProjects = lazy(() => import('./pages/admin/AdminProjects'));
const AdminBlogs = lazy(() => import('./pages/admin/AdminBlogs'));
const AdminMessages = lazy(() => import('./pages/admin/AdminMessages'));

const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center">
    <Loader2 className="animate-spin text-accent-orange" size={40} />
  </div>
);

function App() {
  const [showIntro, setShowIntro] = useState(true);

  const handleIntroComplete = () => {
    setShowIntro(false);
  };

  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <CustomCursor />
      <Suspense fallback={<PageLoader />}>
        {showIntro && <IntroVideo onComplete={handleIntroComplete} />}
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="login" element={<Login />} />
          </Route>

          {/* Protected Admin Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/admin" element={<AdminLayout><AdminDashboard /></AdminLayout>} />
            <Route path="/admin/projects" element={<AdminLayout><AdminProjects /></AdminLayout>} />
            <Route path="/admin/blogs" element={<AdminLayout><AdminBlogs /></AdminLayout>} />
            <Route path="/admin/messages" element={<AdminLayout><AdminMessages /></AdminLayout>} />
          </Route>
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;

