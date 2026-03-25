'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Sparkles, Mail, Lock, Eye, EyeOff, Beaker, PenTool, ArrowRight } from 'lucide-react';

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [stream, setStream] = useState<'science' | 'literature'>('science');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate login
    setTimeout(() => {
      localStorage.setItem('menzo_user', JSON.stringify({ email, full_name: 'طالب', stream }));
      router.push('/main/dashboard');
    }, 1000);
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
      padding: '2rem'
    }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ 
          width: '100%', 
          maxWidth: '450px',
          background: 'rgba(255,255,255,0.05)',
          borderRadius: '24px',
          padding: '2.5rem',
          border: '1px solid rgba(255,255,255,0.1)'
        }}
      >
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
            <Sparkles style={{ color: '#6366f1' }} size={32} />
            <span style={{ fontSize: '1.75rem', fontWeight: 'bold', color: '#fff' }}>Menzo AI</span>
          </div>
          <p style={{ color: '#94a3b8' }}>سجل دخولك للمتابعة</p>
        </div>

        <form onSubmit={handleLogin}>
          {/* Email */}
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', color: '#fff', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
              البريد الإلكتروني
            </label>
            <div style={{ position: 'relative' }}>
              <Mail size={18} style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#64748b' }} />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="example@email.com"
                style={{
                  width: '100%',
                  padding: '0.875rem 1rem 0.875rem 2.75rem',
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '12px',
                  color: '#fff',
                  fontSize: '1rem'
                }}
                required
              />
            </div>
          </div>

          {/* Password */}
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', color: '#fff', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
              كلمة المرور
            </label>
            <div style={{ position: 'relative' }}>
              <Lock size={18} style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#64748b' }} />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                style={{
                  width: '100%',
                  padding: '0.875rem 1rem 0.875rem 2.75rem',
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '12px',
                  color: '#fff',
                  fontSize: '1rem'
                }}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute',
                  left: '1rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  color: '#64748b'
                }}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Stream Selection */}
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', color: '#fff', marginBottom: '0.75rem', fontSize: '0.9rem' }}>
             اختر الشعبة
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <button
                type="button"
                onClick={() => setStream('science')}
                style={{
                  padding: '1rem',
                  background: stream === 'science' ? '#6366f1' : 'rgba(255,255,255,0.05)',
                  border: `1px solid ${stream === 'science' ? '#6366f1' : 'rgba(255,255,255,0.1)'}`,
                  borderRadius: '12px',
                  color: '#fff',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  transition: 'all 0.2s'
                }}
              >
                <Beaker size={20} />
                علمي
              </button>
              <button
                type="button"
                onClick={() => setStream('literature')}
                style={{
                  padding: '1rem',
                  background: stream === 'literature' ? '#6366f1' : 'rgba(255,255,255,0.05)',
                  border: `1px solid ${stream === 'literature' ? '#6366f1' : 'rgba(255,255,255,0.1)'}`,
                  borderRadius: '12px',
                  color: '#fff',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  transition: 'all 0.2s'
                }}
              >
                <PenTool size={20} />
                أدبي
              </button>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '1rem',
              background: '#6366f1',
              color: '#fff',
              borderRadius: '12px',
              fontSize: '1rem',
              fontWeight: '600',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              opacity: loading ? 0.7 : 1
            }}
          >
            {loading ? 'جاري الدخول...' : 'تسجيل الدخول'}
            {!loading && <ArrowRight size={18} />}
          </button>
        </form>

        {/* Links */}
        <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
          <Link href="/auth/forgot-password" style={{ color: '#6366f1', fontSize: '0.9rem' }}>
            نسيت كلمة المرور؟
          </Link>
          <p style={{ color: '#94a3b8', marginTop: '1rem', fontSize: '0.9rem' }}>
            ليس لديك حساب؟{' '}
            <Link href="/auth/register" style={{ color: '#6366f1' }}>
              إنشاء حساب
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}