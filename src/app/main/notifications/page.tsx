'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, Calendar, MessageSquare, User, Trophy, Bell, Settings, Info,
  Menu, Sparkles, LogOut, BellRing, CheckCircle, AlertCircle, Info as InfoIcon
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

const notifications = [
  { id: 1, type: 'tip', title: 'نصيحة للمذاكرة', message: 'تذكر أن تأخذ استراحات قصيرة بين فترات المذاكرة لتحسين التركيز!', time: 'منذ ساعة', read: false },
  { id: 2, type: 'success', title: 'تم إنجاز مهمة', message: 'تهانينا! لقد أكملت مذاكرة اللغة العربية بنجاح.', time: 'منذ ساعتين', read: true },
  { id: 3, type: 'warning', title: 'موعد الامتحان', message: 'تبقى 70 يوماً على امتحانات نهاية العام. ابدأ بالمراجعة الآن!', time: 'منذ يوم', read: false },
  { id: 4, type: 'info', title: 'جدول جديد', message: 'تم إنشاء جدول مذاكرة جديد لك. تحقق منه الآن!', time: 'منذ يومين', read: true },
  { id: 5, type: 'tip', title: 'نصيحة للتوحيد', message: 'خصص ساعة إضافية هذا الأسبوع لمراجعة التوحيد قبل الامتحان.', time: 'منذ 3 أيام', read: true },
];

export default function NotificationsPage() {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [notifs, setNotifs] = useState(notifications);
  const [filter, setFilter] = useState<'all' | 'unread'>('all');

  const markAsRead = (id: number) => {
    setNotifs(notifs.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const markAllAsRead = () => {
    setNotifs(notifs.map(n => ({ ...n, read: true })));
  };

  const filteredNotifs = filter === 'unread' ? notifs.filter(n => !n.read) : notifs;
  const unreadCount = notifs.filter(n => !n.read).length;

  const getIcon = (type: string) => {
    switch (type) {
      case 'success': return <CheckCircle size={20} style={{ color: '#10b981' }} />;
      case 'warning': return <AlertCircle size={20} style={{ color: '#f59e0b' }} />;
      case 'info': return <InfoIcon size={20} style={{ color: '#6366f1' }} />;
      default: return <BellRing size={20} style={{ color: '#8b5cf6' }} />;
    }
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
              color: idx === 5 ? '#6366f1' : '#94a3b8',
              background: idx === 5 ? 'rgba(99,102,241,0.1)' : 'transparent',
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
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
            <div>
              <h1 style={{ fontSize: '1.75rem', fontWeight: 'bold', color: '#fff' }}>
                الإشعارات
              </h1>
              {unreadCount > 0 && (
                <p style={{ color: '#94a3b8', marginTop: '0.5rem' }}>
                  لديك {unreadCount} إشعار غير مقروء
                </p>
              )}
            </div>
            <button
              onClick={markAllAsRead}
              style={{
                padding: '0.5rem 1rem',
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '8px',
                color: '#94a3b8'
              }}
            >
              تحديد الكل كمقروء
            </button>
          </div>

          {/* Filter */}
          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem' }}>
            <button
              onClick={() => setFilter('all')}
              style={{
                padding: '0.5rem 1rem',
                background: filter === 'all' ? '#6366f1' : 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '8px',
                color: '#fff'
              }}
            >
              الكل
            </button>
            <button
              onClick={() => setFilter('unread')}
              style={{
                padding: '0.5rem 1rem',
                background: filter === 'unread' ? '#6366f1' : 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '8px',
                color: '#fff'
              }}
            >
              غير مقروء ({unreadCount})
            </button>
          </div>

          {/* Notifications List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {filteredNotifs.map((notif, idx) => (
              <motion.div
                key={notif.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                onClick={() => markAsRead(notif.id)}
                style={{
                  background: notif.read ? 'rgba(255,255,255,0.05)' : 'rgba(99,102,241,0.1)',
                  borderRadius: '16px',
                  padding: '1.5rem',
                  border: '1px solid rgba(255,255,255,0.1)',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
              >
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                  <div style={{ 
                    width: '40px', 
                    height: '40px', 
                    borderRadius: '50%', 
                    background: 'rgba(255,255,255,0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    {getIcon(notif.type)}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                      <h3 style={{ color: '#fff', fontWeight: '600' }}>{notif.title}</h3>
                      <span style={{ color: '#64748b', fontSize: '0.75rem' }}>{notif.time}</span>
                    </div>
                    <p style={{ color: '#94a3b8', fontSize: '0.9rem' }}>{notif.message}</p>
                  </div>
                  {!notif.read && (
                    <div style={{
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      background: '#6366f1',
                      flexShrink: 0
                    }} />
                  )}
                </div>
              </motion.div>
            ))}
          </div>

        </motion.div>
      </main>
    </div>
  );
}