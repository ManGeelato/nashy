import { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ReactNode, useContext, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import { AuthContext } from '../providers/AuthProvider';
import { PartsContext } from '../providers/PartsProvider';
import { links, carImages, storeInfo } from '../utils/constants';

interface Props {
    children: ReactNode;
    title?: string;
    backgroundImage?: string;
    imageHeight: string;
    imageText?: any
    headerMinimal?: boolean
}

const Layout: NextPage<Props> = ({children, title, backgroundImage, imageHeight, imageText, headerMinimal} : Props) => {

    const router = useRouter();
    const defaultTitle = router.pathname.replace('/', '');

    return (
        <>
            <Head>
                <title>{title ? title : defaultTitle.charAt(0).toUpperCase() + defaultTitle.slice(1) + ' - ' + storeInfo.name}</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className='min-h-screen flex flex-col'>
                <ToastContainer />
                <Header />
                <OldHeader backgroundImage={backgroundImage} imageHeight={imageHeight} headerMinimal={headerMinimal} imageText={imageText}/>
                <div className='flex-1'>
                    {children}
                </div>
                <Footer />
            </div>
        </>
    )
}

export const Header = () => {
    const [showMenu, setShowMenu] = useState(false);
    const { user, signOut } = useContext(AuthContext);
    const { cart } = useContext(PartsContext);
    const router = useRouter();

    const HeaderTitle = () => {
        let key = ''
        if (router.pathname === '/') key = 'Home';
        else if (router.pathname === '/parts') key = 'Home';
        else if (router.pathname === '/about') key = 'About';
        else if (router.pathname === '/services') key = 'Services';
        else if (router.pathname === '/contact') key = 'Appointment';
        else if (router.pathname === '/cart') key = 'Cart';
        else if (router.pathname === '/profile') key = 'Profile';
        else if (router.pathname === '/signin') key = 'Sign In';
        else if (router.pathname === '/signup') key = 'Sign Up';
        else key = router.pathname;

        return <h1 className='mobile ml-6'>{key}</h1>
    }

    const otherLinks = [
        {name: 'Profile', showUsername: true, url: '/profile', svg: () => (
            <>
                <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
                <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
            </>
        )},
        {name: 'cart', url: '/cart', svg: () => (
            <>
                <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z"/>    
            </>
        )}
    ]
    return <header className='lg:hidden'>
        <div onClick={(e: any) => {
            e.stopPropagation();
            setShowMenu(false)
        }} className={`${showMenu && 'h-screen z-40 flex flex-col bg-black bg-opacity-70 absolute top-0 bottom-0 right-0 left-0'}`}>
            {<div className='w-full mb-4 py-3 flex justify-between items-center shadow bg-white px-4'>
                <div className='flex items-center'>
                    <button onClick={(e) => {
                        e.stopPropagation();
                        setShowMenu(true)
                    }}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi w-7 h-7 bi-list" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/>
                        </svg>
                    </button>
                    {HeaderTitle()}
                </div>
                <ul className='flex items-center space-x-4'>
                    {otherLinks.map((headeItem, index) => {
                        return <li key={index}>
                            <Link href={headeItem.url}>
                        <a className='flex items-center'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="h-6 w-6" viewBox="0 0 16 16">
                                {headeItem.svg()}
                            </svg>
                        </a>
                    </Link>  
                        </li>
                    })}
                </ul>
            </div>}
            {showMenu && <div className='bg-white z-50 flex flex-col w-3/5 fixed top-0 bottom-0'>
                <div className='bg-black w-full px-4 flex items-center justify-center'>
                    <Link href={'/'}><Image className='cursor-pointer' src={'/images/Logo.png'} alt='logo' width={80} height={80} /></Link>
                </div>
                <ul className='flex-1 relative p-8 space-y-4'>
                    {links.map((headeItem, index) => {
                        return <li key={index}><Link href={headeItem.url}><a className='text-sm'>{headeItem.name}</a></Link></li>
                    })}
                    <ul className='absolute right-0 left-0 bottom-0 py-2'>
                        {user && <button onClick={() => signOut?.()} className='relative flex w-full items-center space-x-4 px-4 py-2'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="h-6 w-6" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z"/>
                                <path fillRule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"/>
                            </svg>
                            <span className='text-sm'>Logout</span>
                        </button>}
                        {user && <Link href={'/orders'}>
                            <a className='relative flex w-full items-center space-x-4 px-4 py-2'>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="h-6 w-6" viewBox="0 0 16 16">
                                    <path d="M11.354 6.354a.5.5 0 0 0-.708-.708L8 8.293 6.854 7.146a.5.5 0 1 0-.708.708l1.5 1.5a.5.5 0 0 0 .708 0l3-3z"/>
                                    <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1H.5zm3.915 10L3.102 4h10.796l-1.313 7h-8.17zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
                                </svg>
                                <span className='text-sm'>My Orders</span>
                            </a>
                        </Link> }
                    </ul>
                </ul>
            </div>}
        </div>
    </header>
}

export const OldHeader = ({backgroundImage, imageHeight, imageText, headerMinimal} : any) => {
    const [showMenu, setShowMenu] = useState(false);
    const { cart } = useContext(PartsContext);
    const {user} = useContext(AuthContext);
    const router = useRouter();

    return (
    <header className={`${headerMinimal ? 'bg-black' : ''} hidden lg:block`}>
        <div className='container hidden px-10 mx-auto bg-black text-gray-100 lg:flex items-center justify-between relative'>
            <Link href={'/'}><Image className='cursor-pointer' src={'/images/Logo.png'} alt='logo' width={110} height={110} /></Link>
            <div className='flex space-x-8'>
                <div className='grid items-center shrink-1 grid-cols-[auto_auto] grid-rows-2'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi row-span-2 w-6 mr-4 h-6 bi-geo-fill" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M4 4a4 4 0 1 1 4.5 3.969V13.5a.5.5 0 0 1-1 0V7.97A4 4 0 0 1 4 3.999zm2.493 8.574a.5.5 0 0 1-.411.575c-.712.118-1.28.295-1.655.493a1.319 1.319 0 0 0-.37.265.301.301 0 0 0-.057.09V14l.002.008a.147.147 0 0 0 .016.033.617.617 0 0 0 .145.15c.165.13.435.27.813.395.751.25 1.82.414 3.024.414s2.273-.163 3.024-.414c.378-.126.648-.265.813-.395a.619.619 0 0 0 .146-.15.148.148 0 0 0 .015-.033L12 14v-.004a.301.301 0 0 0-.057-.09 1.318 1.318 0 0 0-.37-.264c-.376-.198-.943-.375-1.655-.493a.5.5 0 1 1 .164-.986c.77.127 1.452.328 1.957.594C12.5 13 13 13.4 13 14c0 .426-.26.752-.544.977-.29.228-.68.413-1.116.558-.878.293-2.059.465-3.34.465-1.281 0-2.462-.172-3.34-.465-.436-.145-.826-.33-1.116-.558C3.26 14.752 3 14.426 3 14c0-.599.5-1 .961-1.243.505-.266 1.187-.467 1.957-.594a.5.5 0 0 1 .575.411z"/>
                    </svg>
                    <h1 className='uppercase font-bold text-xs'>Our location</h1> 
                    <p className='text-sm'>{storeInfo.location}</p>  
                </div>                        
                <div className='grid items-center shrink-1 grid-cols-[auto_auto] grid-rows-2'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi row-span-2 w-6 mr-4 h-6 bi-geo-fill" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z"/>
                    </svg>
                    <h1 className='uppercase font-bold text-xs'>Call Us</h1> 
                    <p className='text-sm'>{storeInfo.phone}</p>  
                </div>    
                <Link href={'/profile'}>
                    <a className='relative flex items-center flex-col justify-center'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="h-6 w-6" viewBox="0 0 16 16">
                            <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
                            <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
                        </svg>
                        <span className='text-xs mt-2'>{user ? user.user.username : 'Sign In'}</span>
                    </a>
                </Link>        
                <Link href={'/cart'}>
                    <a className='relative flex items-center justify-center'>
                        <span className='absolute top-0 right-0'>{cart.count}</span>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-bag mr-3 h-6 w-6" viewBox="0 0 16 16">
                            <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z"/>
                        </svg>
                    </a>
                </Link>              
            </div>
        </div>
        {backgroundImage && (
            <div className={imageHeight + ' flex flex-col relative bg-center bg-no-repeat bg-cover bg'} style={{boxShadow: 'inset 0 0 0 100vw rgba(0,0,0, .8)', backgroundImage: `url(${backgroundImage})`}}>
                <div className='flex justify-between h-14 relative px-4 lg:px-0 lg:justify-start items-center bg-black container pt-1.5 mx-auto lg:border-t'>
                    <div className={`bg-brand ${showMenu ? 'block' : 'hidden'} left-0 right-0 py-6 lg:py-0 top-14 absolute lg:static z-10 w-full flex-1 lg:flex items-center justify-center`}>
                        <nav>
                            <ul className='lg:flex text-center lg:space-x-4'>
                                {links.map(link => <li key={link.url} className='lg:py-4 py-2'><Link href={link.url}><a className={`lg:font-bold text-xl ${router.pathname === link.url ? 'text-black' : 'text-gray-100'}`}>{link.name}</a></Link></li>)}
                            </ul>
                        </nav>
                    </div>
                    <button onClick={() => setShowMenu(prev => !prev)} className='bg-brand lg:hidden flex items-center justify-center h-8 w-8 text-white'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi w-6 h-6 bi-list" viewBox="0 0 16 16">
                        {showMenu ? <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/> :
                            <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/>}
                        </svg>
                    </button>
                    <div className='lg:w-1/5 text-red-500 z-10 space-x-4 flex items-center justify-center'>
                        <h1 className='uppercase'>Follow Us</h1>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi h-5 h-5 bi-facebook" viewBox="0 0 16 16">
                            <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z"/>
                        </svg>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi h-5 h-5 bi-facebook" viewBox="0 0 16 16">
                            <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z"/>
                        </svg>
                    </div>
                </div>
                {imageText ? imageText : (
                    <div className='flex-1 px-20 container mx-auto flex text-white space-y-4 flex-col items-center justify-center'>
                        <h1 className='text-3xl font-bold uppercase'>{router.pathname.replace('/', '')}</h1>
                        <h1 className='capitalize'>Home <span className='text-red-600'>&gt;</span> {router.pathname.replace('/', '')}</h1>
                    </div>
                )}
            </div>
        )}
    </header>
)}

export const Footer = () => {
    return (
        <footer className='text-white desktop relative py-10 bg-no-repeat bg-cover' style={{boxShadow: 'inset 0 0 0 100vw rgba(0,0,0, .8)', backgroundImage: `url(${carImages[6]})`}}>
            <div className="container px-6 py-8 mx-auto">
                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    <div>
                        <Image src={'/images/Logo.png'} alt='logo' width={110} height={110} />
                        <div className="font-medium text-red-600 uppercase text-xl">
                            MAKE APPOINTMENT WITH US NOW!
                        </div>

                        <h1 className="block mt-5 text-sm font-medium text-gray-500 duration-700 dark:text-gray-300 hover:text-gray-400 dark:hover:text-gray-200 hover:underline">
                            {storeInfo.phone}
                        </h1>
                        <h1 className="block mt-3 text-sm font-medium text-gray-500 duration-700 dark:text-gray-300 hover:text-gray-400 dark:hover:text-gray-200 hover:underline">
                            {storeInfo.fullLocation}
                        </h1>
                    </div>

                    <div>
                        <div className="text-2xl font-extrabold text-white uppercase">
                            Pages
                        </div>
                        {links.map(link => <Link key={link.url} href={link.url}><a className="block mt-5 text-sm font-medium text-gray-500 duration-700 dark:text-gray-300 hover:text-gray-400 dark:hover:text-gray-200 hover:underline">{link.name}</a></Link>)}
                    </div>

                    <div>
                        <div className="text-2xl font-extrabold text-white uppercase">
                            WORK HOURS 
                        </div>

                        <h1 className="block mt-5 text-sm font-medium text-gray-500 duration-700 dark:text-gray-300 hover:text-gray-400 dark:hover:text-gray-200 hover:underline">
                            7:30 AM - 5 PM , Monday - Friday
                        </h1>
                        <h1 className="block mt-5 text-sm font-medium text-gray-500 duration-700 dark:text-gray-300 hover:text-gray-400 dark:hover:text-gray-200 hover:underline">
                            Weekends - CLOSED
                        </h1>
                        <h1 className="block mt-3 text-sm font-medium text-gray-500 duration-700 dark:text-gray-300 hover:text-gray-400 dark:hover:text-gray-200 hover:underline">
                            Our Support team is available to answer your queries
                        </h1>
                        <button className='px-8 mt-6 w-fit py-4 bg-red-600 text-white font-bold uppercase'>Call Us Today</button>
                    </div>
                </div>

                <hr className="my-10 border-gray-200 dark:border-gray-700"/>

                <div className="sm:flex sm:items-center sm:justify-between">
                    <p className="text-sm text-gray-400">© Copyright {new Date().getFullYear()} {storeInfo.name}. All Rights Reserved.</p>

                    <div className="flex mt-3 -mx-2 sm:mt-0">

                        <h1 className="mx-2 text-gray-400 hover:text-gray-500 dark:hover:text-gray-300" aria-label="Facebook">
                            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M2.00195 12.002C2.00312 16.9214 5.58036 21.1101 10.439 21.881V14.892H7.90195V12.002H10.442V9.80204C10.3284 8.75958 10.6845 7.72064 11.4136 6.96698C12.1427 6.21332 13.1693 5.82306 14.215 5.90204C14.9655 5.91417 15.7141 5.98101 16.455 6.10205V8.56104H15.191C14.7558 8.50405 14.3183 8.64777 14.0017 8.95171C13.6851 9.25566 13.5237 9.68693 13.563 10.124V12.002H16.334L15.891 14.893H13.563V21.881C18.8174 21.0506 22.502 16.2518 21.9475 10.9611C21.3929 5.67041 16.7932 1.73997 11.4808 2.01722C6.16831 2.29447 2.0028 6.68235 2.00195 12.002Z">
                                </path>
                            </svg>
                        </h1>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Layout