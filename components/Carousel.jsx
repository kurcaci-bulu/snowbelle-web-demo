import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/swiper-bundle.min.css';
import 'swiper/swiper.min.css';

const Carousel = ({ data }) => {
  return (
    <>
      <section className="poster">
        <Swiper
          className="carousel"
          spaceBetween={50}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
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
        <nav className="nav poster-nav">
          <div className="nav-burger">
            <div className="burger">
              <div className="burger-line" />
            </div>
          </div>
          <ul className="nav-list">
            <li className="nav-item">
              <a className="link" href="index.html">
                ホームページ
              </a>
            </li>
            <li className="nav-item">
              <a className="link" href="lineup-1.html">
                台湾ナッツ
              </a>
            </li>
            <li className="nav-item">
              <a className="link" href="lineup-2.html">
                きのこ
              </a>
            </li>
            <li className="nav-item">
              <a className="link" href="lineup-3.html">
                ワイン
              </a>
            </li>
          </ul>
        </nav>
      </section>
    </>
  );
};

export default Carousel;
