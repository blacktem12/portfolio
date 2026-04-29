import { Geist_Mono, Noto_Sans_KR } from 'next/font/google';

export const notoSansKr = Noto_Sans_KR({
  variable: '--font-sans',
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  display: 'swap',
});

export const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const fontVariables = `${notoSansKr.variable} ${geistMono.variable}`;
