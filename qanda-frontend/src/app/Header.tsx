'use client'

import { MailOutlined, PhoneOutlined, SearchOutlined } from '@ant-design/icons';
import React from 'react';
import './style.css'
import Link from 'next/link';

import { useRouter } from 'next/navigation';
// import { Calistoga } from 'next/font/google';


// const calistoga = Calistoga({
//     subsets: ['latin'],
//     weight: '400'
// })


const Header: React.FC = () => {
    const router = useRouter()

    const handleMouseOverTag = () => {
        document.getElementById('wall')?.classList.remove('hidden')
    }
    const handleMouseOutTag = () => {
        document.getElementById('wall')?.classList.add('hidden')
    }

    return (
            <div className='z-20 fixed top-0 left-0 right-0 header px-10 bg-gradient-to-r from-headerbg to-white text-textcolor font-roboto h-20'>
                <div className='header1 py-0.5 flex justify-between'>
                    <div className='contact flex text-base'>
                        <span className='phone flex items-center mr-12'> <PhoneOutlined className='pr-4'/> 0396865583</span>
                        <span className='mail flex items-center'> <MailOutlined className='pr-4'/> quanlhn@gmail.com</span>
                    </div>
                    <div className='login-register '>                    
                        <a href='0' className='text-xs'>ĐĂNG NHẬP</a>/
                        <a href='1' className='text-xs'>ĐĂNG KÝ</a>                    
                    </div>
                </div>
                <div className="navbar py-1 flex items-center justify-between w-full">
                    <div className="flex items-center w-1/3 ">
                        <h1 className='text-4xl font-sans' ><Link href={'/'}>Q&A</Link></h1>
                        <form className='search ml-12 py-0.5 flex items-center bg-searchbg w-80'>
                            <input placeholder='Tìm kiếm' className='bg-searchbg px-2 w-72'/>
                            <button type='submit' className='h-full px-1 bg-orange-300'><SearchOutlined className='text-lg '/></button>
                        </form>
                    </div>
                    <div className="tags flex justify-end w-full ">
                        <ul className='mr-20'>
                            <li className='nameTag-dropdown inline-block ml-16' onMouseOver={handleMouseOverTag} onMouseOut={handleMouseOutTag}>
                                <Link className='text-xl' href={{pathname: "/male"}}>NAM</Link>
                                <ul className='dropdowns-category pt-4 absolute bg-white z-20 w-1/2 right-16'>
                                    <li><Link href={{pathname: "/male/polo"}}>Áo Polo</Link></li>
                                    <li><Link href={{pathname: "/male/somi"}}>Sơ mi</Link></li>
                                    <li><Link href={{pathname: "/male/quankaki"}}>Quần kaki</Link></li>
                                </ul>
                            </li>
                            <li className='nameTag-dropdown inline-block ml-16' onMouseOver={handleMouseOverTag} onMouseOut={handleMouseOutTag}>
                                <Link className='text-xl' href={{pathname: "/male"}}>NỮ</Link>
                                <ul className='dropdowns-category pt-4 absolute bg-white z-20 w-1/2 right-16'>
                                    <li><Link href={{pathname: "/male/polo"}}>Áo Polo</Link></li>
                                    <li><Link href={{pathname: "/male/somi"}}>Sơ mi</Link></li>
                                    <li><Link href={{pathname: "/male/quankaki"}}>Quần kaki</Link></li>
                                </ul>
                            </li>
                            <li className='nameTag-dropdown inline-block ml-16' onMouseOver={handleMouseOverTag} onMouseOut={handleMouseOutTag}>
                                <Link className='text-xl' href={{pathname: "/male"}}>TRẺ EM</Link>
                                <ul className='dropdowns-category pt-4 absolute bg-white z-20 w-1/2 right-16'>
                                    <li><Link href={{pathname: "/male/polo"}}>Áo Polo</Link></li>
                                    <li><Link href={{pathname: "/male/somi"}}>Sơ mi</Link></li>
                                    <li><Link href={{pathname: "/male/quankaki"}}>Quần kaki</Link></li>
                                </ul>
                            </li>
                        </ul>
                        {/* <span className='ml-10'><Link className='text-xl' href={{pathname: "/male"}}>NAM</Link></span>
                        <span className='ml-10'><Link className='text-xl' href={{pathname: "/female"}}>NỮ</Link></span>
                        <span className='ml-10'><Link className='text-xl' href={{pathname: "/child"}}>TRẺ EM</Link></span>
                        <span className='ml-10'><Link className='text-xl' href={{pathname: "/latest"}}>MỚI NHẤT</Link></span> */}
                    </div>
                </div>
                <div id='wall' className="bg-grey1/70 w-screen absolute left-0 h-screen hidden"></div>
            </div>
    )
}

export default Header