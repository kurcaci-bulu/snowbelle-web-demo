import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/swiper-bundle.min.css';
import 'swiper/swiper.min.css';

const Carousel = ({ data }) => {
  return (
    <>
      <Swiper
        className="carousel"
        spaceBetween={50}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
        autoplay={{ delay: 3000 }}
      >
        {data?.carouselCollection.items.map((item) => {
          const backgroundImage = `url(${item.gambarCarousel.url})`;

          return (
            <SwiperSlide key={item.gambarCarousel.url}>
              <div className="carousel-item" style={{ backgroundImage }}></div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </>
  );
};

export default Carousel;
