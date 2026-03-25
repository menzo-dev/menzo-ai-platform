'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Sparkles, Mail, ArrowRight, KeyRound } from 'lucide-react';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
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
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
            <Sparkles style={{ color: '#6366f1' }} size={32} />
            <span style={{ fontSize: '1.75rem', fontWeight: 'bold', color: '#fff' }}>Menzo AI</span>
          </div>
          <p style={{ color: '#94a3b8' }}>استعادة كلمة المرور</p>
        </div>

        {!sent ? (
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', color: '#fff', marginBottom: '0.5rem', fontSize: '0.9rem' }}>البريد الإلكتروني</label>
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

            <button type="submit" style={{ width: '100%', padding: '1rem', background: '#6366f1', color: '#fff', borderRadius: '12px', fontSize: '1rem', fontWeight: '600', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
              إرسال رابط الاستعادة <ArrowRight size={18} />
            </button>
          </form>
        ) : (
          <div style={{ textAlign: 'center', padding: '2rem' }}>
            <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'rgba(16,185,129,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem' }}>
              <KeyRound size={28} style={{ color: '#10b981' }} />
            </div>
            <h3 style={{ color: '#fff', marginBottom: '0.5rem' }}>تم الإرسال!</h3>
            <p style={{ color: '#94a3b8', marginBottom: '1.5rem' }}>
              تم إرسال رابط استعادة كلمة المرور إلى بريدك الإلكتروني
            </p>
            <button onClick={() => setSent(false)} style={{ padding: '0.75rem 1.5rem', background: '#6366f1', color: '#fff', borderRadius: '12px', fontSize: '0.9rem' }}>
              إعادة الإرسال
            </button>
          </div>
        )}

        <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
          <Link href="/auth/login" style={{ color: '#6366f1', fontSize: '0.9rem' }}>
            العودة لتسجيل الدخول
          </Link>
        </div>
      </motion.div>
    </div>
  );
}