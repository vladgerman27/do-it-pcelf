import Link from 'next/link';
import { Button } from '../ui/button';

interface FooterProps {
    className?: string;
}

const Footer = ({ className }: FooterProps) => {
    return (
        <footer className={`w-full py-3 mt-24 bg-neutral-800 flex items-center justify-center text-white ${className}`}>
            <Link href="https://github.com/makkenzo" target="_blank">
                <Button variant="link">@makkenzo</Button>
            </Link>
            <span className="text-3xl pb-2">+</span>
            <Link href="https://github.com/vladgerman27" target="_blank">
                <Button variant="link">@vladgerman27</Button>
            </Link>
        </footer>
    );
};

export default Footer;
