import Link from 'next/link';
import { useState } from 'react';
import { MenuIcon } from '@heroicons/react/solid'
import { MenuAlt2Icon } from '@heroicons/react/solid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDiscord, faTwitter, faInstagramSquare } from '@fortawesome/free-brands-svg-icons'
import { Opensea } from './Opensea';
import Image from 'next/image'
import logik from '../public/logiklogo.png'
import { OpenseaSmall } from './OpenseaSmall';
import { useEthers, shortenAddress } from '@usedapp/core';
import { useRouter } from "next/router";

import { config } from "@fortawesome/fontawesome-svg-core";

config.autoAddCss = false;

export const Navbar = ({ children }) => {
    const { activateBrowserWallet, account } = useEthers();
    const [active, setActive] = useState(false);
    const router = useRouter();

    const handleClick = () => {
        setActive(!active);
    };

    return (
        <nav className='bg-white z-30'>
            <div className="navbar bg-white text-black">
                <div className="px-2 md:mx-2 navbar-start w-1/3 md:w-1/2">
                    <div className="hidden items-center md:flex">
                        <div className="hidden mr-6 md:block">
                            <a href="https://discord.com/invite/S9nue2Sm6a" className="hidden md:block">
                                <FontAwesomeIcon icon={faDiscord} size="2x" className='text-black hover:text-yellow-main hidden md:block' />
                            </a>
                        </div>
                        <div className="hidden mr-6 md:block">
                            <a href="https://twitter.com/JulianGilliam" className="hidden md:block">
                                <FontAwesomeIcon icon={faTwitter} size="2x" className='text-black hover:text-yellow-main hidden md:block' />
                            </a>
                        </div>
                        <div className="hidden mr-6 md:block">
                            <a href="https://www.instagram.com/juliangilliam/" className="hidden md:block">
                                <FontAwesomeIcon icon={faInstagramSquare} size="2x" className='text-black hover:text-yellow-main hidden md:block' />
                            </a>
                        </div>
                        <div className="hidden mr-6 md:block">
                            <a href="https://opensea.io/collection/product-of-america" className="hidden md:block">
                                <Opensea className="hidden md:block" />
                            </a>
                        </div>
                    </div>
                </div>
                <div className="px-2 mx-2 navbar-center lg:flex">
                    <div className="flex items-stretch">
                        <Link href="/">
                            <a>
                                <Image src={logik} quality={100} width={75} height={46} className=""/>
                            </a>
                        </Link>
                    </div>
                </div>
                <div className="navbar-end">
                    <button className="border-solid border-2 border-gray-500 text-black pl-8 ml-auto md:pl-16 py-1 pr-2 rounded-md hover:bg-yellow-main" onClick={() => activateBrowserWallet()} >
                            {account ? shortenAddress(account) : (<span>connect 🦊</span>)}
                    </button>
                </div>
            </div>
            <div
                    className={`${active ? '' : 'hidden'
                        }   w-full`}
                >
                    <div className='w-full items-start flex flex-col'>
                        <Link href="/bodega">
                            <a className=' w-full px-8 py-2 text-black font-bold items-center justify-center hover:bg-yellow-main hover:text-black'>Bodega</a>
                        </Link>
                        { router.pathname === '/bodega' && 
                                <Link href='#about-juice'>
                                    <a className=' w-full px-8 py-2 text-black font-bold items-center justify-center hover:bg-yellow-main hover:text-black '>
                                        About Juice Box
                                    </a>
                                </Link>}
                        {
                            router.pathname === '/' && 
                            <>
                                <Link href='#roadmap'>
                                    <a className=' w-full px-8 py-2 text-black font-bold items-center justify-center hover:bg-yellow-main hover:text-black '>
                                        Road Map
                                    </a>
                                </Link>
                                <Link href='#juice'>
                                    <a className=' w-full px-8 py-2 text-black font-bold items-center justify-center hover:bg-yellow-main hover:text-black'>
                                        Juice Meter
                                    </a>
                                </Link>
                            </>
                        }
                    </div>
                    <div className="flex items-center px-8 py-2 md:hidden">
                        <div className="mr-6 flex md:hidden">
                            <a href="https://discord.com/invite/S9nue2Sm6a" className="">
                                <FontAwesomeIcon icon={faDiscord} size="lg" className='text-black hover:text-yellow-main' />
                            </a>
                        </div>
                        <div className="mr-6 flex md:hidden">
                            <a href="https://twitter.com/JulianGilliam" className="">
                                <FontAwesomeIcon icon={faTwitter} size="lg" className='text-black hover:text-yellow-main' />
                            </a>
                        </div>
                        <div className="mr-6 flex md:hidden">
                            <a href="https://www.instagram.com/juliangilliam/" className="">
                                <FontAwesomeIcon icon={faInstagramSquare} size="lg" className='text-black hover:text-yellow-main' />
                            </a>
                        </div>
                        <div className="mr-6 flex md:hidden">
                            <a href={router.pathname === '/' ? 'https://opensea.io/collection/the-plug-by-logik': 'https://opensea.io/collection/juicebox-by-logik'}>
                                <OpenseaSmall />
                            </a>
                        </div>
                    </div>
                </div>
        </nav>
    );
};