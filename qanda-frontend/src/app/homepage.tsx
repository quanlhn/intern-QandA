'use client'

import React from "react";
import { useState, useEffect } from "react";
import SwiperCore, { EffectCoverflow, Pagination, Scrollbar, A11y, Navigation, Autoplay } from "swiper";
// import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import "swiper/swiper-bundle.min.css";
import "swiper/swiper.min.css";
import ClothType from "./ClothType";
import Card from "./Card";
import Header from "./Header";
import { Product, Suggestion, BE_SUGGEST_PATH, BE_PATH, BE_PRODUCT_PATH } from "./CustomInterface";

import event1 from './../../public/event1.png';
import event2 from './../../public/event2.jpg';
import event3 from './../../public/event3.jpg';
import event4 from './../../public/event4.jpg';
import categoryJSON from './../../public/category.json'
import { stringify } from "querystring";

SwiperCore.use([Navigation, Pagination, A11y, Autoplay]);

const Homepage: React.FC = () => {    
  const [fetchData, setFetchData] = useState<Array<Product>>()
  const [suggestions, setSuggestions] = useState<Array<Suggestion>>()

  useEffect(() => {

    fetch('http://localhost:8080/api/suggestions')
      .then(res => res.json())
      .then(data => {setSuggestions(data.response)})

    fetch('http://localhost:8080/api/product') 
      .then(res => res.json())
      .then(data => {setFetchData(data.response)})
  }, [])


  const [categoryChosen, chooseCategory] = useState("male")
  const [categoryList, setCategoryList] = useState([])

  const handleCategoryChange = () => {
    var tagsShown: { id: string; name: string; gender: string[]; filename: string; }[] = []
    // tagsShown = category.filter((e) => {
    //   e.gender.includes(categoryChosen)
    // })
    categoryJSON.category.forEach((e) => {
      if(e.gender.includes(categoryChosen)) tagsShown.push(e)
    })    
    return tagsShown
  }  

  // const getImageUrl = () => {
  //   console.log(response[1]['pics[0]'])
  //   return stringify(response[1]['pics[0]'])
  // }

  return (
      <div className='homepage px-10 relative'>
        <div className="main mt-20">
          <Swiper
              spaceBetween={50}
              slidesPerView={1}
              navigation = {{
                  nextEl: ".swiper-button-next",
                  prevEl: ".swiper-button-prev"
                }}
              pagination={{ clickable: true }}
              onSwiper={(swiper) => console.log(swiper)}
              autoplay={{delay:3000}}
              loop={true}
            >
              <SwiperSlide><img src={event1.src} alt="" className="w-full" /></SwiperSlide>
              <SwiperSlide><img src={event2.src} alt="" className="w-full" /></SwiperSlide>
              <SwiperSlide><img src={event3.src} alt="" className="w-full" /></SwiperSlide>
              <SwiperSlide><img src={event4.src} alt="" className="w-full" /></SwiperSlide>
              <span className="swiper-button-prev"></span>
              <span className="swiper-button-next"></span>
          </Swiper>

          <div className="categoryList py-5">
            <ul className="tag flex justify-center">
              <li className="px-16 mx-4 border-b-2 border-grey1 " >
                <button className="text-grey1 text-lg opacity-30 hover:text-headerbg hover:opacity-60 focus:opacity-100 focus:text-textcolor" onFocus={() => chooseCategory("male")}>NAM</button>
              </li>
              <li className="px-16 mx-4 border-b-2 border-grey1" >
                <button className="text-grey1 text-lg opacity-30 hover:text-headerbg hover:opacity-60 focus:opacity-100 focus:text-textcolor" onFocus={() => chooseCategory("female")}>NỮ</button>
              </li>
              <li className="px-16 mx-4 border-b-2 border-grey1" >
                <button className="text-grey1 text-lg opacity-30 hover:text-headerbg hover:opacity-60 focus:opacity-100 focus:text-textcolor" onFocus={() => chooseCategory("child")}>TRẺ EM</button>
              </li>
            </ul>
          <div className="mt-8">
              <Swiper
                spaceBetween={20}
                slidesPerView={6}
                navigation = {{
                    nextEl: ".swiper-button-next",
                    prevEl: ".swiper-button-prev"
                  }}
                onSwiper={(swiper) => console.log(swiper)}
                loop={true}        
              >
                {
                  handleCategoryChange().map((e, i) => {
                    return (
                      <SwiperSlide key={i} className="px-16">
                          <ClothType gender={categoryChosen} url={e.filename} name={e.name} key={e.id} flexDirec="col" />
                      </SwiperSlide>
                    )
                  })
                }                    
                <button className="swiper-button-prev"></button>
                <button className="swiper-button-next"></button>
              </Swiper>
            </div>
          </div>
          <br/>
          {suggestions ?
            suggestions.map((suggestion, index) => {
              return (
                <div><SuggestProducts key={index} products={fetchData} suggestion={suggestion}/></div> 
              )
            })
          :
            <div></div>         
          }
        </div>

      </div>
  )
}

type Props = {
  products: Array<Product> | undefined
  suggestion: Suggestion 
}

const SuggestProducts: React.FC<Props> = ({suggestion}) => {

  const [products, setProducts] = useState<Array<Product>>()

  useEffect(() => {
    if (suggestion.getDataBy = 'sort') {
      fetch (BE_PRODUCT_PATH + '/findProductsAndSort', {
        method: 'POST',
        mode: 'cors', 
        headers: {
            'Content-Type': 'application/json'
            
        },
        body: JSON.stringify({
          sort_name: suggestion.sortBy
        })
      })
        .then(res => res.json())
        .then (data => setProducts(data.response))
    } else if (suggestion.getDataBy = 'filter') {
      if(suggestion.sortBy =='type') {
        fetch(BE_PRODUCT_PATH + '/findProductsByType', {
          method: 'POST',
            mode: 'cors', 
            headers: {
                'Content-Type': 'application/json'
                
            },
            body: JSON.stringify({
                s_type: suggestion.filterBy
            })
        })
        .then(res => res.json())
        .then (data => setProducts(data.response))
      }
    }
  },[])

  // console.log('props: ')
  // console.log(products == undefined ? 'khum co products' : products[1])
  return (
    <div className="suggestProducts w-full mb-10">
      <h2 className="mb-6 text-lg">{suggestion.title}</h2>
      <div className="products w-full h-96 flex">
        <div className="discription h-full relative w-[16%] ">
          <img className="h-full w-full" src={BE_PATH + suggestion.thumbnail} />
          <h1 className="text-discrip absolute w-full text-center bottom-1/3 text-white text-2xl font-roboto">
            {suggestion.name} <br/> <div className="text-lg">{suggestion.description}</div>
          </h1>
        </div>
            {/* <Card />
            <Card />
            <Card />
            <Card /> */}
        <Swiper
              spaceBetween={10}
              slidesPerView={5}
              navigation = {{
                  nextEl: ".swiper-button-next",
                  prevEl: ".swiper-button-prev"
                }}
              autoplay={{delay:5000}}
              loop={true}
              allowTouchMove = {false}
              className="w-[84%] "
              // centeredSlides={true}
              // centeredSlidesBounds = {true}
            >
              {/* <SwiperSlide><Card product={props.fetchData[0]} /></SwiperSlide>
              <SwiperSlide><Card product={props.fetchData[0]} /></SwiperSlide>
              <SwiperSlide><Card product={props.fetchData[0]} /></SwiperSlide>
              <SwiperSlide><Card product={props.fetchData[0]} /></SwiperSlide>
              <SwiperSlide><Card product={props.fetchData[0]} /></SwiperSlide> */}

              {products == undefined 
                ? 
                  <div>loading...</div>
                :
                products.map((product, index) => {
                  return (
                    <SwiperSlide key={product._id}>
                      <Card product={product} />
                    </SwiperSlide>
                  )
                })
              }
              <span className="swiper-button-prev"></span>
              <span className="swiper-button-next"></span>
        </Swiper>
      
      </div>
    </div>
  )
}



export default Homepage