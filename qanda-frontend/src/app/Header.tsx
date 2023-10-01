'use client'

import { MailOutlined, PhoneOutlined, SearchOutlined } from '@ant-design/icons';
import React, { useContext, useEffect, useState } from 'react';
import './style.css'
import Link from 'next/link';
import UserContext from './UserContext';
import { useRouter } from 'next/navigation';
import { AiOutlineShoppingCart } from "react-icons/ai" 
import { Tooltip } from 'antd'

const Header: React.FC = () => {
    const router = useRouter()
    const userContext = useContext(UserContext)
    const defaultUser = {
        id: '',
        name: '',
        phoneNumber: '',
        email: '',
        role: '',
        gender: '',
        birth: new Date(),
        isLoggedIn: false,
        cartDrawer: [],
        orders: []
    }
    const [userStorage, setUserStorage] = useState(defaultUser)
    if (typeof window !== 'undefined') {
        useEffect(() => {
            if (typeof (Storage) !== undefined && localStorage.user) {
                setUserStorage(() => JSON.parse(localStorage.user)   )
                if (!userContext.user.isLoggedIn) {
                    userContext.setUser(JSON.parse(localStorage.user))
                }
            }
            // if (userStorage.isLoggedIn && !userContext.user.isLoggedIn) {
            //     userContext.setUser(userStorage)
            // }
            // console.log(userStorage.isLoggedIn)
        }, [localStorage['user']])
    }

    const handleMouseOverTag = () => {
        document.getElementById('wall')?.classList.remove('hidden')
    }
    const handleMouseOutTag = () => {
        document.getElementById('wall')?.classList.add('hidden')
    }  

    const logOut = () => {
        localStorage.removeItem('user')
        setUserStorage(defaultUser)
        userContext.setUser(defaultUser)
    }

    // const AccountTooltip = () => <ul className='dropdowns-category absolute text-sm bg-white px-2 py-2'>
    //                                 <li>Tài khoản của tôi</li>
    //                                 {/* <li onClick={logOut} className='cursor-pointer'>Đăng xuất</li> */}
    //                             </ul> 


    // console.log(user.cartDrawer.length)

    return (
            <div className='z-20 fixed top-0 left-0 right-0 header px-10 text-textcolor font-roboto h-20 drop-shadow-lg'>
                <div className='header1 py-0.5 flex justify-between'>
                    <div className='contact flex text-base'>
                        <span className='phone flex items-center mr-12'> <PhoneOutlined className='pr-4'/> 0396865583</span>
                        <span className='mail flex items-center'> <MailOutlined className='pr-4'/> quanlhn@gmail.com</span>
                    </div>
                    {userContext.user.isLoggedIn 
                    ? 
                        <div className='text-xl mr-10 flex items-center'>
                            <div className='relative'>
                                <Link href={{pathname: "/cart"}}>
                                    <div className='absolute right-[-1px] top-0 text-sm bg-white text-red1 p-[0.1rem] rounded-full leading-none'>
                                        {userContext.user.cartDrawer?.length}
                                    </div>
                                    <AiOutlineShoppingCart className='text-red1 bold text-3xl leading-none hover:cursor-pointer'/>
                                </Link>
                            </div>
                            <div className='pl-5 relative nameTag-dropdown'>
                                    Hello, {userStorage.name}
                                <ul className='dropdowns-category absolute right-0 text-sm bg-white px-2 py-2'>
                                    {userContext.user.role == 'admin' || userContext.user.role == 'staff' ? 
                                    <Link href={{pathname: "/management"}}><li>Quản lý</li></Link>
                                    :
                                    <li>Tài khoản của tôi</li>

                                    }
                                    <li onClick={logOut} className='cursor-pointer'>Đăng xuất</li>
                                </ul>
                            </div>
                        </div>
                    :
                        <div className='login-register '>  
                            <Link href='/login-signup'>
                                <span className='text-xs'>ĐĂNG NHẬP</span>/
                                <span className='text-xs'>ĐĂNG KÝ</span>
                            </Link>                  
                        </div>
                    }
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
                                <ul className='dropdowns-category pt-4 absolute bg-white z-20 w-[40%] right-16 rounded-sm'>
                                    <div className="ao float-left mx-16 my-4">
                                        <li className='mb-3'><Link className='font-bold text-lg ' href={{pathname: "/male/ao"}}>Áo Nam</Link></li>
                                        <li className='mb-1'><Link href={{pathname: "/male/ao-polo"}}>Áo Polo</Link></li>
                                        <li className='mb-1'><Link href={{pathname: "/male/ao-thun"}}>Áo thun</Link></li>
                                        <li className='mb-1'><Link href={{pathname: "/male/ao-somi"}}>Áo sơ mi</Link></li>
                                        <li className='mb-1'><Link href={{pathname: "/male/ao-khoac"}}>Áo Khoác</Link></li>
                                        
                                    </div>
                                    <div className="quan float-left mx-16 my-4">
                                        <li className='mb-3'><Link className='font-bold text-lg ' href={{pathname: "/male/quan"}}>Quần nam</Link></li>
                                        <li className='mb-1'><Link href={{pathname: "/male/quan-dui"}}>Quần đùi</Link></li>
                                        <li className='mb-1'><Link href={{pathname: "/male/quan-kaki"}}>Quần kaki</Link></li>
                                        <li className='mb-1'><Link href={{pathname: "/male/quan-bo"}}>Quần bò</Link></li>
                                        <li className='mb-1'><Link href={{pathname: "/male/quan-au"}}>Quần âu</Link></li>
                                        
                                    </div>
                                    <div className="phu-kien mx-16 my-4">
                                        <li className='mb-3'><Link className='font-bold text-lg ' href={{pathname: "/male/do-bo"}}>Đồ bộ</Link></li>
                                        <li className='mb-3'><Link className='font-bold text-lg ' href={{pathname: "/male/do-lot"}}>Đồ lót</Link></li>
                                        <li className='mb-3'><Link className='font-bold text-lg ' href={{pathname: "/male/phu-kien"}}>Phụ kiện</Link></li>
                                        
                                    </div>
                                </ul>
                            </li>
                            <li className='nameTag-dropdown inline-block ml-16' onMouseOver={handleMouseOverTag} onMouseOut={handleMouseOutTag}>
                                <Link className='text-xl' href={{pathname: "/female"}}>NỮ</Link>
                                <ul className='dropdowns-category pt-4 absolute bg-white z-20 w-1/2 right-16 rounded-sm'>
                                    <div className="ao float-left mx-16 my-4">
                                        <li className='mb-3'><Link className='font-bold text-lg ' href={{pathname: "/female/ao"}}>Áo nữ</Link></li>                                        
                                        <li className='mb-1'><Link href={{pathname: "/female/ao-polo"}}>Áo Polo</Link></li>
                                        <li className='mb-1'><Link href={{pathname: "/female/ao-somi"}}>Áo sơ mi</Link></li>
                                        <li className='mb-1'><Link href={{pathname: "/female/ao-ao-thun"}}>Áo thun</Link></li>
                                        <li className='mb-1'><Link href={{pathname: "/female/ao-khoac"}}>Áo khoác</Link></li>
                                    </div>
                                    <div className="quan float-left mx-16 my-4">
                                        <li className='mb-3'><Link className='font-bold text-lg ' href={{pathname: "/female/quan"}}>Quần nữ</Link></li>                                        
                                        <li className='mb-1'><Link href={{pathname: "/female/quan-kaki"}}>Quần kaki</Link></li>
                                        <li className='mb-1'><Link href={{pathname: "/female/quan-bo"}}>Quần bò</Link></li>
                                        <li className='mb-1'><Link href={{pathname: "/female/quan-au"}}>Quần âu</Link></li>
                                        <li className='mb-1'><Link href={{pathname: "/female/quan-dui"}}>Quần đùi</Link></li>
                                        
                                    </div>
                                    <div className="vay mx-16 my-4 float-left">
                                        <li className='mb-3'><Link className='font-bold text-lg ' href={{pathname: "/female/vay"}}>Váy</Link></li>                                        
                                        <li className='mb-1'><Link href={{pathname: "/female/vay-dam"}}>Váy đầm</Link></li>
                                        <li className='mb-1'><Link href={{pathname: "/female/chan-vay"}}>Chân váy</Link></li>
                                    </div>
                                    <div className="phu-kien mx-16 my-4">
                                        <li className='mb-3'><Link className='font-bold text-lg ' href={{pathname: "/female/do-lot"}}>Đồ lót</Link></li>
                                        <li className='mb-3'><Link className='font-bold text-lg ' href={{pathname: "/female/-phu-kien"}}>Phụ kiện</Link></li>
                                        
                                    </div>
                                </ul>
                            </li>
                            <li className='nameTag-dropdown inline-block ml-16' onMouseOver={handleMouseOverTag} onMouseOut={handleMouseOutTag}>
                                <Link className='text-xl' href={{pathname: "/child"}}>TRẺ EM</Link>
                                <ul className='dropdowns-category pt-4 absolute bg-white z-20 w-1/2 right-16'>
                                    <div className="ao mx-16 my-4 float-left">
                                        <li className='mb-3'><Link className='font-bold text-lg ' href={{pathname: "/child/ao"}}>Áo trẻ em</Link></li>
                                        <li className='mb-1'><Link href={{pathname: "/child/ao-polo"}}>Áo Polo</Link></li>
                                        <li className='mb-1'><Link href={{pathname: "/child/ao-thun"}}>Áo thun</Link></li>
                                        <li className='mb-1'><Link href={{pathname: "/child/ao-khoac"}}>Áo khoác</Link></li>
                                    </div>
                                    <div className="phu-kien mx-16 my-4 float-left">
                                        <li className='mb-3'><Link className='font-bold text-lg ' href={{pathname: "/child/quan"}}>Quần trẻ em</Link></li>
                                        <li className='mb-1'><Link href={{pathname: "/child/quan-dui"}}>Quần đùi</Link></li>
                                        <li className='mb-1'><Link href={{pathname: "/child/quan-dai"}}>Quần dài</Link></li>
                                    </div>
                                    <div className="vay mx-16 my-4">
                                        <li className='mb-3'><Link className='font-bold text-lg ' href={{pathname: "/child/vay"}}>Váy</Link></li>
                                        <li className='mb-1'><Link href={{pathname: "/child/chan-vay"}}>Chân váy</Link></li>
                                        <li className='mb-1'><Link href={{pathname: "/child/chan-vay"}}>Chân váy</Link></li>
                                        <li className='my-3'><Link className='font-bold text-lg ' href={{pathname: "/child/do-bo"}}>Đồ bộ</Link></li>
                                    </div>
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