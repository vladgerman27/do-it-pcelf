'use client';

import Header from '@/components/header/header';

import { Toaster } from '@/components/ui/sonner';

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import CatalogInner from '@/components/catalog-inner';
import Footer from '@/components/footer/footer';

interface CatalogProps {}

const Catalog = ({}: CatalogProps) => {
    return (
        <div className="relative min-h-screen">
            <Toaster />

            <Header />

            <div className="container px-0 mx-auto">
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink href="/">Главная</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbLink>Каталог</BreadcrumbLink>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </div>

            <CatalogInner />

            <Footer className="absolute bottom-0" />
        </div>
    );
};

export default Catalog;
