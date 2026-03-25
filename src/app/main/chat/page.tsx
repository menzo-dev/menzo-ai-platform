'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, Calendar, MessageSquare, User, Trophy, Bell, Settings, Info,
  Menu, Send, Sparkles, Bot, Zap, Cpu, Cloud, LogOut, Mic, MicOff
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

const aiModels = [
  { id: 'gemini', name: 'Gemini', icon: <Sparkles size={20} />, color: '#6366f1' },
  { id: 'openai', name: 'OpenAI', icon: <Zap size={20} />, color: '#10b981' },
  { id: 'deepseek', name: 'DeepSeek', icon: <Cpu size={20} />, color: '#f59e0b' },
  { id: 'cloud', name: 'Cloud AI', icon: <Cloud size={20} />, color: '#ec4899' },
];

interface Message {
  id: number;
  role: 'user' | 'assistant';
  content: string;
  model?: string;
  timestamp: Date;
}

export default function ChatPage() {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selectedModel, setSelectedModel] = useState('gemini');
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Load saved API keys
    const savedMessages = localStorage.getItem('chat_history');
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages));
    }
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    // Save messages to localStorage
    localStorage.setItem('chat_history', JSON.stringify(messages));
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;
    
    const userMessage: Message = {
      id: Date.now(),
      role: 'user',
      content: input,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    // Simulate AI response (in real app, would call actual API)
    setTimeout(() => {
      const aiResponse: Message = {
        id: Date.now() + 1,
        role: 'assistant',
        content: generateAIResponse(input, selectedModel),
        model: selectedModel,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
      setLoading(false);
    }, 1500);
  };

  const generateAIResponse = (question: string, model: string): string => {
    const responses: Record<string, string> = {
      'gemini': `بناءً على سؤالك "${question}"، إليك بعض النصائح للمذاكرة:\n\n📚 ابدأ دائماً بمراجعة ما سبق وتذكر النقاط الأساسية\n\n⏰ قسم وقتك إلى فترات قصيرة (25 دقيقة مذاكرة + 5 دقائق راحة)\n\n💪 practice بشكل مستمر على حل المسائل\n\nملاحظة: يمكنك إضافة مفتاح Gemini API في الإعدادات للحصول على إجابات أكثر دقة!`,
      'openai': `شكراً لسؤالك! 🧠\n\nللإجابة على "${question}"، أنصحك بـ:\n\n1. قراءة الدرس مرة كاملة\n2. عمل ملخصات قصيرة\n3. حل التمارين بشكل مستمر\n4. المراجعة قبل النوم\n\nهل تريد أن أساعدك في شيء محدد؟`,
      'deepseek': `سؤال جيد! 💡\n\nللإجابة "${question}":\n\n• ابحث عن المصادر الموثوقة\n• записывай الملاحظات المهمة\n•Practice makes perfect - تدرب باستمرار\n\nامتحاناتك بتاريخ 6/6/2026 -_keep going!`,
      'cloud': `🤖 AI Response:\n\nYour question: "${question}"\n\nNote: Add your Cloud AI API key in Settings for personalized responses!\n\nKeep studying hard! 🌟`
    };
    return responses[model] || responses['gemini'];
  };

  const clearChat = () => {
    setMessages([]);
    localStorage.removeItem('chat_history');
  };

  const toggleVoiceInput = () => {
    setIsListening(!isListening);
    // In real app, would use Web Speech API
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
              color: idx === 2 ? '#6366f1' : '#94a3b8',
              background: idx === 2 ? 'rgba(99,102,241,0.1)' : 'transparent',
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
        transition: 'margin 0.3s',
        display: 'flex',
        flexDirection: 'column',
        height: '100vh'
      }}>
        {/* Model Selector */}
        <div style={{ 
          display: 'flex', 
          gap: '0.75rem', 
          marginBottom: '1.5rem',
          flexWrap: 'wrap'
        }}>
          {aiModels.map(model => (
            <button
              key={model.id}
              onClick={() => setSelectedModel(model.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.5rem 1rem',
                background: selectedModel === model.id ? model.color : 'rgba(255,255,255,0.05)',
                border: `1px solid ${selectedModel === model.id ? model.color : 'rgba(255,255,255,0.1)'}`,
                borderRadius: '20px',
                color: '#fff',
                fontSize: '0.875rem',
                transition: 'all 0.2s'
              }}
            >
              {model.icon}
              {model.name}
            </button>
          ))}
        </div>

        {/* Messages Area */}
        <div style={{
          flex: 1,
          background: 'rgba(255,255,255,0.05)',
          borderRadius: '16px',
          padding: '1.5rem',
          border: '1px solid rgba(255,255,255,0.1)',
          overflowY: 'auto',
          marginBottom: '1rem'
        }}>
          {messages.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '2rem' }}>
              <Bot size={48} style={{ color: '#6366f1', marginBottom: '1rem' }} />
              <h3 style={{ color: '#fff', marginBottom: '0.5rem' }}>مساعدك الذكي</h3>
              <p style={{ color: '#94a3b8' }}>اسألني أي سؤال عن المذاكرة أو جدولك!</p>
            </div>
          ) : (
            messages.map(msg => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: msg.role === 'user' ? 'flex-end' : 'flex-start',
                  marginBottom: '1rem'
                }}
              >
                <div style={{
                  maxWidth: '70%',
                  padding: '1rem',
                  background: msg.role === 'user' ? '#6366f1' : 'rgba(255,255,255,0.1)',
                  borderRadius: '16px',
                  borderBottomRightRadius: msg.role === 'user' ? '4px' : '16px',
                  borderBottomLeftRadius: msg.role === 'user' ? '16px' : '4px'
                }}>
                  <p style={{ color: '#fff', whiteSpace: 'pre-wrap' }}>{msg.content}</p>
                </div>
                <span style={{ color: '#64748b', fontSize: '0.75rem', marginTop: '0.25rem' }}>
                  {msg.model && `• ${msg.model}`}
                </span>
              </motion.div>
            ))
          )}
          {loading && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#94a3b8' }}>
              <div style={{ 
                width: '8px', height: '8px', background: '#6366f1', borderRadius: '50%',
                animation: 'pulse 1s infinite'
              }} />
              جاري الكتابة...
              <style>{`
                @keyframes pulse {
                  0%, 100% { opacity: 0.5; }
                  50% { opacity: 1; }
                }
              `}</style>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div style={{
          display: 'flex',
          gap: '0.75rem',
          alignItems: 'center'
        }}>
          <button
            onClick={toggleVoiceInput}
            style={{
              padding: '0.875rem',
              background: isListening ? '#ef4444' : 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '12px',
              color: '#fff'
            }}
          >
            {isListening ? <MicOff size={20} /> : <Mic size={20} />}
          </button>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            placeholder="اكتب سؤالك هنا..."
            style={{
              flex: 1,
              padding: '0.875rem 1rem',
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '12px',
              color: '#fff',
              fontSize: '1rem'
            }}
          />
          <button
            onClick={sendMessage}
            disabled={!input.trim() || loading}
            style={{
              padding: '0.875rem 1.5rem',
              background: '#6366f1',
              border: 'none',
              borderRadius: '12px',
              color: '#fff',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              opacity: loading ? 0.7 : 1
            }}
          >
            <Send size={18} />
            إرسال
          </button>
          {messages.length > 0 && (
            <button
              onClick={clearChat}
              style={{
                padding: '0.875rem',
                background: 'rgba(239,68,68,0.1)',
                border: 'none',
                borderRadius: '12px',
                color: '#ef4444'
              }}
            >
              🗑️
            </button>
          )}
        </div>
      </main>
    </div>
  );
}