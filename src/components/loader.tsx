'use client';

interface LoaderProps {
    className?: string;
    size?: number;
}

const Loader = ({ className, size = 12 }: LoaderProps) => {
    return (
        <div
            className={`rounded-md h-${size} w-${size} border-4 border-t-4 border-rose-500 animate-spin ${className}`}
        ></div>
    );
};

export default Loader;
