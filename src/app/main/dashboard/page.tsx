'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';
import { 
  LayoutDashboard, Calendar, MessageSquare, User, Trophy, Bell, Settings, Info,
  Clock, Target, CheckCircle, Brain, TrendingUp, BookOpen, AlertCircle, ChevronRight,
  Sparkles, ArrowRight, LogOut, Moon, Sun, Menu
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

const defaultSubjects = [
  { name: 'اللغة العربية', completed: 5, total: 10, color: '#6366F1' },
  { name: 'القرآن الكريم', completed: 8, total: 12, color: '#10B981' },
  { name: 'الحديث', completed: 4, total: 8, color: '#F59E0B' },
  { name: 'الفقه', completed: 6, total: 10, color: '#EC4899' },
  { name: 'التوحيد', completed: 7, total: 10, color: '#8B5CF6' },
];

export default function Dashboard() {
  const router = useRouter();
  const { user, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const examDate = new Date('2026-06-06');
  const today = new Date();
  const daysUntilExam = Math.ceil((examDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  const totalProgress = defaultSubjects.reduce((acc, s) => acc + s.completed, 0);
  const totalTasks = defaultSubjects.reduce((acc, s) => acc + s.total, 0);
  const progressPercent = Math.round((totalProgress / totalTasks) * 100);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'صباح الخير';
    if (hour < 18) return 'مساء الخير';
    return 'مساء الخير';
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
              color: '#94a3b8',
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
          <button onClick={logout} style={{
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
        {/* Welcome */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
            borderRadius: '20px',
            padding: '2rem',
            marginBottom: '2rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '1rem'
          }}
        >
          <div>
            <h1 style={{ fontSize: '1.75rem', fontWeight: 'bold', color: '#fff', marginBottom: '0.5rem' }}>
              {getGreeting()}, {user?.full_name || 'الطالب'}
            </h1>
            <p style={{ color: 'rgba(255,255,255,0.8)' }}>مستعد للمذاكرة اليوم؟</p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#fff' }}>{daysUntilExam}</div>
              <div style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.875rem' }}>يوم للامتحان</div>
            </div>
          </div>
        </motion.div>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
          {[
            { icon: <Target size={24} />, value: `${progressPercent}%`, label: 'مستوى التقدم', color: '#6366f1' },
            { icon: <CheckCircle size={24} />, value: totalProgress, label: 'موضوعات مكتملة', color: '#10b981' },
            { icon: <Brain size={24} />, value: '3', label: 'أيام متتالية', color: '#f59e0b' },
            { icon: <TrendingUp size={24} />, value: '+15%', label: 'تحسن هذا الأسبوع', color: '#ec4899' },
          ].map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              style={{
                background: 'rgba(255,255,255,0.05)',
                borderRadius: '16px',
                padding: '1.5rem',
                border: '1px solid rgba(255,255,255,0.1)'
              }}
            >
              <div style={{ color: stat.color, marginBottom: '0.5rem' }}>{stat.icon}</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#fff' }}>{stat.value}</div>
              <div style={{ color: '#94a3b8', fontSize: '0.875rem' }}>{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Subjects */}
        <div style={{
          background: 'rgba(255,255,255,0.05)',
          borderRadius: '16px',
          padding: '1.5rem',
          border: '1px solid rgba(255,255,255,0.1)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <h2 style={{ color: '#fff', fontSize: '1.25rem' }}>المواد الدراسية</h2>
            <a href="/main/achievements" style={{ color: '#6366f1', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
              عرض الكل <ChevronRight size={16} />
            </a>
          </div>
          
          {defaultSubjects.map((subject, idx) => (
            <div key={idx} style={{ marginBottom: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <span style={{ color: '#fff' }}>{subject.name}</span>
                <span style={{ color: '#94a3b8', fontSize: '0.875rem' }}>{subject.completed}/{subject.total}</span>
              </div>
              <div style={{ height: '8px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px', overflow: 'hidden' }}>
                <div style={{
                  width: `${(subject.completed / subject.total) * 100}%`,
                  height: '100%',
                  background: subject.color,
                  borderRadius: '4px'
                }} />
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}