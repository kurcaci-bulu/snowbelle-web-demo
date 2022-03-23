import Head from 'next/head';

import Carousel from '../components/Carousel';
import TentangKami from '../components/TentangKami';
import ProdukJualan from '../components/ProdukJualan';
import apolloClient from '../lib/apolloClient';

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
