'use client';

import server from '@/lib/api';
import { ICard } from '@/types';
import { useUser } from '@clerk/nextjs';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Heart, Package, ShoppingCart, Truck } from 'lucide-react';
import { Button } from './ui/button';
import { Toaster } from './ui/sonner';
import { toast } from 'sonner';

interface ProductCardProps {
    item: ICard;
    showDeliveryInfo?: boolean;
    minHeight?: number;
}

const ProductCard = ({ item, showDeliveryInfo = false, minHeight = 500 }: ProductCardProps) => {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const [buttonHovered, setButtonHovered] = useState(false);
    const [isPending, setIsPending] = useState(false);

    const { user } = useUser();
    const router = useRouter();

    useEffect(() => {
        console.log('🚀 ~ ProductCard ~ item:', item);
    }, []);

    const handleAddToProductCard = async (item: ICard) => {
        setIsPending(true);

        if (!user) {
            setIsPending(false);
            return;
        }

        try {
            const data = {
                item_id: item._id,
                user_id: user.id,
            };

            const response = await server.post('/user/add-to-cart', data);

            if (response.status === 200) {
                toast.success('Товар успешно добавлен в корозину!');
            }
        } catch (error) {
            console.error(error);
        } finally {
            setIsPending(false);
        }
    };

    return (
        <Card className={`min-h-[${minHeight}px] flex flex-col justify-between`}>
            <CardHeader>
                {/* <CardTitle>{item.name.slice(0, 30)}..</CardTitle> */}
                <CardDescription>{item.name}</CardDescription>
            </CardHeader>
            <CardContent>
                <Link href={`/product/${item._id}`}>
                    <Image src={item.image} alt="computer" height={272} width={272} />
                </Link>
                <div className="flex flex-col gap-2 w-full justify-between">
                    {showDeliveryInfo && (
                        <div className="flex justify-between mt-4">
                            <p className="flex gap-2 items-center">
                                <Truck />
                                {item.shipping.pickup}
                            </p>
                            |
                            <p className="flex gap-2 items-center">
                                <Package />
                                {item.shipping.delivery}
                            </p>
                        </div>
                    )}
                </div>
            </CardContent>
            <CardFooter className="w-full gap-4 flex flex-col items-start">
                <p className="font-semibold text-2xl">{item.price}тг.</p>
                <div className="flex justify-between gap-4">
                    <Button
                        disabled={isPending}
                        className="w-full text-lg flex gap-2 items-center"
                        onClick={() => handleAddToProductCard(item)}
                    >
                        <ShoppingCart size={20} /> В корзину
                    </Button>
                    <Button variant="secondary" disabled={isPending}>
                        <Heart size={20} />
                    </Button>
                </div>
            </CardFooter>
        </Card>
    );
};

export default ProductCard;
