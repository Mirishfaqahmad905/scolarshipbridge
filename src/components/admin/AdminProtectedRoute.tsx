import React, { useState, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { scholarshipApi } from '../../services/api';

interface AdminProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: string[];
}

export const AdminProtectedRoute: React.FC<AdminProtectedRouteProps> = ({
  children,
  requiredRole
}) => {
  const location = useLocation();
  const [authState, setAuthState] = useState<'checking' | 'authenticated' | 'unauthenticated'>(() => {
    const token = localStorage.getItem('scholarbridge_admin_token');
    const user = localStorage.getItem('scholarshipbride_admin_user');
    return token && user ? 'authenticated' : 'checking';
  });
  const [userRole, setUserRole] = useState<string | null>(() => {
    try {
      const user = localStorage.getItem('scholarshipbride_admin_user');
      return user ? JSON.parse(user).role : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    let isMounted = true;

    const checkAuth = async () => {
      const token = localStorage.getItem('scholarbridge_admin_token');
      if (!token) {
        if (isMounted) setAuthState('unauthenticated');
        return;
      }

      try {
        const user = await scholarshipApi.admin.getProfile();
        if (isMounted) {
          if (user && (user.username || user.id)) {
            setUserRole(user.role || 'superadmin');
            setAuthState('authenticated');
          } else {
            const cached = localStorage.getItem('scholarshipbride_admin_user');
            if (cached) {
              const parsed = JSON.parse(cached);
              setUserRole(parsed.role || 'superadmin');
              setAuthState('authenticated');
            } else {
              setAuthState('unauthenticated');
            }
          }
        }
      } catch (err: any) {
        if (isMounted) {
          // If 401/403, clear credentials
          if (err?.response?.status === 401 || err?.response?.status === 403) {
            localStorage.removeItem('scholarbridge_admin_token');
            localStorage.removeItem('scholarshipbride_admin_user');
            setAuthState('unauthenticated');
          } else {
            // In case of transient network issue, rely on stored token & user
            const cached = localStorage.getItem('scholarshipbride_admin_user');
            if (cached && token) {
              try {
                const parsed = JSON.parse(cached);
                setUserRole(parsed.role || 'superadmin');
                setAuthState('authenticated');
              } catch {
                setAuthState('unauthenticated');
              }
            } else {
              setAuthState('unauthenticated');
            }
          }
        }
      }
    };

    checkAuth();

    return () => {
      isMounted = false;
    };
  }, [location.pathname]);

  if (authState === 'checking') {
    return (
      <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center text-white">
        <div className="w-10 h-10 border-3 border-amber-400/20 border-t-amber-400 rounded-full animate-spin mb-4" />
        <p className="text-xs font-semibold text-slate-400 tracking-wider uppercase">
          Verifying Admin Access...
        </p>
      </div>
    );
  }

  if (authState === 'unauthenticated') {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  if (requiredRole && userRole && !requiredRole.includes(userRole) && userRole !== 'superadmin') {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md text-center border border-slate-200">
          <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-600 mx-auto flex items-center justify-center mb-4">
            <span className="text-xl font-bold">!</span>
          </div>
          <h2 className="text-lg font-bold text-slate-900 mb-2">Access Restricted</h2>
          <p className="text-xs text-slate-600 mb-6">
            Your administrator role ({userRole}) does not have permission to view this section.
          </p>
          <a
            href="/admin/dashboard"
            className="inline-flex px-4 py-2 bg-indigo-600 text-white text-xs font-bold rounded-xl hover:bg-indigo-700 transition-colors"
          >
            Return to Dashboard
          </a>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};
