'use client'

import React from 'react';
import Header from '../Header';
import ListCate from '../ListCate';
import Card from '../Card';


const MalePage: React.FC = () => {

    const buttonClass = 'px-4 py-2 mr-20 border-2 rounded-lg hover:bg-hover focus:bg-focus'

    return (
        <div className="malePolo px-10">
            <title>Quần áo Nam</title>
            <div className="header">
                <Header />
            </div>
            <div className="main mt-20">
                <ListCate gender='male'/>
                <div className="propose mt-10">
                    <h1 className='text-orange text-center text-2xl mb-8'>Đề xuất cho bạn</h1>
                    <div className="buttons flex justify-center">
                        <button className={buttonClass}>Bán chạy nhất</button>
                        <button className={buttonClass}>Hàng mới về</button>
                        <button className={buttonClass}>Áo</button>
                        <button className={buttonClass}>Quần</button>
                        <button className={buttonClass}>Đồ lót</button>
                    </div>
                </div>
                <div className="cardList mt-10 flex flex-wrap justify-center ">
                    <Card/>
                    <Card/>
                    <Card/>
                    <Card/>
                    <Card/>
                    <Card/>
                    <Card/>
                    <Card/>
                    <Card/>
                    <Card/>
                    <Card/>
                    <Card/>
                    <Card/>
                    <Card/>
                    <Card/>
                    <Card/>
                    <Card/>
                    <Card/>
                    <Card/>
                    <Card/>
                </div>
            </div>
        </div>
    )
}

export default MalePage