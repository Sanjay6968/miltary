import { Outlet, Navigate, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogOut, LayoutDashboard, ShoppingCart, ArrowRightLeft, Target } from 'lucide-react';
import { cn } from './ui/Button';

export const Layout = () => {
  const { user, logout, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center bg-slate-50">Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const navItems = [
    { label: 'Dashboard', path: '/', icon: <LayoutDashboard className="w-5 h-5" /> },
    { label: 'Purchases', path: '/purchases', icon: <ShoppingCart className="w-5 h-5" /> },
    { label: 'Transfers', path: '/transfers', icon: <ArrowRightLeft className="w-5 h-5" /> },
    { label: 'Assignments', path: '/assignments', icon: <Target className="w-5 h-5" /> },
  ];

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <aside className="w-64 flex-shrink-0 bg-card text-card-foreground flex flex-col border-r border-border">
        <div className="p-6">
          <h1 className="text-xl font-bold tracking-tight gradient-text">AssetOps</h1>
          <p className="text-xs text-muted-foreground mt-1">Military Asset Management</p>
        </div>
        
        <nav className="flex-1 px-4 space-y-2 mt-4">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center space-x-3 px-3 py-2 rounded-md transition-colors text-sm font-medium",
                location.pathname === item.path 
                  ? "bg-primary text-primary-foreground" 
                  : "text-foreground hover:bg-muted"
              )}
            >
              {item.icon}
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-border">
          <div className="flex items-center space-x-3 mb-4 px-2">
            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-sm font-medium text-primary">
              {user.username.charAt(0).toUpperCase()}
            </div>
            <div>
              <p className="text-sm font-medium text-foreground leading-tight">{user.username}</p>
              <p className="text-xs text-muted-foreground">{user.role}</p>
            </div>
          </div>
          <button
            onClick={logout}
            className="w-full flex items-center space-x-2 px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted rounded-md transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        {/* Background glow for main content */}
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/5 via-background to-background" />
        
        <header className="h-16 flex items-center px-8 border-b border-border bg-card/50 backdrop-blur-sm shadow-sm shrink-0 relative z-10">
          <h2 className="text-lg font-semibold text-foreground capitalize">
            {location.pathname === '/' ? 'Dashboard' : location.pathname.slice(1)}
          </h2>
        </header>
        <div className="flex-1 overflow-auto p-8 relative z-10">
          <Outlet />
        </div>
      </main>
    </div>
  );
};
