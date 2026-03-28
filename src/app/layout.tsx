import type { Metadata } from 'next';
import '../styles/global.css';

export const metadata: Metadata = {
  title: 'CMO Roadmap Generator | 90-Day Marketing Roadmap',
  description:
    'Answer 7 questions and get a personalized, phased 90-day marketing roadmap tailored to your business stage, goals, and team capacity.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
