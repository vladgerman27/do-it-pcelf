'use client';

import '@/app/globals.css';
import Header from '@/components/header/header';
import Loader from '@/components/loader';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Separator } from '@/components/ui/separator';
import server from '@/lib/api';
import { ICard } from '@/types';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { Description } from '@/types'; // Путь к вашему файлу с интерфейсом Description


interface ProductPageProps {
    params: { productId: string };
}

const ProductPage = ({ params }: ProductPageProps) => {
    const [item, setItem] = useState<ICard>();
    const [product, setProduct] = useState<ICard | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            const response = await server.get(`/products/get-product/${params.productId}`);

            console.log('🚀 ~ fetchData ~ response:', response.data.data);
            setItem(response.data.data);
            setProduct(response.data.data)
        };

        try {
            fetchData();
        } catch (error) {
            console.error(error);
        }
    }, []);

    return (
        <>
            <Header />

            <div className="container mx-auto">
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink href="/">Главная</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbLink href="/catalog">Каталог</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbLink>Компьютер</BreadcrumbLink>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </div>

            <div>
                {product?.specs?.descriptions && (
                    <div className="container mx-auto mt-12">
                        {item ? (
                            <div className="grid grid-cols-3 mb-[30px]">
                                <div>
                                    <Image src={item.image} alt="product" width={500} height={500} />
                                </div>
                                <div>
                                    <p>{item.name}</p>
                                    <div className="flex h-5 gap-4 items-center">
                                        <p>{item.shipping.delivery}</p>
                                        <Separator orientation="vertical" className="border border-rose-500 h-full" />
                                        <p>{item.shipping.pickup}</p>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <Loader />
                        )}

                        {Object.entries(
                            product.specs.descriptions.reduce((acc: {[key: string]: Description[]}, curr: Description) => {
                                if (!acc[curr.header]) {
                                    acc[curr.header] = [];
                                }
                                acc[curr.header].push(curr);
                                return acc;
                            }, {})
                        ).map(([header, descriptions], index) => (
                            <div key={index} className='mb-[80px]'>
                                <nav className='text-xl font-bold mb-[10px]'>{header}</nav>
                                {descriptions.map((description, i) => (
                                    <div key={i} className={`grid grid-cols-2 gap-4 text-lg mb-[12px] ${i % 2 === 0 ? 'bg-none' : ' bg-neutral-200'}`}>
                                            <div className='text-left p-[6px]'>{description.title}</div>
                                            <div className='text-left p-[6px]'>{description.description}</div>
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
};

export default ProductPage;
