import Head from 'next/head';
import { useQuery, gql } from '@apollo/client';
import Carousel from '../components/Carousel';
import TentangKami from '../components/TentangKami';

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

export default function Home() {
  const { data } = useQuery(productCollections);
  return (
    <div>
      <Head>
        <title>Proyek Bunga</title>
        <meta name="description" content="Proyek Bunga" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Carousel></Carousel>
      <TentangKami />
    </div>
  );
}
