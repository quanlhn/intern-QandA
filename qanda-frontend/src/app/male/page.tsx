'use client'

import React from 'react';
import Header from '../Header';
import ListCate from '../ListCate';
import Card from '../Card';
import { useState, useEffect } from 'react'
import { Product } from '../CustomInterface';
import { BE_PRODUCT_PATH } from '../CustomInterface';


const MalePage: React.FC = () => {

    const buttonClass = 'px-4 py-2 mr-20 border-2 rounded-lg hover:bg-hover focus:bg-focus'

    const [products, setProducts] = useState<Array<Product>>()
    const [shownProducts, setShownProducts] = useState<Array<Product>>()
    
    useEffect(() => {
        fetch(BE_PRODUCT_PATH + '/findProductsByGender', {
            method: 'POST',
              mode: 'cors', 
              headers: {
                  'Content-Type': 'application/json'
                  
              },
              body: JSON.stringify({
                  s_gender: 'male',
              })
          })
          .then(res => res.json())
          .then (data => {
            setProducts(data.response); 
            setShownProducts(data.response)
        })
    },[])

    const sortBySold = () => {
        const t_products = products?.map(product => {
            if (product.sold) {
                return product
            } else {
                return {
                    ...product,
                    sold: 0
                }
            }
        })
        if (t_products) {t_products.sort((a, b) => {return b.sold - a.sold})}
        setShownProducts(t_products)
    }


    const sortByDate = () => {
        const t_products = products?.sort((a, b) => new Date(b.createdAt).valueOf() - new Date(a.createdAt).valueOf())
        setShownProducts(t_products)
    }

    const filterByType = (e: any) => {
        const t_products = products?.filter(product => product.category === e)
        setShownProducts(t_products)
    }

    return (
        <div className="malePolo px-10">
            <title>Quần áo Nam</title>
            <div className="main mt-20">
                <ListCate gender='male'/>
                <div className="propose mt-10">
                    <h1 className='text-orange text-center text-2xl mb-8'>Đề xuất cho bạn</h1>
                    <div className="buttons flex justify-center">
                        <button onClick={sortBySold} className={buttonClass}>Bán chạy nhất</button>
                        <button onClick={sortByDate} className={buttonClass}>Hàng mới về</button>
                        <button onClick={() => filterByType('ao')} className={buttonClass}>Áo</button>
                        <button onClick={() => filterByType('quan')} className={buttonClass}>Quần</button>
                        <button onClick={() => filterByType('do-lot')} className={buttonClass}>Đồ lót</button>
                    </div>
                </div>
                <div className="cardList mt-10 flex flex-wrap justify-center ">
                    {shownProducts?.map(product => {
                        return <Card key={product._id} product={product} />
                    })}
                </div>
            </div>
        </div>
    )
}

export default MalePage