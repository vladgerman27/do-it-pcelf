import { ClerkProvider } from '@clerk/nextjs';
import { neobrutalism } from '@clerk/themes';
import { Inter } from 'next/font/google';
import '@/app/globals.css';

export const metadata = {
    title: 'Do It PCelf | Auth',
    description: 'Авторизация',
};

const inter = Inter({
    weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
    subsets: ['latin', 'cyrillic'],
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <ClerkProvider
            appearance={{
                baseTheme: neobrutalism,
            }}
        >
            <html lang="en">
                <body className={`${inter.className} h-screen flex justify-center items-center`}>{children}</body>
            </html>
        </ClerkProvider>
    );
}
