'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, Calendar, MessageSquare, User, Trophy, Bell, Settings, Info,
  Menu, Sparkles, LogOut, Code, Mail, Globe, Star, Heart
} from 'lucide-react';

const navItems = [
  { icon: <LayoutDashboard size={20} />, label: 'لوحة التحكم', href: '/main/dashboard' },
  { icon: <Calendar size={20} />, label: 'الجدول المذاكرة', href: '/main/schedule' },
  { icon: <MessageSquare size={20} />, label: 'المحادثة الذكية', href: '/main/chat' },
  { icon: <User size={20} />, label: 'الملف الشخصي', href: '/main/profile' },
  { icon: <Trophy size={20} />, label: 'الإنجازات', href: '/main/achievements' },
  { icon: <Bell size={20} />, label: 'الإشعارات', href: '/main/notifications' },
  { icon: <Settings size={20} />, label: 'الإعدادات', href: '/main/settings' },
  { icon: <Info size={20} />, label: 'عن المطور', href: '/main/about' },
];

export default function AboutPage() {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#0f172a' }}>
      {/* Sidebar */}
      <aside style={{
        width: sidebarOpen ? '260px' : '70px',
        background: 'rgba(255,255,255,0.05)',
        borderRight: '1px solid rgba(255,255,255,0.1)',
        padding: '1rem',
        transition: 'width 0.3s',
        position: 'fixed',
        height: '100vh',
        zIndex: 50
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Sparkles style={{ color: '#6366f1' }} size={24} />
            {sidebarOpen && <span style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#fff' }}>Menzo AI</span>}
          </div>
          <button onClick={() => setSidebarOpen(!sidebarOpen)} style={{ background: 'none', color: '#94a3b8' }}>
            <Menu size={20} />
          </button>
        </div>

        <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {navItems.map((item, idx) => (
            <a key={idx} href={item.href} style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              padding: '0.75rem 1rem',
              color: idx === 7 ? '#6366f1' : '#94a3b8',
              background: idx === 7 ? 'rgba(99,102,241,0.1)' : 'transparent',
              borderRadius: '12px',
              textDecoration: 'none',
              transition: 'all 0.2s'
            }}>
              {item.icon}
              {sidebarOpen && <span>{item.label}</span>}
            </a>
          ))}
        </nav>

        <div style={{ position: 'absolute', bottom: '1rem', left: '1rem', right: '1rem' }}>
          <button onClick={() => router.push('/')} style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            padding: '0.75rem 1rem',
            color: '#ef4444',
            background: 'rgba(239,68,68,0.1)',
            borderRadius: '12px',
            width: '100%'
          }}>
            <LogOut size={20} />
            {sidebarOpen && <span>تسجيل الخروج</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main style={{ 
        flex: 1, 
        marginLeft: sidebarOpen ? '260px' : '70px',
        padding: '2rem',
        transition: 'margin 0.3s'
      }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 style={{ fontSize: '1.75rem', fontWeight: 'bold', color: '#fff', marginBottom: '2rem' }}>
            عن المطور
          </h1>

          {/* Developer Card */}
          <div style={{
            background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
            borderRadius: '24px',
            padding: '2.5rem',
            marginBottom: '2rem',
            textAlign: 'center'
          }}>
            <div style={{
              width: '120px',
              height: '120px',
              borderRadius: '50%',
              background: 'rgba(255,255,255,0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.5rem'
            }}>
              <Code size={48} style={{ color: '#fff' }} />
            </div>
            <h2 style={{ fontSize: '1.75rem', fontWeight: 'bold', color: '#fff', marginBottom: '0.5rem' }}>
              Mohamed El-manzlawy
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '1.1rem', marginBottom: '1rem' }}>
              رائد في تطوير المواقع والذكاء الاصطناعي
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
              <a href="mailto:moha147wa@gmail.com" style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.75rem 1.5rem',
                background: 'rgba(255,255,255,0.2)',
                borderRadius: '12px',
                color: '#fff',
                textDecoration: 'none'
              }}>
                <Mail size={18} />
                moha147wa@gmail.com
              </a>
            </div>
          </div>

          {/* Project Info */}
          <div style={{
            background: 'rgba(255,255,255,0.05)',
            borderRadius: '16px',
            padding: '1.5rem',
            border: '1px solid rgba(255,255,255,0.1)',
            marginBottom: '1.5rem'
          }}>
            <h3 style={{ color: '#fff', fontSize: '1.25rem', marginBottom: '1rem' }}>عن المنصة</h3>
            <p style={{ color: '#94a3b8', lineHeight: 1.8 }}>
              Menzo AI هي منصة ذكية للمذاكرة مصممة خصيصاً لطلاب الصف الثالث الثانوى الأزهري. 
              تقدم المنصة جدولة ذكية للمساعدة في تنظيم وقت المذاكرة، مع دعم من الذكاء الاصطناعي 
              لتخصيص الخطط、提供نصائح مخصصة لكل طالب.
            </p>
          </div>

          {/* Tech Stack */}
          <div style={{
            background: 'rgba(255,255,255,0.05)',
            borderRadius: '16px',
            padding: '1.5rem',
            border: '1px solid rgba(255,255,255,0.1)',
            marginBottom: '1.5rem'
          }}>
            <h3 style={{ color: '#fff', fontSize: '1.25rem', marginBottom: '1rem' }}>التقنيات المستخدمة</h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
              {['Next.js 14', 'TypeScript', 'React', 'Framer Motion', 'Tailwind CSS', 'Lucide Icons', 'Supabase'].map(tech => (
                <span key={tech} style={{
                  padding: '0.5rem 1rem',
                  background: 'rgba(99,102,241,0.2)',
                  color: '#6366f1',
                  borderRadius: '20px',
                  fontSize: '0.875rem'
                }}>
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Features */}
          <div style={{
            background: 'rgba(255,255,255,0.05)',
            borderRadius: '16px',
            padding: '1.5rem',
            border: '1px solid rgba(255,255,255,0.1)'
          }}>
            <h3 style={{ color: '#fff', fontSize: '1.25rem', marginBottom: '1rem' }}>مميزات المنصة</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
              {[
                { icon: <Sparkles size={20} />, title: 'ذكاء اصطناعي', desc: 'مساعد ذكي لجدولة المذاكرة' },
                { icon: <Calendar size={20} />, title: 'جدولة مرنة', desc: 'جدول مذاكرة مخصص لأهدافك' },
                { icon: <Star size={20} />, title: 'تتبع التقدم', desc: 'راقب تقدمك بشكل مستمر' },
                { icon: <Heart size={20} />, title: 'دعم مستمر', desc: 'نصائح وتحفيز يومي' },
              ].map((feature, idx) => (
                <div key={idx} style={{
                  padding: '1rem',
                  background: 'rgba(255,255,255,0.05)',
                  borderRadius: '12px'
                }}>
                  <div style={{ color: '#6366f1', marginBottom: '0.5rem' }}>{feature.icon}</div>
                  <h4 style={{ color: '#fff', marginBottom: '0.25rem' }}>{feature.title}</h4>
                  <p style={{ color: '#94a3b8', fontSize: '0.875rem' }}>{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>

        </motion.div>
      </main>
    </div>
  );
}