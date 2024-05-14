'use client';

import server from '@/lib/api';
import { ICard, IConvertedCard } from '@/types';
import { useUser } from '@clerk/nextjs';
import Image from 'next/image';
import { Suspense, useEffect, useState } from 'react';
import PaymentMethod from './payment-method';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Separator } from './ui/separator';
import Loader from './loader';
import { HoverEffect } from './ui/card-hover-effect';

const BasketInner = () => {
    const [items, setItems] = useState<ICard[]>();
    const [total, setTotal] = useState(0);
    const [convertedItems, setConvertedItems] = useState<IConvertedCard[]>();
    const [isPending, setIsPending] = useState(false);

    const { user } = useUser();

    useEffect(() => {
        const fetchData = async () => {
            if (user) {
                try {
                    const response = await server.get(`/user/get-cart/${user.id}`);
                    setItems(response.data.items);
                    setTotal(response.data.items.reduce((total: any, item: any) => total + item.price, 0));

                    const convertedData = response.data.items.map((item: any) => ({
                        title: item.price,
                        description: item.name,
                        link: item._id,
                        image: item.image,
                    }));

                    setConvertedItems(convertedData);
                } catch (error) {
                    console.error(error);
                }
            }
        };

        fetchData();
    }, [user, items]);

    const handleDeleteFromCart = async (id: string) => {
        if (user) {
            setIsPending(true);

            try {
                await server.delete(`/user/remove-from-cart/${user.id}/${id}`);
                setItems([]);
            } catch (error) {
                console.error(error);
            } finally {
                setIsPending(false);
            }
        }
    };

    return (
        <div className="w-full">
            <div className="flex container mx-auto px-0 justify-between pt-12">
                <div className="block w-6/12">
                    {convertedItems ? (
                        <div className="w-[920px]">
                            <HoverEffect
                                items={convertedItems}
                                titleSpan="тг."
                                onDelete={handleDeleteFromCart}
                                pending={isPending}
                            />
                        </div>
                    ) : (
                        <div className="w-full h-[500px] flex items-center justify-center">
                            <Loader />
                        </div>
                    )}
                    {convertedItems?.length === 0 && <p>Ничего нет..</p>}
                </div>

                <div className="w-1/3 bg-white px-8 py-4 rounded-lg space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Ваш заказ</CardTitle>
                        </CardHeader>
                        <Separator className="mb-4 mx-auto max-w-[90%]" />
                        <CardContent>
                            {items ? (
                                items.length > 0 ? (
                                    items.map((item) => (
                                        <div
                                            key={item._id}
                                            className="mt-8 w-full flex justify-between text-neutral-500 text-base"
                                        >
                                            <nav>{item.name.slice(0, 30) + '...'}</nav>
                                            <nav>{item.price.toLocaleString('ru-RU')}тг</nav>
                                        </div>
                                    ))
                                ) : (
                                    <p>Ничего нет</p>
                                )
                            ) : (
                                <div className="w-full flex justify-center">
                                    <Loader className="my-4" size={8} />
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Итого</CardTitle>
                        </CardHeader>
                        <Separator className="mb-4 mx-auto max-w-[90%]" />
                        <CardContent>
                            {items ? (
                                <p className=" font-semibold text-xl">{total.toLocaleString('ru-RU')}тг</p>
                            ) : (
                                <div className="w-full flex justify-center">
                                    <Loader className="my-2" size={8} />
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    <PaymentMethod disabled={items && items.length > 0 ? false : true} />
                </div>
            </div>
        </div>
    );
};

export default BasketInner;
