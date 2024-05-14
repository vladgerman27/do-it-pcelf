import '@/app/globals.css';
import server from '@/lib/api';
import { Metadata } from 'next';

import { Inter } from 'next/font/google';

const inter = Inter({
    subsets: ['latin'],
});

type Props = {
    params: { productId: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const id = params.productId;

    const product = await server.get(`/products/get-product/${id}`);

    const resMetadata = product.data.data;

    return {
        title: resMetadata.name,
        description: 'Продукт',
    };
}

export default function ProductPageLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body className={inter.className}>{children}</body>
        </html>
    );
}
