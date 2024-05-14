'use client';

import { FaApple, FaPaypal } from 'react-icons/fa';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

interface PaymentMethodProps {
    disabled?: boolean;
}

const PaymentMethod = ({ disabled }: PaymentMethodProps) => {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Метод оплаты</CardTitle>
                <CardDescription>Добавьте новый способ оплаты в свой аккаунт</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">
                <RadioGroup disabled={disabled} defaultValue="card" className="grid grid-cols-3 gap-4">
                    <div>
                        <RadioGroupItem value="card" id="card" className="peer sr-only" aria-label="Card" />
                        <Label
                            htmlFor="card"
                            className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-transparent p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                className="mb-3 h-6 w-6"
                            >
                                <rect width="20" height="14" x="2" y="5" rx="2" />
                                <path d="M2 10h20" />
                            </svg>
                            Карта
                        </Label>
                    </div>

                    <div>
                        <RadioGroupItem value="paypal" id="paypal" className="peer sr-only" aria-label="Paypal" />
                        <Label
                            htmlFor="paypal"
                            className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-transparent p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                        >
                            <FaPaypal className="mb-3 h-6 w-6" />
                            Paypal
                        </Label>
                    </div>

                    <div>
                        <RadioGroupItem value="apple" id="apple" className="peer sr-only" aria-label="Apple" />
                        <Label
                            htmlFor="apple"
                            className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-transparent p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                        >
                            <FaApple className="mb-3 h-6 w-6" />
                            Apple
                        </Label>
                    </div>
                </RadioGroup>
                <div className="grid gap-2">
                    <Label htmlFor="name">ФИО</Label>
                    <Input disabled={disabled} id="name" placeholder="Зубенко Михаил Петрович" />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="city">Город</Label>
                    <Input disabled={disabled} id="city" placeholder="Сицилия" />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="number">Номер карты</Label>
                    <Input disabled={disabled} id="number" placeholder="4400 0000 4444 0000" />
                </div>
                <div className="grid grid-cols-3 gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="month">Срок действия</Label>
                        <Select disabled={disabled}>
                            <SelectTrigger id="month" aria-label="Месяц">
                                <SelectValue placeholder="Месяц" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="1">Январь</SelectItem>
                                <SelectItem value="2">Февраль</SelectItem>
                                <SelectItem value="3">Март</SelectItem>
                                <SelectItem value="4">Апрель</SelectItem>
                                <SelectItem value="5">Май</SelectItem>
                                <SelectItem value="6">Июнь</SelectItem>
                                <SelectItem value="7">Июль</SelectItem>
                                <SelectItem value="8">Август</SelectItem>
                                <SelectItem value="9">Сентябрь</SelectItem>
                                <SelectItem value="10">Октябрь</SelectItem>
                                <SelectItem value="11">Ноябрь</SelectItem>
                                <SelectItem value="12">Декабрь</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="year">Год</Label>
                        <Select disabled={disabled}>
                            <SelectTrigger id="year" aria-label="Год">
                                <SelectValue placeholder="Год" />
                            </SelectTrigger>
                            <SelectContent>
                                {Array.from({ length: 10 }, (_, i) => (
                                    <SelectItem key={i} value={`${new Date().getFullYear() + i}`}>
                                        {new Date().getFullYear() + i}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="cvc">CVC</Label>
                        <Input disabled={disabled} id="cvc" placeholder="CVC" />
                    </div>
                </div>
            </CardContent>
            <CardFooter>
                <Button disabled={disabled} className="w-full">
                    Продолжить
                </Button>
            </CardFooter>
        </Card>
    );
};

export default PaymentMethod;
