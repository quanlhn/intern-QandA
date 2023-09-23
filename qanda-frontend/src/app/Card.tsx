import React from 'react';
import './style.css'
import {BrowserRouter, Route, Router, Routes } from 'react-router-dom';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Product } from './CustomInterface';
import { Tooltip } from 'antd'

type Props = {
    product: Product
}

const Card: React.FC<Props> = ({product}) => {
    
    const [mainPicture, setMainPicture ] = useState('http://localhost:8080/' +  product.color_objects[0].picture[0])
    const [pictures, setPictures] = useState(() => {
        const pics = []
        for (let i = 0; i < product.color_objects.length; i++) {
            for (let j = 0; j < product.color_objects[i].picture.length; j++) {
                pics.push({
                    alt: product.color_objects[i].color,
                    url: product.color_objects[i].picture[j]
                })
            }
        }
        return pics
    })

    return (
            <div className="card mx-3 h-96 w-52 font-roboto rounded-md">
                <div className="img-container h-[72%] overflow-hidden hover:cursor-pointer drop-shadow-md">
                    <Link href={'/' + product.name.replaceAll(' ', '-')}>
                        <img className="w-full h-full  inset-0 hover:scale-125 duration-700" src={mainPicture}/>
                    </Link>  
                    {product.sold ? <div className='absolute left-0 top-0 px-2 text-sm bg-grey1 text-white'>Đã bán {product.sold}</div> : null}              
                    
                </div>
                <div className="info mt-1">
                    <Tooltip placement='top' title={product.name} >
                        <div className="name w-full h-12  line-clamp-2">{product.name}</div>
                    </Tooltip>
                    <b className="price">{product.salePrice.toLocaleString("de-DE")}đ</b>
                    <div className="color flex flex-wrap ">
                    {pictures?.map((picture, index) => {
                        if (index < 5) 
                        return <img key={index} className="w-6 h-6 cursor-pointer rounded-lg mx-2 drop-shadow-lg" onClick={(e) => setMainPicture(e.currentTarget.src)} src={'http://localhost:8080/' + picture.url}/>
                    })}
                    </div>
                </div>
                
            </div>        

    )
}

export default Card