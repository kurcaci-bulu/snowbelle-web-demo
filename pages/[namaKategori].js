import { useQuery, gql } from '@apollo/client';
import apolloClient from '../lib/apolloClient';

const GET_ALAMAT_URL = gql`
  query alamatURL {
    kategoriProdukCollection {
      items {
        namaKategoriProduk
      }
    }
  }
`;

const GET_ALL_RELATED_PRODUK = gql`
  query getAllRelatedProduk($slug: String) {
    produkCollection(where: { jenisKategoriProduk: { namaKategoriProduk: $slug } }) {
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

export const getStaticPaths = async () => {
  const { data } = await apolloClient.query({
    query: GET_ALAMAT_URL,
  });

  const params = data.kategoriProdukCollection.items.map((item) => {
    return {
      params: {
        namaKategori: item.namaKategoriProduk,
      },
    };
  });

  return {
    fallback: false,
    paths: params,
  };
};

export const getStaticProps = async ({ params }) => {
  const { data } = await apolloClient.query({
    query: GET_ALL_RELATED_PRODUK,
    variables: {
      slug: params.namaKategori,
    },
  });
  return {
    props: {
      data,
    },
  };
};

const Stuff = ({ data }) => {
  return (
    <div className="container">
      <h1 className="heading heading--title">Produk - </h1>
      <ul className="produkProduk-produkList">
        {data?.produkCollection.items.map((item) => {
          return (
            <>
              <li className="produkProduk-produkItem">
                <div className="produkProduk-gambarList">
                  {item.fotoProdukCollection.items.map((gbr) => {
                    const backgroundImage = `url(${gbr.url})`;
                    return (
                      <div className="produkProduk-gambarItem" style={{ backgroundImage }}></div>
                    );
                  })}
                </div>
                <h3 className="produkProduk-nama heading heading--small">{item.namaProduk}</h3>
                <h4 className="produkProduk-harga heading heading--mini">
                  {item.hargaProduk !== null ? 'Rp. ' + item.hargaProduk + ',-' : 'menyusul'}
                </h4>
              </li>
            </>
          );
        })}
      </ul>
    </div>
  );
};

export default Stuff;
