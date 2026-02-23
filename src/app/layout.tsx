import type { Metadata } from 'next';
import { Nunito } from 'next/font/google';
import './globals.css';
import Header from '@/components/layout/Header/Header';
import Footer from '@/components/layout/Footer';
import SwiperStyles from '@/components/SwiperStyles';

const nunito = Nunito({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Ekomart - Grocery Store eCommerce',
  description: 'Fresh groceries, organic produce, and healthy food delivered to your door. Shop now for amazing deals on fruits, vegetables, dairy, and more.',
  keywords: 'grocery, organic, fresh produce, healthy food, ecommerce',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={nunito.className}>
        <SwiperStyles />
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
