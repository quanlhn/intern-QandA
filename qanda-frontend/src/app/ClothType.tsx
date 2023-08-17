'use client'

import React from "react";
import MalePole from './../../public/maleCategory/polo.jpg';
import Link from "next/link";
import { useRouter } from "next/navigation";

type Props = {
    url: string,
    name: string,
    gender: string,
    flexDirec: string
}

const ClothType: React.FC<Props> = ({gender, url, name, flexDirec}) => {
    // const imgUrl = require(url)
    // console.log('url: ' + url)
    // const logo = require(url)
    // console.log(imgUrl)
    // console.log(logo)
    const itemClass = "hover:cursor-pointer flex w-min flex-" + flexDirec
    const pathTo = "/" + gender + "/" + url.slice(0, url.indexOf("."))
    const router = useRouter()
    
    

    return (
        <div className={itemClass} onClick={() => router.push(pathTo)}>            
            <div className="bg-headerbg/50 w-24 h-24 flex justify-center items-center rounded-full mr-8 ">
                <img src={require("./../../public/"+ gender + "Category/" + url).default.src} className="w-4/5 h-4/5 rounded-full"/>
            </div>
            <div className="text-sm w-24 leading-10 text-center">{name}</div>
        </div>
    )
}

export default ClothType

// {
//     "category":[
//         {
//             "gender": "male",
//             "type": [
//                 {
//                     "id": "1",
//                     "name": "ÁO POLO",
//                     "filename": "polo.jpg"
//                 },
//                 {
//                     "id": "2",
//                     "name": "ÁO THUN",
//                     "filename": "thun.jpg"
//                 }
//             ]

//         },
//         {
//             "gender": "female",
//             "type": [
//                 {
//                     "id": "1",
//                     "name": "ÁO POLO",
//                     "filename": "polo.jpg"
//                 },
//                 {
//                     "id": "2",
//                     "name": "ÁO THUN",
//                     "filename": "thun.jpg"
//                 }
//             ]

//         }

//     ]
    
// }