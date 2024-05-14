'use client';

import Header from '@/components/header/header';
import { useUser } from '@clerk/nextjs';
import BasketInner from '@/components/basket';
import { Suspense } from 'react';

interface BasketProps {}

const Basket = ({}: BasketProps) => {
    const { user } = useUser();

    return (
        <div>
            <Header />

            <BasketInner />
        </div>
    );
};

export default Basket;
