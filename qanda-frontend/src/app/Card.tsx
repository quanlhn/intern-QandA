import React from 'react';
import './style.css'

const Card: React.FC = () => {
    return (
        <div className="card mx-9 h-96 w-52 font-roboto ">
            <div className="img-container h-[75%] overflow-hidden ">
                <img className="w-full h-full  inset-0 hover:scale-125 duration-700" src={require('./../../public/maleCategory/aokhoac.jpg').default.src}/>
            </div>
            <div className="info">
                <div className="name w-full">Áo khoác 4 mùa</div>
                <b className="price">999.999đ</b>
                <div className="color">
                    <button className='mr-2 red w-4 h-4 bg-red1 rounded-full'></button>
                    <button className='mr-2 dark w-4 h-4 bg-primary rounded-full'></button>
                    <button className='mr-2 dark w-4 h-4 bg-dark rounded-full'></button>
                    <button className='mr-2 headerbg w-4 h-4 bg-headerbg rounded-full'></button>
                </div>
            </div>
        </div>

    )
}

export default Card