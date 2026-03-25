'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, Calendar, MessageSquare, User, Trophy, Bell, Settings, Info,
  Menu, Sparkles, LogOut, Award, Star, Target, Zap, Flame, Medal
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

const achievements = [
  { id: 1, title: 'أول خطوة', desc: 'ابدأ المذاكرة لأول مرة', icon: <Star size={24} />, color: '#fbbf24', earned: true },
  { id: 2, title: 'يوم متتالي', desc: 'مذاكرة لمدة يوم كامل', icon: <Flame size={24} />, color: '#f97316', earned: true },
  { id: 3, title: 'أسبوع متتالي', desc: 'مذاكرة لمدة أسبوع كامل', icon: <Award size={24} />, color: '#ef4444', earned: false },
  { id: 4, title: 'مذاكرة مكثقة', desc: 'مذاكرة 5 ساعات في يوم واحد', icon: <Zap size={24} />, color: '#8b5cf6', earned: true },
  { id: 5, title: 'هدف 달성', desc: 'أكمل هدف مذاكرة معين', icon: <Target size={24} />, color: '#10b981', earned: true },
  { id: 6, title: 'بطل المذاكرة', desc: 'مذاكرة شهر كامل', icon: <Medal size={24} />, color: '#ec4899', earned: false },
  { id: 7, title: 'متفاعل', desc: 'استخدم المساعد الذكي 10 مرات', icon: <Sparkles size={24} />, color: '#6366f1', earned: false },
  { id: 8, title: 'منظم', desc: 'أنشئ 5 جداول مذاكرة', icon: <Calendar size={24} />, color: '#14b8a6', earned: false },
];

const stats = {
  totalDays: 15,
  totalHours: 48,
  subjectsCompleted: 7,
  streak: 3
};

export default function AchievementsPage() {
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
              color: idx === 4 ? '#6366f1' : '#94a3b8',
              background: idx === 4 ? 'rgba(99,102,241,0.1)' : 'transparent',
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
            الإنجازات
          </h1>

          {/* Stats */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
            {[
              { icon: <Flame size={24} />, value: stats.streak, label: 'أيام متتالية', color: '#f97316' },
              { icon: <Calendar size={24} />, value: stats.totalDays, label: 'أيام المذاكرة', color: '#6366f1' },
              { icon: <Zap size={24} />, value: stats.totalHours, label: 'ساعات المذاكرة', color: '#fbbf24' },
              { icon: <Target size={24} />, value: stats.subjectsCompleted, label: 'مواد مكتملة', color: '#10b981' },
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
                  border: '1px solid rgba(255,255,255,0.1)',
                  textAlign: 'center'
                }}
              >
                <div style={{ color: stat.color, marginBottom: '0.5rem', display: 'flex', justifyContent: 'center' }}>{stat.icon}</div>
                <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#fff' }}>{stat.value}</div>
                <div style={{ color: '#94a3b8', fontSize: '0.875rem' }}>{stat.label}</div>
              </motion.div>
            ))}
          </div>

          {/* Achievements Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '1rem' }}>
            {achievements.map((achievement, idx) => (
              <motion.div
                key={achievement.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.1 }}
                style={{
                  background: achievement.earned 
                    ? `linear-gradient(135deg, ${achievement.color}20 0%, ${achievement.color}10 100%)`
                    : 'rgba(255,255,255,0.05)',
                  borderRadius: '16px',
                  padding: '1.5rem',
                  border: `1px solid ${achievement.earned ? achievement.color : 'rgba(255,255,255,0.1)'}`,
                  opacity: achievement.earned ? 1 : 0.5,
                  transition: 'all 0.3s'
                }}
              >
                <div style={{ 
                  width: '50px', 
                  height: '50px', 
                  borderRadius: '50%', 
                  background: achievement.earned ? achievement.color : 'rgba(255,255,255,0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1rem',
                  color: '#fff'
                }}>
                  {achievement.icon}
                </div>
                <h3 style={{ color: '#fff', marginBottom: '0.5rem' }}>{achievement.title}</h3>
                <p style={{ color: '#94a3b8', fontSize: '0.875rem' }}>{achievement.desc}</p>
                {achievement.earned && (
                  <div style={{ 
                    display: 'inline-block',
                    marginTop: '0.75rem',
                    padding: '0.25rem 0.75rem',
                    background: '#10b981',
                    borderRadius: '20px',
                    fontSize: '0.75rem',
                    color: '#fff'
                  }}>
                    ✓ تم الحصول
                  </div>
                )}
              </motion.div>
            ))}
          </div>

        </motion.div>
      </main>
    </div>
  );
}