import { ClerkProvider } from '@clerk/nextjs';

export const metadata = {
    title: 'Next.js',
    description: 'Generated by Next.js',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body>
                <ClerkProvider>{children}</ClerkProvider>
            </body>
        </html>
    );
}