'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Sparkles, Brain, Calendar, MessageSquare, Target, ArrowRight, BookOpen, Users } from 'lucide-react';

export default function Home() {
  return (
    <div style={{ minHeight: '100vh', background: '#0f172a' }}>
      {/* Header */}
      <header style={{ 
        position: 'fixed', 
        top: 0, 
        left: 0, 
        right: 0, 
        zIndex: 100,
        background: 'rgba(15, 23, 42, 0.8)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid rgba(255,255,255,0.1)'
      }}>
        <div style={{ 
          maxWidth: '1200px', 
          margin: '0 auto', 
          padding: '1rem 2rem',
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center' 
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Sparkles style={{ color: '#6366f1' }} size={28} />
            <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#fff' }}>Menzo AI</span>
          </div>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <Link href="/auth/login" style={{ 
              padding: '0.5rem 1.5rem', 
              color: '#fff', 
              textDecoration: 'none',
              border: '1px solid rgba(255,255,255,0.2)',
              borderRadius: '8px'
            }}>تسجيل الدخول</Link>
            <Link href="/auth/register" style={{ 
              padding: '0.5rem 1.5rem', 
              background: '#6366f1', 
              color: '#fff', 
              textDecoration: 'none',
              borderRadius: '8px'
            }}>إنشاء حساب</Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section style={{ padding: '8rem 2rem 4rem', textAlign: 'center' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 style={{ 
            fontSize: '3.5rem', 
            fontWeight: 'bold', 
            color: '#fff', 
            marginBottom: '1rem',
            lineHeight: 1.2
          }}>
            ذكاء اصطناعي ل{' '}
            <span style={{ color: '#6366f1' }}>تفوقك</span>
          </h1>
          <p style={{ 
            fontSize: '1.25rem', 
            color: '#94a3b8', 
            maxWidth: '600px', 
            margin: '0 auto 2rem' 
          }}>
            منصة متكاملة للمذاكرة الذكية لطلاب الصف الثالث الثانوى الأزهري - جدولة ذكية وتحفيز مستمر
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <Link href="/auth/register" style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '1rem 2rem',
              background: '#6366f1',
              color: '#fff',
              textDecoration: 'none',
              borderRadius: '12px',
              fontSize: '1.1rem',
              fontWeight: '600'
            }}>
              ابدأ الآن <ArrowRight size={20} />
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Features */}
      <section style={{ padding: '4rem 2rem', background: 'rgba(255,255,255,0.02)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{ textAlign: 'center', fontSize: '2rem', color: '#fff', marginBottom: '3rem' }}>
            مميزات المنصة
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
            {[
              { icon: Brain, title: 'ذكاء اصطناعي', desc: 'مساعد ذكي يساعدك في تنظيم وقتك ومذاكرتك' },
              { icon: Calendar, title: 'جدولة ذكية', desc: 'أنشئ جدول مذاكرة مخصص لأهدافك' },
              { icon: Target, title: 'تتبع_progress', desc: 'راقب تقدمك وحافظ على استمرارية المذاكرة' },
              { icon: MessageSquare, title: 'محادثة ذكية', desc: 'تحدث مع AI واحصل على نصائح مخصصة' },
              { icon: BookOpen, title: 'المواد الدراسية', desc: 'تابعة تقدمك في جميع المواد' },
              { icon: Users, title: 'ملف شخصي', desc: 'إدارة حسابك وإعداداتك بسهولة' },
            ].map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                style={{
                  padding: '2rem',
                  background: 'rgba(255,255,255,0.05)',
                  borderRadius: '16px',
                  border: '1px solid rgba(255,255,255,0.1)'
                }}
              >
                <feature.icon style={{ color: '#6366f1', marginBottom: '1rem' }} size={32} />
                <h3 style={{ color: '#fff', fontSize: '1.25rem', marginBottom: '0.5rem' }}>{feature.title}</h3>
                <p style={{ color: '#94a3b8', fontSize: '0.9rem' }}>{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '4rem 2rem', textAlign: 'center' }}>
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '2rem', color: '#fff', marginBottom: '1rem' }}>
            مستعد للتفوق؟
          </h2>
          <p style={{ color: '#94a3b8', marginBottom: '2rem' }}>
            انضم الآن وابدأ رحلتك نحو النجاح
          </p>
          <Link href="/auth/register" style={{
            display: 'inline-block',
            padding: '1rem 3rem',
            background: '#6366f1',
            color: '#fff',
            textDecoration: 'none',
            borderRadius: '12px',
            fontSize: '1.1rem',
            fontWeight: '600'
          }}>
            أنشئ حسابك مجاناً
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ padding: '2rem', textAlign: 'center', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
        <p style={{ color: '#64748b' }}>
          © 2026 Menzo AI - تطوير Mohamed El-manzlawy
        </p>
      </footer>
    </div>
  );
}