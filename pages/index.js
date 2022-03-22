import Head from 'next/head';
import { gql } from '@apollo/client';
import Carousel from '../components/Carousel';
import TentangKami from '../components/TentangKami';
import ProdukJualan from '../components/ProdukJualan';
import apolloClient from '../lib/apolloClient';
const productCollections = gql`
  query getProductCollections {
    produkCollection(order: hargaProduk_ASC) {
      items {
        namaProduk
        hargaProduk
        fotoProdukCollection {
          items {
            url
          }
        }
      }
    }
  }
`;

export const getServerSideProps = async () => {
  const { data } = await apolloClient.query({
    query: productCollections,
  });
  return {
    props: {
      data,
    },
  };
};

export default function Home({ data }) {
  return (
    <div>
      <Head>
        <title>Proyek Bunga</title>
        <meta name="description" content="Proyek Bunga" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Carousel></Carousel>
      <TentangKami />
      <ProdukJualan></ProdukJualan>
    </div>
  );
}
