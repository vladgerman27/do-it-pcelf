'use client';

import Link from 'next/link';

import { useState, useEffect } from 'react';
import { UserButton, useAuth } from '@clerk/nextjs';
import { Search, User } from 'lucide-react';
import { ScrollArea } from '@radix-ui/react-scroll-area';
import Logo from '../../../public/img/logo.png';
import { Button } from '../ui/button';
import server from '@/lib/api';
import { ICard } from '@/types';

const Header = () => {
    // const user = useSelector((state: RootState) => state.user);
    const { userId } = useAuth();
    const [items, setItems] = useState<ICard[]>([]);
    const [search, setSearch] = useState('');
    const [filteredItems, setFilteredItems] = useState<ICard[]>([]); 
    const [isSearchVisible, setSearchVisible] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const response = await server.get('/products/get-products');

            if (response.status === 200) {
                setItems(response.data.data);
            }
        };

        fetchData();
    }, []);

    const handleSearchClick = () => {
        setSearchVisible(!isSearchVisible);
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value);
        if (Array.isArray(items)) { 
            const filtered = items.filter(item =>
                item.name.toLowerCase().includes(event.target.value.toLowerCase())
            );
            console.log(filtered);
            setFilteredItems(filtered); 
        }
    };

    return (
        <div className="sticky top-0 z-[100] mb-4 drop-shadow-md">
            <header className="w-full  flex justify-around py-5 bg-white">
                <Link href="/">
                    <img src={Logo.src} />
                </Link>
                <div className="py-4">
                    <Link href="/catalog">
                        <Button variant="link" className="text-xl" size="lg">
                            Каталог
                        </Button>
                    </Link>
                    <Link href="/basket">
                        <Button variant="link" className="text-xl" size="lg">
                            Корзина
                        </Button>
                    </Link>
                </div>
                <div className="flex gap-4 items-center">
                    <Search className="w-8 h-8 " onClick={handleSearchClick}/>
                    {isSearchVisible && (
                        <ScrollArea className="h-[200px] w-[350px] rounded-md border p-4">
                            <input value={search} onChange={handleInputChange} placeholder='Поиск...' className='w-full border-b-2 focus:border-none'/>
                            {filteredItems.map(item => (
                                <div className='flex my-[12px]'>
                                    <img src={item.image} className='w-[50px] h-[50px]'/>
                                    <div className='ml-[6px] text-base'>
                                        <nav className='mb-[6px]'>{item.name.slice(0, 23) + '...'}</nav>
                                        <nav>{item.price.toLocaleString('ru-RU')}тг</nav>
                                    </div>
                                </div> 
                            ))}
                        </ScrollArea>
                    )}
                    {userId ? (
                        <UserButton afterSignOutUrl="/" />
                    ) : (
                        <Link href="/sign-in">
                            <User className="w-8 h-8 " />
                        </Link>
                    )}
                </div>
            </header>
            <hr className="border-1 border-rose-500" />
        </div>
    );
};

export default Header;
