'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, Calendar, MessageSquare, User, Trophy, Bell, Settings, Info,
  Menu, Camera, Mail, BookOpen, Sparkles, LogOut, Beaker, PenTool
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

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

export default function ProfilePage() {
  const router = useRouter();
  const { user, updateProfile } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [name, setName] = useState(user?.full_name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [stream, setStream] = useState(user?.stream || 'science');
  const [avatar, setAvatar] = useState(user?.avatar_url || '');
  const [saving, setSaving] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (user) {
      setName(user.full_name);
      setEmail(user.email);
      setStream(user.stream);
      setAvatar(user.avatar_url || '');
    }
  }, [user]);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    setSaving(true);
    updateProfile({ full_name: name, email, stream: stream as 'science' | 'literature', avatar_url: avatar });
    setTimeout(() => {
      setSaving(false);
      alert('✅ تم حفظ التغييرات!');
    }, 1000);
  };

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
              color: idx === 3 ? '#6366f1' : '#94a3b8',
              background: idx === 3 ? 'rgba(99,102,241,0.1)' : 'transparent',
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
            الملف الشخصي
          </h1>

          {/* Avatar Section */}
          <div style={{
            background: 'rgba(255,255,255,0.05)',
            borderRadius: '16px',
            padding: '2rem',
            border: '1px solid rgba(255,255,255,0.1)',
            marginBottom: '1.5rem',
            textAlign: 'center'
          }}>
            <div style={{ position: 'relative', display: 'inline-block', marginBottom: '1rem' }}>
              <div style={{
                width: '120px',
                height: '120px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto',
                overflow: 'hidden'
              }}>
                {avatar ? (
                  <img src={avatar} alt="Avatar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  <User size={48} style={{ color: '#fff' }} />
                )}
              </div>
              <button
                onClick={() => fileInputRef.current?.click()}
                style={{
                  position: 'absolute',
                  bottom: 0,
                  right: 0,
                  width: '36px',
                  height: '36px',
                  background: '#6366f1',
                  border: '3px solid #0f172a',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#fff',
                  cursor: 'pointer'
                }}
              >
                <Camera size={16} />
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
                style={{ display: 'none' }}
              />
            </div>
            <p style={{ color: '#94a3b8', fontSize: '0.875rem' }}>
              اضغط على الكاميرا لتغيير صورة الملف الشخصي
            </p>
          </div>

          {/* Profile Info */}
          <div style={{
            background: 'rgba(255,255,255,0.05)',
            borderRadius: '16px',
            padding: '1.5rem',
            border: '1px solid rgba(255,255,255,0.1)',
            marginBottom: '1.5rem'
          }}>
            {/* Name */}
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', color: '#fff', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
                <User size={16} style={{ marginRight: '0.5rem', verticalAlign: 'middle' }} />
                الاسم الكامل
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.875rem 1rem',
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '12px',
                  color: '#fff',
                  fontSize: '1rem'
                }}
              />
            </div>

            {/* Email */}
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', color: '#fff', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
                <Mail size={16} style={{ marginRight: '0.5rem', verticalAlign: 'middle' }} />
                البريد الإلكتروني
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.875rem 1rem',
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '12px',
                  color: '#fff',
                  fontSize: '1rem'
                }}
              />
            </div>

            {/* Stream */}
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', color: '#fff', marginBottom: '0.75rem', fontSize: '0.9rem' }}>
                <BookOpen size={16} style={{ marginRight: '0.5rem', verticalAlign: 'middle' }} />
                الشعبة الدراسية
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
                    justifyContent: 'center',
                    gap: '0.5rem'
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
                    border: `1px solid ${stream === 'literation' ? '#6366f1' : 'rgba(255,255,255,0.1)'}`,
                    borderRadius: '12px',
                    color: '#fff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem'
                  }}
                >
                  <PenTool size={20} />
                  أدبي
                </button>
              </div>
            </div>

            {/* Save Button */}
            <button
              onClick={handleSave}
              disabled={saving}
              style={{
                width: '100%',
                padding: '1rem',
                background: saving ? '#10b981' : '#6366f1',
                color: '#fff',
                borderRadius: '12px',
                fontSize: '1rem',
                fontWeight: '600'
              }}
            >
              {saving ? '✅ تم الحفظ!' : 'حفظ التغييرات'}
            </button>
          </div>

        </motion.div>
      </main>
    </div>
  );
}