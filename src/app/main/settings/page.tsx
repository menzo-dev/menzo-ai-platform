'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, Calendar, MessageSquare, User, Trophy, Bell, Settings, Info,
  Menu, Save, Key, Eye, EyeOff, Beaker, PenTool, Sparkles, LogOut
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

export default function SettingsPage() {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [theme, setTheme] = useState('dark');
  const [notifications, setNotifications] = useState(true);
  const [sound, setSound] = useState(true);
  
  // API Keys
  const [geminiKey, setGeminiKey] = useState('');
  const [openaiKey, setOpenaiKey] = useState('');
  const [deepseekKey, setDeepseekKey] = useState('');
  const [showKeys, setShowKeys] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const storedTheme = localStorage.getItem('menzo_theme') || 'dark';
    setTheme(storedTheme);
    
    // Load saved API keys
    const savedGemini = localStorage.getItem('gemini_api_key') || '';
    const savedOpenAI = localStorage.getItem('openai_api_key') || '';
    const savedDeepSeek = localStorage.getItem('deepseek_api_key') || '';
    setGeminiKey(savedGemini);
    setOpenaiKey(savedOpenAI);
    setDeepseekKey(savedDeepSeek);
  }, []);

  const handleSaveApiKeys = () => {
    localStorage.setItem('gemini_api_key', geminiKey);
    localStorage.setItem('openai_api_key', openaiKey);
    localStorage.setItem('deepseek_api_key', deepseekKey);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme);
    localStorage.setItem('menzo_theme', newTheme);
    document.body.style.background = newTheme === 'dark' ? '#0f172a' : '#f8fafc';
    document.body.style.color = newTheme === 'dark' ? '#fff' : '#0f172a';
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
          <h1 style={{ fontSize: '1.75rem', fontWeight: 'bold', color: '#fff', marginBottom: '2rem' }}>
            الإعدادات
          </h1>

          {/* API Keys Section */}
          <div style={{
            background: 'rgba(255,255,255,0.05)',
            borderRadius: '16px',
            padding: '1.5rem',
            border: '1px solid rgba(255,255,255,0.1)',
            marginBottom: '1.5rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
              <Key style={{ color: '#6366f1' }} size={24} />
              <h2 style={{ color: '#fff', fontSize: '1.25rem' }}>إعدادات API Keys</h2>
            </div>
            
            <p style={{ color: '#94a3b8', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
              هنا تقدر تحط مفاتيح API الخاصة بك للاستخدام مع المساعد الذكي. 
              هذه المفاتيح بتتخزن في المتصفح بتاعك ومش بتتحpload للجيت هاب.
            </p>

            {/* Gemini API */}
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', color: '#fff', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
                Gemini API Key
              </label>
              <input
                type={showKeys ? 'text' : 'password'}
                value={geminiKey}
                onChange={(e) => setGeminiKey(e.target.value)}
                placeholder="AIzaSy..."
                style={{
                  width: '100%',
                  padding: '0.875rem 1rem',
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '12px',
                  color: '#fff',
                  fontSize: '0.9rem',
                  fontFamily: 'monospace'
                }}
              />
            </div>

            {/* OpenAI API */}
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', color: '#fff', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
                OpenAI API Key
              </label>
              <input
                type={showKeys ? 'text' : 'password'}
                value={openaiKey}
                onChange={(e) => setOpenaiKey(e.target.value)}
                placeholder="sk-proj-..."
                style={{
                  width: '100%',
                  padding: '0.875rem 1rem',
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '12px',
                  color: '#fff',
                  fontSize: '0.9rem',
                  fontFamily: 'monospace'
                }}
              />
            </div>

            {/* DeepSeek API */}
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', color: '#fff', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
                DeepSeek API Key
              </label>
              <input
                type={showKeys ? 'text' : 'password'}
                value={deepseekKey}
                onChange={(e) => setDeepseekKey(e.target.value)}
                placeholder="sk-..."
                style={{
                  width: '100%',
                  padding: '0.875rem 1rem',
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '12px',
                  color: '#fff',
                  fontSize: '0.9rem',
                  fontFamily: 'monospace'
                }}
              />
            </div>

            {/* Show/Hide Keys Toggle */}
            <button
              onClick={() => setShowKeys(!showKeys)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.5rem 1rem',
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '8px',
                color: '#94a3b8',
                marginBottom: '1rem'
              }}
            >
              {showKeys ? <EyeOff size={16} /> : <Eye size={16} />}
              {showKeys ? 'إخفاء المفاتيح' : 'إظهار المفاتيح'}
            </button>

            {/* Save Button */}
            <button
              onClick={handleSaveApiKeys}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.75rem 1.5rem',
                background: saved ? '#10b981' : '#6366f1',
                color: '#fff',
                borderRadius: '12px',
                fontSize: '1rem',
                fontWeight: '600'
              }}
            >
              <Save size={18} />
              {saved ? '✅ تم الحفظ!' : 'حفظ المفاتيح'}
            </button>
          </div>

          {/* Theme Section */}
          <div style={{
            background: 'rgba(255,255,255,0.05)',
            borderRadius: '16px',
            padding: '1.5rem',
            border: '1px solid rgba(255,255,255,0.1)',
            marginBottom: '1.5rem'
          }}>
            <h2 style={{ color: '#fff', fontSize: '1.25rem', marginBottom: '1.5rem' }}>المظهر</h2>
            
            <div style={{ display: 'flex', gap: '1rem' }}>
              <button
                onClick={() => handleThemeChange('dark')}
                style={{
                  flex: 1,
                  padding: '1rem',
                  background: theme === 'dark' ? '#6366f1' : 'rgba(255,255,255,0.05)',
                  border: `1px solid ${theme === 'dark' ? '#6366f1' : 'rgba(255,255,255,0.1)'}`,
                  borderRadius: '12px',
                  color: '#fff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem'
                }}
              >
                <Moon size={20} />
                داكن
              </button>
              <button
                onClick={() => handleThemeChange('light')}
                style={{
                  flex: 1,
                  padding: '1rem',
                  background: theme === 'light' ? '#6366f1' : 'rgba(255,255,255,0.05)',
                  border: `1px solid ${theme === 'light' ? '#6366f1' : 'rgba(255,255,255,0.1)'}`,
                  borderRadius: '12px',
                  color: '#fff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem'
                }}
              >
                <Sun size={20} />
                فاتح
              </button>
            </div>
          </div>

          {/* Notifications Section */}
          <div style={{
            background: 'rgba(255,255,255,0.05)',
            borderRadius: '16px',
            padding: '1.5rem',
            border: '1px solid rgba(255,255,255,0.1)'
          }}>
            <h2 style={{ color: '#fff', fontSize: '1.25rem', marginBottom: '1.5rem' }}>الإشعارات</h2>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <span style={{ color: '#fff' }}>تفعيل الإشعارات</span>
              <button
                onClick={() => setNotifications(!notifications)}
                style={{
                  width: '50px',
                  height: '26px',
                  background: notifications ? '#6366f1' : 'rgba(255,255,255,0.1)',
                  borderRadius: '13px',
                  position: 'relative',
                  border: 'none',
                  cursor: 'pointer'
                }}
              >
                <div style={{
                  width: '22px',
                  height: '22px',
                  background: '#fff',
                  borderRadius: '50%',
                  position: 'absolute',
                  top: '2px',
                  left: notifications ? '26px' : '2px',
                  transition: 'all 0.2s'
                }} />
              </button>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ color: '#fff' }}>الصوت</span>
              <button
                onClick={() => setSound(!sound)}
                style={{
                  width: '50px',
                  height: '26px',
                  background: sound ? '#6366f1' : 'rgba(255,255,255,0.1)',
                  borderRadius: '13px',
                  position: 'relative',
                  border: 'none',
                  cursor: 'pointer'
                }}
              >
                <div style={{
                  width: '22px',
                  height: '22px',
                  background: '#fff',
                  borderRadius: '50%',
                  position: 'absolute',
                  top: '2px',
                  left: sound ? '26px' : '2px',
                  transition: 'all 0.2s'
                }} />
              </button>
            </div>
          </div>

        </motion.div>
      </main>
    </div>
  );
}