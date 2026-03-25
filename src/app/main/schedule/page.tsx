'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, Calendar, MessageSquare, User, Trophy, Bell, Settings, Info,
  Menu, Plus, Trash2, Edit2, CheckCircle, Circle, Sparkles, LogOut, Grid, List
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

const days = ['السبت', 'الأحد', 'الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة'];
const timeSlots = ['6-7', '7-8', '8-9', '9-10', '10-11', '11-12', '12-1', '1-2', '2-3', '3-4', '4-5', '5-6'];

const initialSchedule = [
  { id: 1, day: 'السبت', time: '6-7', subject: 'اللغة العربية', type: 'مذاكرة', completed: true },
  { id: 2, day: 'السبت', time: '7-8', subject: 'القرآن الكريم', type: 'مذاكرة', completed: false },
  { id: 3, day: 'الأحد', time: '8-9', subject: 'الحديث', type: 'مراجعة', completed: true },
  { id: 4, day: 'الأحد', time: '9-10', subject: 'الفقه', type: 'مذاكرة', completed: false },
  { id: 5, day: 'الإثنين', time: '6-7', subject: 'التوحيد', type: 'مذاكرة', completed: true },
  { id: 6, day: 'الإثنين', time: '7-8', subject: 'اللغة العربية', type: 'مراجعة', completed: false },
];

export default function SchedulePage() {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [viewMode, setViewMode] = useState<'sheet' | 'card'>('sheet');
  const [schedule, setSchedule] = useState(initialSchedule);
  const [newItem, setNewItem] = useState({ day: 'السبت', time: '6-7', subject: '', type: 'مذاكرة' });

  const addScheduleItem = () => {
    if (newItem.subject) {
      setSchedule([...schedule, { ...newItem, id: Date.now(), completed: false }]);
      setNewItem({ ...newItem, subject: '' });
    }
  };

  const toggleComplete = (id: number) => {
    setSchedule(schedule.map(item => 
      item.id === id ? { ...item, completed: !item.completed } : item
    ));
  };

  const deleteItem = (id: number) => {
    setSchedule(schedule.filter(item => item.id !== id));
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
              color: idx === 1 ? '#6366f1' : '#94a3b8',
              background: idx === 1 ? 'rgba(99,102,241,0.1)' : 'transparent',
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
            <h1 style={{ fontSize: '1.75rem', fontWeight: 'bold', color: '#fff' }}>
              جدول المذاكرة
            </h1>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button
                onClick={() => setViewMode('sheet')}
                style={{
                  padding: '0.5rem 1rem',
                  background: viewMode === 'sheet' ? '#6366f1' : 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '8px',
                  color: '#fff',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}
              >
                <Grid size={16} /> جدول
              </button>
              <button
                onClick={() => setViewMode('card')}
                style={{
                  padding: '0.5rem 1rem',
                  background: viewMode === 'card' ? '#6366f1' : 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '8px',
                  color: '#fff',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}
              >
                <List size={16} /> بطاقات
              </button>
            </div>
          </div>

          {/* Add New Item */}
          <div style={{
            background: 'rgba(255,255,255,0.05)',
            borderRadius: '16px',
            padding: '1.5rem',
            border: '1px solid rgba(255,255,255,0.1)',
            marginBottom: '1.5rem'
          }}>
            <h3 style={{ color: '#fff', marginBottom: '1rem' }}>إضافة جديد</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem' }}>
              <select
                value={newItem.day}
                onChange={(e) => setNewItem({ ...newItem, day: e.target.value })}
                style={{
                  padding: '0.75rem',
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '8px',
                  color: '#fff'
                }}
              >
                {days.map(day => <option key={day} value={day}>{day}</option>)}
              </select>
              <select
                value={newItem.time}
                onChange={(e) => setNewItem({ ...newItem, time: e.target.value })}
                style={{
                  padding: '0.75rem',
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '8px',
                  color: '#fff'
                }}
              >
                {timeSlots.map(time => <option key={time} value={time}>{time}</option>)}
              </select>
              <input
                type="text"
                value={newItem.subject}
                onChange={(e) => setNewItem({ ...newItem, subject: e.target.value })}
                placeholder="اسم المادة"
                style={{
                  padding: '0.75rem',
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '8px',
                  color: '#fff'
                }}
              />
              <button
                onClick={addScheduleItem}
                style={{
                  padding: '0.75rem',
                  background: '#6366f1',
                  border: 'none',
                  borderRadius: '8px',
                  color: '#fff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem'
                }}
              >
                <Plus size={18} /> إضافة
              </button>
            </div>
          </div>

          {viewMode === 'sheet' ? (
            // Sheet View
            <div style={{
              background: 'rgba(255,255,255,0.05)',
              borderRadius: '16px',
              padding: '1.5rem',
              border: '1px solid rgba(255,255,255,0.1)',
              overflowX: 'auto'
            }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr>
                    <th style={{ padding: '1rem', color: '#94a3b8', textAlign: 'right' }}>اليوم</th>
                    <th style={{ padding: '1rem', color: '#94a3b8', textAlign: 'right' }}>الوقت</th>
                    <th style={{ padding: '1rem', color: '#94a3b8', textAlign: 'right' }}>المادة</th>
                    <th style={{ padding: '1rem', color: '#94a3b8', textAlign: 'right' }}>الحالة</th>
                    <th style={{ padding: '1rem', color: '#94a3b8', textAlign: 'right' }}>إجراءات</th>
                  </tr>
                </thead>
                <tbody>
                  {schedule.map((item) => (
                    <tr key={item.id} style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                      <td style={{ padding: '1rem', color: '#fff' }}>{item.day}</td>
                      <td style={{ padding: '1rem', color: '#94a3b8' }}>{item.time}</td>
                      <td style={{ padding: '1rem', color: '#fff' }}>{item.subject}</td>
                      <td style={{ padding: '1rem' }}>
                        <button
                          onClick={() => toggleComplete(item.id)}
                          style={{
                            background: 'none',
                            border: 'none',
                            color: item.completed ? '#10b981' : '#94a3b8',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem'
                          }}
                        >
                          {item.completed ? <CheckCircle size={20} /> : <Circle size={20} />}
                          {item.completed ? 'مكتمل' : 'قيد المذاكرة'}
                        </button>
                      </td>
                      <td style={{ padding: '1rem' }}>
                        <button
                          onClick={() => deleteItem(item.id)}
                          style={{
                            background: 'none',
                            border: 'none',
                            color: '#ef4444',
                            cursor: 'pointer'
                          }}
                        >
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            // Card View
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1rem' }}>
              {schedule.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  style={{
                    background: 'rgba(255,255,255,0.05)',
                    borderRadius: '16px',
                    padding: '1.5rem',
                    border: '1px solid rgba(255,255,255,0.1)'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                      <h3 style={{ color: '#fff', marginBottom: '0.5rem' }}>{item.subject}</h3>
                      <p style={{ color: '#94a3b8', fontSize: '0.875rem' }}>{item.day} - {item.time}</p>
                    </div>
                    <button
                      onClick={() => toggleComplete(item.id)}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: item.completed ? '#10b981' : '#94a3b8',
                        cursor: 'pointer'
                      }}
                    >
                      {item.completed ? <CheckCircle size={24} /> : <Circle size={24} />}
                    </button>
                  </div>
                  <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
                    <span style={{ 
                      padding: '0.25rem 0.75rem', 
                      background: item.type === 'مذاكرة' ? 'rgba(99,102,241,0.2)' : 'rgba(245,158,11,0.2)',
                      color: item.type === 'مذاكرة' ? '#6366f1' : '#f59e0b',
                      borderRadius: '20px',
                      fontSize: '0.75rem'
                    }}>
                      {item.type}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

        </motion.div>
      </main>
    </div>
  );
}