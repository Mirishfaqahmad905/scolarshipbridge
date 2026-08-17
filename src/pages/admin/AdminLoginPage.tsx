import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { Lock, User, Eye, EyeOff, Shield, CheckCircle2, ArrowRight } from 'lucide-react';
import { scholarshipApi } from '../../services/api';
import { useApp } from '../../context/AppContext';

export const AdminLoginPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { addToast } = useApp();

  const [username, setUsername] = useState('mirishfaqahmad');
  const [password, setPassword] = useState('AAshfAAq;');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const from = (location.state as any)?.from?.pathname || '/admin/dashboard';

  React.useEffect(() => {
    const token = localStorage.getItem('scholarbridge_admin_token');
    const user = localStorage.getItem('scholarshipbride_admin_user');
    if (token && user) {
      navigate('/admin/dashboard', { replace: true });
    }
  }, [navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim() || !password.trim()) {
      setErrorMessage('Please enter both username and password.');
      return;
    }

    try {
      setIsLoading(true);
      setErrorMessage('');
      const res = await scholarshipApi.admin.login(username.trim(), password);

      if (res && res.success) {
        addToast({
          type: 'success',
          title: 'Welcome Back!',
          message: `Logged in as ${res.user?.username || username}.`
        });
        const targetPath = (!from || from === '/admin/login' || from === '/admin') ? '/admin/dashboard' : from;
        navigate(targetPath, { replace: true });
      } else {
        setErrorMessage(res?.message || 'Invalid username or password.');
      }
    } catch (err: any) {
      setErrorMessage(
        err?.response?.data?.message || 'Authentication failed. Please verify credentials.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickFill = () => {
    setUsername('mirishfaqahmad');
    setPassword('AAshfAAq;');
    setErrorMessage('');
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden font-sans">
      {/* Background Subtle Gradient Blobs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-tr from-amber-400 to-amber-500 text-slate-950 font-black text-2xl shadow-xl shadow-amber-500/10">
            S
          </div>
          <h2 className="text-2xl font-black text-white tracking-tight">ScholarshipBride</h2>
          <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">
            Secure Admin Control Center
          </p>
        </div>

        {/* Login Box */}
        <div className="mt-8 bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl space-y-6">
          {errorMessage && (
            <div className="p-4 bg-rose-500/10 border border-rose-500/20 rounded-2xl text-xs text-rose-400 font-medium animate-in fade-in">
              {errorMessage}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            {/* Username Input */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300">
                Admin Username
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                  <User className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="mirishfaqahmad"
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-800/80 border border-slate-700 rounded-xl text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-all"
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300">
                  Password
                </label>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-10 pr-10 py-2.5 bg-slate-800/80 border border-slate-700 rounded-xl text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-500 hover:text-slate-300"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded-md border-slate-700 bg-slate-800 text-amber-500 focus:ring-0 focus:ring-offset-0"
                />
                <span className="text-xs text-slate-400 font-medium">Keep me signed in</span>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-2 inline-flex items-center justify-center gap-2 py-3 px-4 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-bold text-sm rounded-xl shadow-lg shadow-amber-500/20 transition-all cursor-pointer disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <span className="w-4 h-4 border-2 border-slate-950/30 border-t-slate-950 rounded-full animate-spin" />
                  <span>Authenticating...</span>
                </>
              ) : (
                <>
                  <span>Sign In to Admin Panel</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Quick Demo Credentials Helper */}
          <div className="pt-4 border-t border-slate-800/80">
            <div className="p-3 bg-slate-800/60 rounded-xl border border-slate-700/60 flex items-center justify-between">
              <div>
                <p className="text-[11px] font-bold text-slate-300">Master Super Admin</p>
                <p className="text-[10px] text-slate-500 font-mono">mirishfaqahmad / AAshfAAq;</p>
              </div>
              <button
                type="button"
                onClick={handleQuickFill}
                className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider bg-slate-700 hover:bg-slate-600 text-amber-400 rounded-lg transition-colors cursor-pointer"
              >
                Auto Fill
              </button>
            </div>
          </div>
        </div>

        {/* Back to Public Site Link */}
        <div className="text-center mt-6">
          <Link
            to="/"
            className="text-xs font-medium text-slate-500 hover:text-slate-300 transition-colors"
          >
            ← Return to public website
          </Link>
        </div>
      </div>
    </div>
  );
};
