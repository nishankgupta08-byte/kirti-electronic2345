import React from 'react';
import { Outlet } from 'react-router-dom';
import AdminSidebar from '../../components/admin/AdminSidebar';
import AdminTopbar from '../../components/admin/AdminTopbar';
import { useAdminAuth } from '../../hooks/useAdminAuth';
import { Loader2 } from 'lucide-react';

const AdminLayout: React.FC = () => {
  const { isAdmin, loading } = useAdminAuth();

  if (loading) {
    return (
      <div className="fixed inset-0 bg-white flex items-center justify-center z-[100]">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-12 h-12 text-violet-600 animate-spin" />
          <p className="text-zinc-500 font-medium animate-pulse">Initializing Terminal...</p>
        </div>
      </div>
    );
  }

  if (!isAdmin) return null;

  return (
    <div className="min-h-screen bg-white font-sans overflow-x-hidden">
      <style dangerouslySetInnerHTML={{ __html: `
          * { cursor: default !important; }
          button, a, select, input[type="checkbox"], .cursor-pointer { cursor: pointer !important; }
      ` }} />

      <AdminSidebar />
      <div className="lg:pl-64 flex flex-col min-h-screen">
        <AdminTopbar title="Dashboard" />
        <main className="flex-1 p-6 lg:p-10 max-w-full bg-zinc-50">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
