import React, { type ReactNode, useState } from 'react';
import { Navigate, NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Users, Award, Settings, LogOut, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { isAdminAuthenticated, logoutAdmin } from '@/lib/adminAuth';

const navItems = [
  { label: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
  { label: 'Students', href: '/admin/students', icon: Users },
  { label: 'Certificates', href: '/admin/certificates', icon: Award },
  { label: 'Settings', href: '/admin/settings', icon: Settings },
];

const SidebarContent: React.FC<{ onLogout: () => void }> = ({ onLogout }) => (
  <div className="flex h-full flex-col bg-slate-900 text-white">
    <div className="flex items-center gap-3 border-b border-slate-700 px-6 py-6">
      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600 font-bold text-white">
        N
      </div>
      <div>
        <p className="text-lg font-bold">Nexora</p>
        <p className="text-xs text-slate-300">Admin Panel</p>
      </div>
    </div>

    <nav className="flex-1 space-y-2 px-4 py-5">
      {navItems.map(({ label, href, icon: Icon }) => (
        <NavLink
          key={href}
          to={href}
          className={({ isActive }) =>
            `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-colors ${
              isActive
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-300 hover:bg-slate-800 hover:text-white'
            }`
          }
        >
          <Icon className="h-4 w-4" />
          {label}
        </NavLink>
      ))}
    </nav>

    <div className="border-t border-slate-700 p-4">
      <Button
        variant="secondary"
        className="w-full justify-center gap-2 bg-slate-800 text-white hover:bg-slate-700"
        onClick={onLogout}
      >
        <LogOut className="h-4 w-4" />
        Logout
      </Button>
    </div>
  </div>
);

const AdminLayout: React.FC<{ children: ReactNode }> = ({ children }) => {
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  if (!isAdminAuthenticated()) {
    return <Navigate to="/admin/login" replace />;
  }

  const handleLogout = () => {
    setMobileOpen(false);
    logoutAdmin();
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <div className="flex min-h-screen flex-col md:flex-row">
        <aside className="hidden w-72 shrink-0 border-r border-slate-200 bg-slate-900 text-white md:flex md:flex-col">
          <SidebarContent onLogout={handleLogout} />
        </aside>

        <main className="flex-1 min-w-0">
          <header className="border-b border-slate-200 bg-white/90 backdrop-blur-sm">
            <div className="flex items-center justify-between gap-3 px-4 py-4 md:px-8">
              <div className="flex items-center gap-3">
                <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
                  <SheetTrigger asChild>
                    <Button variant="outline" size="icon" className="md:hidden">
                      <Menu className="h-5 w-5" />
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="w-72 border-r-0 bg-slate-900 p-0 text-white">
                    <SidebarContent onLogout={() => {
                      setMobileOpen(false);
                      handleLogout();
                    }} />
                  </SheetContent>
                </Sheet>

                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-blue-600">Admin</p>
                  <h1 className="text-base font-bold text-slate-900 sm:text-xl md:text-2xl">Nexora Master Class</h1>
                </div>
              </div>

              <div className="flex items-center gap-2 sm:gap-3">
                <div className="hidden rounded-full bg-blue-100 px-3 py-1 text-[10px] font-semibold text-blue-700 sm:block">
                  Online
                </div>
                <Button variant="outline" onClick={handleLogout} className="gap-2">
                  <LogOut className="h-4 w-4" />
                  <span className="hidden sm:inline">Logout</span>
                </Button>
              </div>
            </div>
          </header>

          <div className="p-4 md:p-8">{children}</div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
