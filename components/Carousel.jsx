import { Swiper, SwiperSlide } from 'swiper/react';
import { useQuery, gql } from '@apollo/client';

import 'swiper/swiper-bundle.min.css';
import 'swiper/swiper.min.css';

const QUERY_CAROUSEL = gql`
  query getCarousels {
    carouselCollection {
      items {
        gambarCarousel {
          url
        }
        linkCarousel
      }
    }
  }
`;

const Carousel = () => {
  const { data, loading } = useQuery(QUERY_CAROUSEL);

  if (loading) <></>;

  return (
    <>
      <Swiper
        className="carousel"
        spaceBetween={50}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
        onSlideChange={() => console.log('slide change')}
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
