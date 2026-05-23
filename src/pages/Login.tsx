import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, Boxes, ArrowRight, AlertCircle } from 'lucide-react';
import { useApp } from '../store/appStore';
import { login as apiLogin } from '../api';

export function LoginPage() {
  const { login, toast } = useApp();
  const navigate = useNavigate();
  const [email, setEmail] = useState('alex.morgan@company.com');
  const [password, setPassword] = useState('password123');
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!email || !password) { setError('Please fill in all fields.'); return; }
    setLoading(true);
    try {
      const user = await apiLogin(email, password);
      login(user);
      toast({ type: 'success', title: 'Welcome back!', message: `Signed in as ${email}` });
      navigate('/dashboard');
    } catch (err: any) {
      setError(err?.message || 'Invalid email or password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center p-4">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-blue-600/8 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/3 w-80 h-80 bg-emerald-600/6 rounded-full blur-3xl" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />
      </div>

      <div className="relative w-full max-w-[400px] animate-slide-up">
        {/* Logo header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-blue-600 shadow-glow-blue mb-4">
            <Boxes size={28} className="text-white" />
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">AssetVault</h1>
          <p className="text-sm text-gray-500 mt-1">Inventory & Asset Management</p>
        </div>

        {/* Card */}
        <div className="bg-gray-900 border border-gray-800/80 rounded-2xl p-8 shadow-2xl">
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-100">Sign in to your account</h2>
            <p className="text-sm text-gray-500 mt-1">Welcome back — enter your credentials to continue</p>
          </div>

          {error && (
            <div className="flex items-center gap-2.5 bg-rose-500/10 border border-rose-500/25 rounded-lg px-3 py-2.5 mb-5">
              <AlertCircle size={15} className="text-rose-400 shrink-0" />
              <p className="text-sm text-rose-400">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1.5">Email address</label>
              <div className="relative">
                <Mail size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  className="input-base pl-9"
                  autoComplete="email"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-medium text-gray-400">Password</label>
                <button type="button" className="text-xs text-blue-400 hover:text-blue-300 transition-colors font-medium">
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <Lock size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="input-base pl-9 pr-10"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(v => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
                >
                  {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <button
                type="button"
                onClick={() => setRemember(v => !v)}
                className={`w-4 h-4 rounded border transition-colors shrink-0 flex items-center justify-center
                  ${remember ? 'bg-blue-600 border-blue-600' : 'border-gray-600 bg-transparent hover:border-gray-400'}`}
              >
                {remember && (
                  <svg viewBox="0 0 12 12" fill="none" className="w-3 h-3">
                    <path d="M2 6l3 3 5-5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </button>
              <span className="text-sm text-gray-400 select-none cursor-pointer" onClick={() => setRemember(v => !v)}>
                Keep me signed in
              </span>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2.5 rounded-lg transition-all duration-200 text-sm mt-2 active:scale-95
                ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Signing in...
                </>
              ) : (
                <>
                  Sign in
                  <ArrowRight size={16} />
                </>
              )}
            </button>
          </form>

          <div className="mt-6 pt-5 border-t border-gray-800">
            <p className="text-xs text-gray-600 text-center">
              Demo credentials are pre-filled. Just click Sign in.
            </p>
          </div>
        </div>

        <p className="text-center text-xs text-gray-700 mt-6">
          © 2024 AssetVault. Enterprise Asset Management Platform.
        </p>
      </div>
    </div>
  );
}
