import type { Metadata } from 'next';
import './globals.css';
import { Providers } from '@/components/Providers';

export const metadata: Metadata = {
  title: 'Menzo AI - منصة المذاكرة الذكية',
  description: 'منصة ذكية للمذاكرة لطلاب الصف الثالث الثانوى الأزهري - جدولة ذكية بالذكاء الاصطناعي',
  keywords: 'مذاكرة,ذكاء اصطناعي,جدول دراسي,ثانوي ازهري',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl">
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}