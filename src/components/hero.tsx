'use client';

interface HeroProps {}

const Hero = ({}: HeroProps) => {
    return (
        <div className="flex justify-between mx-auto px-0 container mt-12 relative">
            <div>
                <p className="text-4xl">Только у нас!</p>
                <p className="text-3xl flex mt-5">
                    Инновационные <span className="text-orange-500 ml-2">решения</span>
                </p>
            </div>
            <img src="/img/banner.png" />
            <div className="flex justify-between items-center container px-16 pt-6 pb-8 mx-auto bg-black/50 rounded-lg blur-sm -bottom-4 -z-10 absolute opacity-50">
                <a>
                    <img className="pt-1" src="/img/apple.png" />
                </a>
                <a>
                    <img className="pt-5" src="/img/canon.png" />
                </a>
                <a>
                    <img className="pt-5" src="/img/lenovo.png" />
                </a>
                <a>
                    <img className="pt-5" src="/img/samsung.png" />
                </a>
                <a>
                    <img className="pt-5" src="/img/sony.png" />
                </a>
            </div>
        </div>
    );
};

export default Hero;
