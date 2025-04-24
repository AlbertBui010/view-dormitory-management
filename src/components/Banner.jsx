import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';
import { Autoplay, EffectFade, Pagination } from 'swiper/modules';
import { slide } from "../constant/data";
import { useNavigate } from 'react-router-dom';

const Banner = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const navigate = useNavigate();

  return (
    <div>
      <Swiper
        style={{
          '--swiper-pagination-color': '#ffff',
        }}
        spaceBetween={30}
        effect={'fade'}
        autoplay={{
          delay: 4500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        modules={[EffectFade, Autoplay, Pagination]}
        onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
        className="mySwiper w-full cursor-grab"
      >
        {slide.map((item, index) => (
          <SwiperSlide key={index} className="relative">
            <img
              src={item.image}
              className="relative w-full h-[220px] lg:h-[950px] aspect-auto object-cover"
              alt={`slide-${index}`}
            />
            <div className="absolute top-0 left-0 bg-gradient-to-r from-black w-full h-full flex items-center">
              <div className="pl-[10%]">
                <div
                  className={`w-full absolute top-[20%] lg:top-[60%] left-[10%]  transition-all duration-[1200ms] ease-out transform ${
                    activeIndex === index ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
                  }`}
                >
                  <span className="block w-full max-w-[700px] font-sans uppercase text-white text-base lg:text-4xl font-bold mb-4 text-justify">
                    {item.content}
                  </span>
                  <button
                    className="mt-2 px-6 py-4 bg-white text-black rounded-full font-medium text-sm lg:text-base hover:bg-yellow-500 transition duration-300"
                  >
                    Đăng ký phòng ngay
                  </button>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Banner;
