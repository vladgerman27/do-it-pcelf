'use client';

import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from '@/components/ui/pagination';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import server from '@/lib/api';
import { ICard } from '@/types';
import { useUser } from '@clerk/nextjs';
import { useEffect, useState } from 'react';
import ProductCard from './card';
import Filters from './filters';
import Loader from './loader';
import { Button } from './ui/button';

interface SideFiltersProps {}

const CatalogInner = ({}: SideFiltersProps) => {
    const { isSignedIn, user, isLoaded } = useUser();

    const [data, setData] = useState<ICard[]>([]);
    const [totalProducts, setTotalProducts] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 9;

    useEffect(() => {
        setData([]);
    }, [currentPage]);

    useEffect(() => {
        setTotalPages(Math.ceil(totalProducts / productsPerPage));
    }, [totalProducts]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await server.get('/products/get-products', {
                params: { page: currentPage, limit: productsPerPage },
            });

            if (response.status === 200) {
                setData(response.data.data);
                setTotalProducts(response.data.total_in_db);
            }
        };

        fetchData();
    }, [currentPage]);

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const renderPageNumbers = () => {
        const pageNumbers = [];

        for (let i = 1; i <= totalPages; i++) {
            pageNumbers.push(
                <PaginationItem key={i}>
                    <PaginationLink href="#" onClick={() => setCurrentPage(i)}>
                        {i}
                    </PaginationLink>
                </PaginationItem>
            );
        }

        return pageNumbers;
    };

    return (
        <div className="mt-8 mx-auto container px-0 flex flex-col gap-4">
            {/* Filters */}
            <div className="flex w-full justify-between">
                <div className="flex items-center justify-between w-[300px]">
                    <nav className=" text-xl">Фильтры</nav>
                    <Button variant="ghost">Очистить</Button>
                </div>

                <Select>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Сортировать по:" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="down">Цена: по убыванию</SelectItem>
                        <SelectItem value="up">Цена: по возрастанию</SelectItem>
                        <SelectItem value="new">Новинка</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <div className="grid grid-cols-4">
                <Filters />

                <div className="col-span-3">
                    {data && data.length > 0 ? (
                        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-3">
                            {data.map((item, index) => (
                                <ProductCard item={item} showDeliveryInfo />
                            ))}
                        </div>
                    ) : (
                        <div className="w-full h-full flex items-center justify-center">
                            <Loader />
                        </div>
                    )}

                    <Pagination className="mt-8 mb-28">
                        <PaginationContent>
                            <PaginationItem onClick={handlePreviousPage}>
                                <PaginationPrevious href="#" />
                            </PaginationItem>
                            {renderPageNumbers()}
                            <PaginationItem onClick={handleNextPage}>
                                <PaginationNext href="#" />
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination>
                </div>
            </div>
        </div>
    );
};

export default CatalogInner;
