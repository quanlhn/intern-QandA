'use client'

import React, { useEffect } from "react";
import { useState } from "react";
import SwiperCore, { EffectCoverflow, Pagination, Scrollbar, A11y, Navigation, Autoplay } from "swiper";
// import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css";
import "swiper/swiper.min.css";
import ClothType from "./ClothType";
import Card from "./Card";
import Header from "./Header";

import event1 from './../../public/event1.png';
import event2 from './../../public/event2.jpg';
import event3 from './../../public/event3.jpg';
import event4 from './../../public/event4.jpg';
import categoryJSON from './../../public/category.json'

SwiperCore.use([Navigation, Pagination, A11y, Autoplay]);

const Homepage: React.FC = () => {    


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

  return (
      <div className='homepage px-10 relative'>
        <Header/>

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
          <SuggestProducts/>
          <SuggestProducts/>
        </div>

      </div>
  )
}

const SuggestProducts: React.FC = () => {
  return (
    <div className="suggestProducts w-full mb-10">
      <h2 className="mb-6 text-lg">Hàng mới về</h2>
      <div className="products w-full h-96 flex">
        <div className="discription h-full relative w-[16%] ">
          <img className="h-full w-full" src={require('./../../public/lastest/sample.jpg').default.src} />
          <h1 className="text-discrip absolute w-full text-center bottom-1/3 text-white text-2xl font-roboto">
            Hàng mới về <br/> <div className="text-lg">Các mẫu mới nhất</div>
          </h1>
        </div>
            {/* <Card />
            <Card />
            <Card />
            <Card /> */}
        <Swiper
              spaceBetween={10}
              slidesPerView={4}
              navigation = {{
                  nextEl: ".swiper-button-next",
                  prevEl: ".swiper-button-prev"
                }}
              autoplay={{delay:3000}}
              loop={true}
              className="w-[84%] "
              // centeredSlides={true}
              // centeredSlidesBounds = {true}
            >
              <SwiperSlide><Card /></SwiperSlide>
              <SwiperSlide><Card /></SwiperSlide>
              <SwiperSlide><Card /></SwiperSlide>
              <SwiperSlide><Card /></SwiperSlide>
              <SwiperSlide><Card /></SwiperSlide>
              <span className="swiper-button-prev"></span>
              <span className="swiper-button-next"></span>
        </Swiper>
      
      </div>
    </div>
  )
}

export default Homepage