'use client'

import React from 'react';
import Header from '../../Header';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect } from 'react';
import Card from '@component/app/Card';


const MalePolo: React.FC = () => {

    useEffect(() => {
        document.getElementById('initFocus')?.classList.add('selectedButton')
    },[])

    const handleFilter = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        const target = e.currentTarget
        if (target.classList.contains('selectedFilter')) {
            target.classList.remove('selectedFilter')
        } else {
            target.classList.add('selectedFilter')
        }
    }

    return (
        <div className="malePolo mx-10">
            <Header/>
            <div className="main mt-28 ">
                <div className="poster flex justify-center items-center">
                    <img src={require('./poster.jpg').default.src} className='w-2/3 h-72'/>
                    <div className="discription w-1/6 ml-10 font-roboto">
                        <h1 className='text-2xl mb-5 '>Áo polo nam</h1>
                        <p>Những mẫu áo Polo giúp nam giới thoải mái lên đồ, tự tin mặc đẹp</p>
                    </div>
                </div>

                <div className="pageName flex flex-col items-center">
                    <div className="path">
                        <Link href={'/'}>Trang chủ</Link>/
                        <Link href={'/male'}>Nam</Link>
                    </div>
                    <h1 className='typeTitle'>ÁO POLO NAM</h1>
                    <div className="selectType">
                        <button id='initFocus' className='changeTypeButton'>Nam</button>
                        <button className='changeTypeButton'>Nữ</button>
                        <button className='changeTypeButton'>Trẻ em</button>
                    </div>
                </div>

                <div className="listProducts flex mt-14">
                    <div className="filter w-1/6 flex flex-col">
                        <div className="typeProduct mt-10">
                            <h3>Loại sản phẩm</h3>
                            <button onClick={(e) => handleFilter(e)} className='filterButton'>Áo polo công sở</button>
                            <button onClick={(e) => handleFilter(e)} className='filterButton'>Áo polo thể thao</button>
                        </div>
                        <div className="size mt-10">
                            <h3>Kích thước</h3>
                            <button onClick={(e) => handleFilter(e)} className='filterButton'>X</button>
                            <button onClick={(e) => handleFilter(e)} className='filterButton'>S</button>
                            <button onClick={(e) => handleFilter(e)} className='filterButton'>M</button>
                            <button onClick={(e) => handleFilter(e)} className='filterButton'>L</button>
                            <button onClick={(e) => handleFilter(e)} className='filterButton'>XL</button>
                        </div>
                        <div className="color mt-10">
                            <h3>Màu sắc</h3>
                            <button onClick={(e) => handleFilter(e)} className='filterButton'>Đen</button>
                            <button onClick={(e) => handleFilter(e)} className='filterButton'>Trắng</button>
                            <button onClick={(e) => handleFilter(e)} className='filterButton'>Xanh lá</button>
                        </div>
                        <div className="price mt-10">
                            <h3>Khoảng giá</h3>
                        </div>
                    </div>
                    <div className="products w-5/6 grid grid-cols-4">
                        <div className="option col-span-4 flex justify-between mb-5">
                            <p className='ml-9'>999 sản phẩm</p>
                            <div className="sort mr-9">
                                <p>Sắp xếp theo</p>
                            </div>
                        </div>
                        <Card/>
                        <Card/>
                        <Card/>
                        <Card/>
                        <Card/>
                        <Card/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MalePolo