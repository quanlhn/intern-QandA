'use client'

import React from 'react';
import Header from '../../Header';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState, useMemo } from 'react';
import Card from '@component/app/Card';
import { Product } from '@component/app/CustomInterface';
import { useRouter } from 'next/navigation';
import { convertType, BE_PATH } from '@component/app/CustomInterface';


const FemaleType: React.FC = () => {

    const [fetchData, setFetchData] = useState<Array<Product>>()
    const router = useRouter()

    // const [s_gender, setGender] = useState('')
    const [product_gender, setGender] = useState('')
    const [product_type, setType] = useState('')
    const [sortDir, setSortDir] = useState('')
    const [sizesFilter, setSizesFilter] = useState<Array<string>>([])
    const [colorsFilter, setColorsFilter] = useState<Array<string>>([])

    const categoryList = ['ao', 'quan', 'do-bo', 'phu-kien', 'do-lot']
    const [shownProducts, setShownProducts] = useState<Array<Product>>()
    const [poster, setPoster] = useState([{
        name: '',
        description: '',
        picture: '',
        gender: '',
        type: ''
    }])

    // var sizesSort = new Array

    useEffect(() => {

        const path = window.location.pathname.split('/') 
        const s_gender = path[1]
        const s_type = path[2]
        document.getElementById('initFocus')?.classList.add('selectedButton')
        setGender(path[1])
        setType(path[2])

        if (categoryList.includes(path[2])) {
            // console.log('hihi')
            fetch('http://localhost:8080/api/product/findProductsByGenderType', {
                method: 'POST',
                mode: 'cors', 
                headers: {
                    'Content-Type': 'application/json'
                    
                },
                body: JSON.stringify({
                    s_gender,
                    s_category: s_type
                })
            }) 
            .then(res => res.json())
            .then (data => {
                setFetchData(data.response); 
                setShownProducts(data.response)
            })
        } else {
            fetch('http://localhost:8080/api/product/findProductsByGenderType', {
                method: 'POST',
                mode: 'cors', 
                headers: {
                    'Content-Type': 'application/json'
                    
                },
                body: JSON.stringify({
                    s_gender,
                    s_type
                })
            }) 
            .then(res => res.json())
            .then (data => {
                setFetchData(data.response); 
                setShownProducts(data.response)
            })
            fetch('http://localhost:8080/api/typeposter/findByGenderAndType', {
                method: 'POST',
                mode: 'cors', 
                headers: {
                    'Content-Type': 'application/json'
                    
                },
                body: JSON.stringify({
                    s_gender,
                    s_type
                })
            })
            .then(res => res.json())
            .then (data => {
                console.log(data.response)
                setPoster(data.response); 
            })
        }
    }, [])

    // useEffect(() => {
    //     console.log(sizesSort)
    // }, [sizesSort.length])

    const getSizeSortedProducts = () => {
        setShownProducts(() => {
            var t_products = new Array
            fetchData?.forEach((product) => {
                var result = true
                // console.log(sizesSort)
                sizesFilter.forEach(size => {
                    // console.log("name: " + product.name + ";    size: " + product.size)
                    // console.log(size)
                    if (!product.size.includes(size)) {
                        result = false
                    }
                })
                if (result) {
                    colorsFilter.forEach(color => {
                        var child_result = false
                        product.color_objects.forEach(color_object => {
                            if (color_object.color.includes(color)) {
                                child_result = true
                            }
                        })
                        if (!child_result) result = false
                    })
                }

                if (result) t_products.push(product)
            })
            // console.log('end here')
            return t_products
        })
        
    }

    const sortProduct = useMemo(() => {
        console.log(sortDir)
        setShownProducts(() => {
            switch (sortDir) {
                case 'ascPrice': {
                    shownProducts?.sort((a, b) => {
                        return  a.salePrice - b.salePrice
                    })
                    break
                }
                case 'descPrice': {
                    shownProducts?.sort((a, b) => {
                        return  b.salePrice - a.salePrice
                    })
                    break
                } 
                case 'lastest' : {
                    shownProducts?.sort((a, b) => {
                        return  new Date(b.createdAt).valueOf() - new Date(a.createdAt).valueOf()
                    })
                    break
                }
            }
            return shownProducts
        })
    }, [sortDir])

    const handleSizeFilter = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        const target = e.currentTarget
        if (target.classList.contains('selectedFilter')) {
            setSizesFilter(() => {
                sizesFilter.splice(sizesFilter.indexOf(target.innerHTML), 1)
                return sizesFilter
            }) 
            target.classList.remove('selectedFilter')
        } else {
            setSizesFilter(() => {sizesFilter.push(target.innerHTML); return sizesFilter}) 
            target.classList.add('selectedFilter')
        }
        getSizeSortedProducts()
    }
    const handleColorFilter = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        const target = e.currentTarget
        if (target.classList.contains('selectedFilter')) {
            setColorsFilter(() => {
                colorsFilter.splice(colorsFilter.indexOf(target.innerHTML), 1)
                return colorsFilter
            }) 
            target.classList.remove('selectedFilter')
        } else {
            setColorsFilter(() => {colorsFilter.push(target.innerHTML); return colorsFilter}) 
            target.classList.add('selectedFilter')
        }
        getSizeSortedProducts()
    }

    // const changeGender = (e: any) => {
    //     switch (e.target.innerHTML) {
    //         case 'Nữ' :  
    //     }
    // }

    return (
        <div className="malePolo mx-10">
            <div className="main mt-28 ">
                {categoryList.includes(product_type) ? null : 
                    <div className="poster flex justify-center items-center">
                        <img src={BE_PATH + `${poster[0].picture}`} className='w-2/3 h-72'/>
                        <div className="discription w-1/6 ml-10 font-roboto">
                            <h1 className='text-2xl mb-5 '>{poster[0].name}</h1>
                            <p>{poster[0].description}</p>
                        </div>
                    </div>
                }

                <div className="pageName flex flex-col items-center">
                    <div className="path">
                        <Link href={'/'}>Trang chủ</Link>/
                        <Link href={'/female'}>Nữ</Link>
                    </div>
                    <h1 className='typeTitle'>{convertType(product_type)} Nữ</h1>
                    <div className="selectType">
                        <button onClick={() => router.push(`/male/${product_type}`)}className='changeTypeButton' >Nam</button>
                        <button id='initFocus' className='changeTypeButton'>Nữ</button>
                        <button onClick={() => router.push(`/child/${product_type}`)} className='changeTypeButton'>Trẻ em</button>
                    </div>
                </div>

                <div className="listProducts flex mt-14">
                    <div className="filter w-1/6 flex flex-col">
                        <div className="typeProduct mt-10">
                            {/* <h3>Loại sản phẩm</h3>
                            <button onClick={(e) => handleFilter(e)} className='filterButton'>Áo polo công sở</button>
                            <button onClick={(e) => handleFilter(e)} className='filterButton'>Áo polo thể thao</button> */}
                        </div>
                        <div className="size mt-10">
                            <h3>Kích thước</h3>
                            <button onClick={(e) => handleSizeFilter(e)} className='filterButton'>X</button>
                            <button onClick={(e) => handleSizeFilter(e)} className='filterButton'>S</button>
                            <button onClick={(e) => handleSizeFilter(e)} className='filterButton'>M</button>
                            <button onClick={(e) => handleSizeFilter(e)} className='filterButton'>L</button>
                            <button onClick={(e) => handleSizeFilter(e)} className='filterButton'>XL</button>
                            <button onClick={(e) => handleSizeFilter(e)} className='filterButton'>2XL</button>
                        </div>
                        <div className="price mt-10">
                            <h3>Khoảng giá</h3>
                        </div>
                        <div className="color mt-10">
                            <h3>Màu sắc</h3>
                            <button onClick={(e) => handleColorFilter(e)} className='filterButton'>Đen</button>
                            <button onClick={(e) => handleColorFilter(e)} className='filterButton'>Trắng</button>
                            <button onClick={(e) => handleColorFilter(e)} className='filterButton'>Xanh</button>
                            <button onClick={(e) => handleColorFilter(e)} className='filterButton'>Be</button>
                            <button onClick={(e) => handleColorFilter(e)} className='filterButton'>Đô</button>
                            <button onClick={(e) => handleColorFilter(e)} className='filterButton'>Xám</button>
                            <button onClick={(e) => handleColorFilter(e)} className='filterButton'>Nâu</button>
                            <button onClick={(e) => handleColorFilter(e)} className='filterButton'>Hồng</button>
                            <button onClick={(e) => handleColorFilter(e)} className='filterButton'>Vàng</button>
                            <button onClick={(e) => handleColorFilter(e)} className='filterButton'>Đỏ</button>
                        </div>
                    </div>
                    <div className="products w-5/6 grid grid-cols-4">
                        <div className="option col-span-4 flex justify-between content-center ">
                            <p className='ml-9'>{shownProducts?.length} sản phẩm</p>
                            <div className="sort mr-9 flex justify-center ">
                                <div className='mr-5'>Sắp xếp theo</div>
                                <select className='border h-6' onChange={(e) => setSortDir(e.target.value)}>
                                    <option value={'latest'}>Mới nhất</option>
                                    <option value={'ascPrice'}>Giá tăng dần</option>
                                    <option value={'descPrice'}>Giá giảm dần</option>
                                </select>
                            </div>
                        </div>
                        {shownProducts == undefined 
                            ? 
                            <div>loading...</div>
                            :
                            shownProducts.map(product => {
                            return (
                                <div key={product._id} className='mt-10'>
                                    <Card  product={product} />
                                </div>
                            )
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FemaleType