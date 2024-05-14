'use client';

import Card from '@/components/card';
import Footer from '@/components/footer/footer';
import Header from '@/components/header/header';
import Hero from '@/components/hero';
import Loader from '@/components/loader';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import EmblaCarousel from '@/components/ui/slider/EmblaCarousel';
import server from '@/lib/api';
import store from '@/store/store';
import { ICard } from '@/types';
import { EmblaOptionsType } from 'embla-carousel';
import { ElementRef, useEffect, useRef, useState } from 'react';
import { Provider } from 'react-redux';

export default function Home() {
    const [data, setData] = useState<ICard[]>([]);
    const ref = useRef<ElementRef<'div'>>(null);

    const OPTIONS: EmblaOptionsType = { loop: true };
    const SLIDE_COUNT = 5;
    const SLIDES = Array.from(Array(SLIDE_COUNT).keys());

    useEffect(() => {
        const fetchData = async () => {
            const response = await server.get('/products/get-products', { params: { page: 1, limit: 8 } });

            if (response.status === 200) {
                setData(response.data.data);
            }
        };

        fetchData();
    }, []);

    return (
        <Provider store={store}>
            <div className="w-full dark:border dark:border-white/[0.1] rounded-md relative overflow-clip" ref={ref}>
                <Header />
                <Hero />

                <div className="mx-52 my-24">
                    <nav className="w-full pb-2 text-3xl  border-b-2 border-white mb-20">ХИТ ПРОДАЖ</nav>
                    <div className="flex mb-14 px-10">
                        {data && data.length > 0 ? (
                            <Carousel
                                opts={{
                                    align: 'start',
                                }}
                                className="w-full"
                            >
                                <CarouselContent>
                                    {data.map((item, index) => (
                                        <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/5">
                                            <Card item={item} minHeight={500} />
                                        </CarouselItem>
                                    ))}
                                </CarouselContent>
                                <CarouselPrevious />
                                <CarouselNext />
                            </Carousel>
                        ) : (
                            <div className="w-full h-[240px] flex justify-center items-center">
                                <Loader />
                            </div>
                        )}
                    </div>
                </div>

                <section className="px-0 w-full">
                    <EmblaCarousel slides={SLIDES} options={OPTIONS} />
                </section>

                <Footer />
            </div>
        </Provider>
    );
}
