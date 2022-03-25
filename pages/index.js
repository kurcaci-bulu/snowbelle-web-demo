import Head from 'next/head';
import apolloClient from '../lib/apolloClient';
import { gql } from '@apollo/client';
import Carousel from '../components/Carousel';
import TentangKami from '../components/TentangKami';
import ProdukJualan from '../components/ProdukJualan';

const GET_HOME_PAGE = gql`
  query getHomePage {
    carouselCollection {
      items {
        gambarCarousel {
          url
        }
        linkCarousel
      }
    }
    coverKategoriProdukCollection {
      items {
        gambarCoverKategoriProduk {
          url
        }
        jenisKategoriProduk {
          namaKategoriProduk
        }
      }
    }
    tentangKamiCollection {
      items {
        sys {
          id
        }
        judulTentangKami
        kontenTentangKami {
          json
        }
      }
    }
  }
`;

export const getStaticProps = async () => {
  const { data } = await apolloClient.query({
    query: GET_HOME_PAGE,
    fetchPolicy: 'network-only',
  });

  return {
    props: {
      data,
    },
    revalidate: 1,
  };
};

export default function Home({ data }) {
  console.log(data);
  return (
    <div>
      <Head>
        <title>Proyek Bunga</title>
        <meta name="description" content="Proyek Bunga" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Carousel data={data}></Carousel>
      <TentangKami data={data} />
      <ProdukJualan data={data}></ProdukJualan>
    </div>
  );
}
