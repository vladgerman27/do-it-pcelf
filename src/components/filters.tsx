'use client';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';

interface FiltersProps {}

const Filters = ({}: FiltersProps) => {
    return (
        <Accordion type="single" collapsible className="w-72 px-0">
            <AccordionItem value="item-1" className=" px-4">
                <AccordionTrigger>Бренд</AccordionTrigger>
                <AccordionContent>
                    <Checkbox id="terms" className="border-white mr-4" />
                    <label
                        htmlFor="terms"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed 
                                    peer-disabled:opacity-70"
                    >
                        Asus
                    </label>
                </AccordionContent>
                <AccordionContent>
                    <Checkbox id="terms" className="border-white mr-4" />
                    <label
                        htmlFor="terms"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed 
                                    peer-disabled:opacity-70"
                    >
                        Neo
                    </label>
                </AccordionContent>
                <AccordionContent>
                    <Checkbox id="terms" className="border-white mr-4" />
                    <label
                        htmlFor="terms"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed 
                                    peer-disabled:opacity-70"
                    >
                        TechnoGaming
                    </label>
                </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2" className=" px-4">
                <div className="flex justify-between my-2">
                    Скидка <Switch className="" />
                </div>
            </AccordionItem>

            <AccordionItem value="item-3" className=" px-4">
                <AccordionTrigger>Цена</AccordionTrigger>
                <AccordionContent>
                    <Input placeholder="макс." className="w-40 mx-auto placeholder:text-neutral-500" />
                    <Slider defaultValue={[0]} max={100} step={1} className="mt-8" />
                </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4" className=" px-4">
                <AccordionTrigger>Процессор</AccordionTrigger>
                <AccordionContent>
                    <Checkbox className="border-white mr-4" />
                    <label
                        htmlFor="terms"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed 
                                peer-disabled:opacity-70"
                    >
                        Intel Core i3
                    </label>
                </AccordionContent>
                <AccordionContent>
                    <Checkbox className="border-white mr-4" />
                    <label
                        htmlFor="terms"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed 
                                peer-disabled:opacity-70"
                    >
                        Intel Core i5
                    </label>
                </AccordionContent>
                <AccordionContent>
                    <Checkbox className="border-white mr-4" />
                    <label
                        htmlFor="terms"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed 
                                peer-disabled:opacity-70"
                    >
                        Intel Core i7
                    </label>
                </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5" className=" px-4">
                <AccordionTrigger>Видеокарта</AccordionTrigger>
                <AccordionContent>
                    <Checkbox className="border-white mr-4" />
                    <label
                        htmlFor="terms"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed 
                                peer-disabled:opacity-70"
                    >
                        NVIDIA
                    </label>
                </AccordionContent>
                <AccordionContent>
                    <Checkbox className="border-white mr-4" />
                    <label
                        htmlFor="terms"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed 
                                peer-disabled:opacity-70"
                    >
                        AMD
                    </label>
                </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-6" className=" px-4">
                <AccordionTrigger>ОЗУ</AccordionTrigger>
                <AccordionContent>
                    <Checkbox className="border-white mr-4" />
                    <label
                        htmlFor="terms"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed 
                                peer-disabled:opacity-70"
                    >
                        8гб
                    </label>
                </AccordionContent>
                <AccordionContent>
                    <Checkbox className="border-white mr-4" />
                    <label
                        htmlFor="terms"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed 
                                peer-disabled:opacity-70"
                    >
                        16гб
                    </label>
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    );
};

export default Filters;
