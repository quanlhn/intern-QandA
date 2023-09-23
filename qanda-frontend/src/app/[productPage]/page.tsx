'use client'

import React from "react";
import Header from "../Header";
import Link from "next/link";
import { StarFilled } from "@ant-design/icons";
import { useState, useRef, useEffect, useContext } from 'react'
import { Cart, Product, BE_API } from "../CustomInterface";
import { AiOutlineShoppingCart } from "react-icons/ai" 
import UserContext from "../UserContext";
import { useRouter } from 'next/navigation'


const ProductPage:React.FC = () => {
    const initChosen = useRef<HTMLButtonElement>(null)
    const feature = useRef<HTMLUListElement>(null)
    const [color, setColor] = useState<HTMLButtonElement>()
    const [size, setSize] = useState<HTMLButtonElement>()
    const [amount, setAmount] = useState(1)
    const [productData, setproductData] = useState<Product>()
    const [mainPicture, setMainPicture ] = useState("")
    const userContext = useContext(UserContext)
    const [pictures, setPictures] = useState([{alt: '', url: ''}])
    const router = useRouter()

    const convertType = (type: string) => {
        switch (type) {
            case "male":
                return "Nam"
            case 'female':
                return 'Nữ'
            case 'child':
                return 'Trẻ em'
            case 'ao-polo':
                return 'Áo Polo'
            case 'ao-thun':
                return 'Áo thun'
            case 'ao-somi':
                return 'Áo sơ mi'
            case 'ao-khoac':
                return 'Áo khoác'
            case 'quan-dui':
                return 'Quần đùi'
            case 'quan-kaki':
                return 'Quần kaki'
            case 'quan-bo':
                return 'Quần bò'
            case 'quan-au': 
                return 'Quần âu'
            case 'do-bo': 
                return 'Đồ bộ'
            case 'do-lot': 
                return 'Đồ lót'
            case 'phu-kien': 
                return 'Phụ kiện'
            case 'vay-dam': 
                return 'Váy đầm'
            case 'chan-vay': 
                return 'Chân váy'
            case 'quan-dai': 
                return 'Quần dài'
            default: return ''        
        }
    }

    useEffect(() => {
        const t_pagePath = decodeURIComponent(window.location.pathname)
        const searchParam =  t_pagePath.slice(1, t_pagePath.length).replaceAll('-', ' ')
        fetch('http://localhost:8080/api/product/findProductByName', {
            method: 'POST',
            mode: 'cors', 
            headers: {
                'Content-Type': 'application/json'
                
            },
            body: JSON.stringify({
                searchParam
            })
        })
            .then(res => res.json())
            .then(data => {
                setproductData(data.response)
                const pics = []
                for (let i = 0; i < data.response.color_objects.length; i++) {
                    for (let j = 0; j < data.response.color_objects[i].picture.length; j++) {
                        pics.push({
                            alt: data.response.color_objects[i].color,
                            url: data.response.color_objects[i].picture[j]
                        })
                    }
                }
                setPictures(pics)
                setMainPicture('http://localhost:8080/' + data.response.color_objects[0].picture[0])
            })

    }, [])

    const mainImage = () => {

    }

    const handleChangeSize = (e: any) => {
        if(size) {
            size.classList.remove('bg-grey1')
            size.classList.add('bg-grey3/70')

        }

        e.target.classList.remove('bg-grey3/70')
        e.target.classList.add('bg-grey1')
        setSize(() => e.target)
    }

    const handleChangeColor = (e: any) => {
        if(color) {
            color.classList.remove('bg-grey1')
            color.classList.add('bg-grey3/70')

        }

        e.target.classList.remove('bg-grey3/70')
        e.target.classList.add('bg-grey1')
        const main_pic = pictures.find(el => el.alt == e.target.innerHTML)
        if (main_pic) {
            setMainPicture('http://localhost:8080/' + main_pic.url)
        } else {
            setMainPicture('http://localhost:8080/' + pictures[0].url)
        }
        setColor(() => e.target)
    }

    const handleChangeColorOver = (e: any) => {
        const main_pic = pictures.find(el => el.alt == e.target.innerHTML)
        if (main_pic) {
            setMainPicture('http://localhost:8080/' + main_pic.url)
        } else {
            setMainPicture('http://localhost:8080/' + pictures[0].url)
        }
    }
    const handleChangeColorOut = (e: any) => {
        const main_pic = pictures.find(el => el.alt == color?.innerHTML)
        if (main_pic) {
            setMainPicture('http://localhost:8080/' + main_pic.url)
        } else {
            setMainPicture('http://localhost:8080/' + pictures[0].url)
        }
    }

    const expandMinus = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        if (e.currentTarget.innerHTML === '-') {
            e.currentTarget.innerHTML = '+'
            feature.current?.classList.add('hidden')
            feature.current?.classList.remove('static')
        } else {
            e.currentTarget.innerHTML = '-'
            feature.current?.classList.remove('hidden')
            feature.current?.classList.add('static')
        }
    }

    const changeMainPic = (e: any) => {
        setMainPicture(e.target.src)
        e.target.parentNode.childNodes.forEach((_node: any) => {
            if (_node.classList.contains('opacity-100')) {
                _node.classList.remove('opacity-100');
                _node.classList.add('opacity-60');
            }
        });
        e.target.classList.remove('opacity-60');
        e.target.classList.add('opacity-100');
    }

    

    const [userStorage, setUserStorage] = useState({
        id: '',
        name: '',
        phoneNumber: '',
        email: '',
        isLoggedIn: false,
        cartDrawer: new Array<Cart>()
    })

    useEffect(() => {
        if (typeof (Storage) !== undefined && localStorage.user) {
            setUserStorage(() => JSON.parse(localStorage.user))
        }
    }, [])

    useEffect(() => {
        console.log(JSON.stringify(userContext.user.cartDrawer))   
        fetch(BE_API + 'updateCart', {
            method: 'POST',
            mode: 'cors', 
            headers: {
                'Content-Type': 'application/json'
                
            },
            body: JSON.stringify({
                userID: userContext.user.id,
                cartDrawer: userContext.user.cartDrawer
            })
        })
        
    },[userContext.user.cartDrawer])

    const addToCart = () => {
        if (userContext.user.isLoggedIn) {
            if (color && size) {
                if (userStorage.isLoggedIn) {
                    console.log('add to cart activated');
                    // userStorage.cartDrawer.push({id: productData?._id,
                    //     name: productData?.name,
                    //     price: productData?.ListedPrice,
                    //     color: color.innerHTML,
                    //     size: size.innerHTML,
                    //     amount: amount,})
                    const carts = {id: productData?._id,
                        name: productData?.name,
                        price: productData?.salePrice,
                        color: color.innerHTML,
                        size: size.innerHTML,
                        picture: mainPicture,
                        amount: amount
                    }
                    setUserStorage({
                        ...userStorage,
                        cartDrawer: [...userStorage.cartDrawer, carts]
                    })
                    userContext.setUser({
                        ...userContext.user,
                        cartDrawer: [...userContext.user.cartDrawer, carts]
                    })
                    if (typeof window !== 'undefined') {
                        localStorage.setItem('user', JSON.stringify({
                            ...userStorage,
                            cartDrawer: [...userStorage.cartDrawer, carts]
                        }))
                    }
                     
                }
            }
        } else {
            router.push('/login-signup')
        }
    }


    

    return (
        <div className="productPage px-10">
            <div className="main mt-28">
                <div className="path">
                    <Link className="mr-1" href={'/'}>Trang chủ</Link>/
                    <Link className="mr-1" href={productData ? `/${productData.gender}` : ''}>{productData ? convertType(productData.gender) : ''}</Link>/
                    <Link className="mr-1" href={productData ? `/${productData.gender}/${productData.type}` : ''}>{productData ? convertType(productData.type) : ''}</Link>
                </div>
                <div className="productInfo flex justify-between mt-6">
                    <div className="relative image w-[48%]">
                        <img className="w-full" src={mainPicture} />
                        <div className="mini-pics absolute left-4 top-4">
                            {pictures?.map(picture => {
                                return <img className="w-8 pb-4 opacity-60 cursor-pointer" onClick={(e) => changeMainPic(e)} src={'http://localhost:8080/' + picture.url}/>
                            })}
                        </div>
                    </div>
                    <div className="description w-[48%] font-roboto">
                        <h1 className="text-3xl mb-6">{productData?.name}</h1>
                        <span className="stars">
                            <StarFilled className="mr-1 text-info text-sm" />
                            <StarFilled className="mr-1 text-info text-sm" />
                            <StarFilled className="mr-1 text-info text-sm" />
                            <StarFilled className="mr-1 text-info text-sm" />
                        </span>
                        <div className="price mt-8">
                            <span className="salePrice text-2xl mr-12 text-textcolor">{productData?.salePrice.toLocaleString("de-DE")}đ</span>
                            <span className="ListedPrice text-2xl mr-12 text-grey2 line-through">{productData?.ListedPrice.toLocaleString("de-DE")}đ</span>
                            <span className="percentSale text-2xl mr-12 text-red1">-{productData?.percentSale}%</span>
                        </div>
                        <div className="color mt-6">
                            <div className="mb-4">Màu sắc:  <strong>{color ? color.innerHTML : ""}</strong></div>
                            {productData?.color_objects.map(colorObject => {
                                return <span>
                                            <button 
                                                onClick={(e) => handleChangeColor(e)} 
                                                onMouseOver={(e) => handleChangeColorOver(e)} 
                                                onMouseOut={(e) => handleChangeColorOut(e)} 
                                                className="w-fit px-3 py-1 bg-grey3/70 mr-8 mt-4 rounded-lg"
                                                >
                                                    {colorObject.color}
                                            </button>
                                        </span>
                            })}
                        </div>
                        <div className="size mt-6">
                            <div className="mb-4">Kích thước:  <strong>{size ? size.innerHTML : ""}</strong></div>
                            {productData?.size.map(size => {
                                return <span>                                    
                                            <button 
                                                onClick={(e) => handleChangeSize(e)} 
                                                className="w-fit px-3 py-1 bg-grey3/70 mr-8 mt-4 rounded-lg"
                                                >
                                                    {size}
                                            </button>
                                        </span>
                            })}
                        </div>
                        <div className="amount mt-10 border-2 w-max rounded-full h-10 flex items-center">
                            <span className="pl-4 pr-8"><button onClick={() => setAmount(() => {
                                    if (amount === 1) {
                                        return amount
                                    } else {
                                        return amount -1
                                    }
                                })} className="text-xl">-</button>
                            </span>
                            <span>{amount}</span>
                            <span className="pl-8 pr-4"><button onClick={() => setAmount(() => amount + 1)} className="text-xl">+</button></span>
                        </div>
                        <div className="addToCart">
                            <button className="px-4 py-2 border-2 rounded-md mt-10 flex items-center text-xl hover:bg-grey2/20 hover:ring-2 hover:ring-headerbg active:bg-grey2/75" 
                                    onClick={addToCart}>
                                <AiOutlineShoppingCart className='' /> 
                                <div className="ml-4">
                                    Thêm vào giỏ
                                </div>
                            </button>
                        </div>
                        <hr className="border-1 mt-10" />
                        <div className="feature">
                            <div className="fearture mt-6 flex justify-between">
                                <strong>Đặc điểm nổi bật</strong>
                                <button className="text-xl" onClick={(e) => expandMinus(e)}>-</button>
                            </div>
                            <ul ref={feature} className="list-disc ml-6 mt-4">
                                <li className="mb-3">Chất liệu: 100% cotton co dãn 2 chiều hoàn thiện bằng công nghệ cao</li>
                                <li className="mb-3">Chất liệu: 100% cotton co dãn 2 chiều hoàn thiện bằng công nghệ cao</li>
                                <li className="mb-3">Chất liệu: 100% cotton co dãn 2 chiều hoàn thiện bằng công nghệ cao</li>
                                <li className="mb-3">Chất liệu: 100% cotton co dãn 2 chiều hoàn thiện bằng công nghệ cao</li>
                                <li className="mb-3">Chất liệu: 100% cotton co dãn 2 chiều hoàn thiện bằng công nghệ cao</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <hr />

            </div>
        </div>
    )
}

export default ProductPage