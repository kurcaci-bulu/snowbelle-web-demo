import { gql, useLazyQuery } from '@apollo/client';
import React, { useCallback, useEffect, useState } from 'react';
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

const GET_ALL_RELATED_PRODUK_ASC = gql`
  query getAllRelatedProdukAsc($slug: String!) {
    produkCollection(
      order: hargaProduk_ASC
      where: { jenisKategoriProduk: { namaKategoriProduk: $slug } }
    ) {
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

const GET_ALL_RELATED_PRODUK_DESC = gql`
  query getAllRelatedProdukDesc($slug: String!) {
    produkCollection(
      order: hargaProduk_DESC
      where: { jenisKategoriProduk: { namaKategoriProduk: $slug } }
    ) {
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
    fallback: 'blocking',
    paths: params,
  };
};

export const getStaticProps = async ({ params }) => {
  const { data } = await apolloClient.query({
    query: GET_ALL_RELATED_PRODUK_ASC,
    variables: {
      slug: params.namaKategori,
    },
  });

  return {
    props: {
      data,
      params: params.namaKategori,
    },
    revalidate: 10,
  };
};

const Stuff = ({ data, params }) => {
  const [products, setProducts] = useState({});

  const [loadDataDesc, { data: newDataDesc, loading: dataDescLoading }] = useLazyQuery(
    GET_ALL_RELATED_PRODUK_DESC,
    {
      variables: {
        slug: params,
      },
    }
  );

  const [loadDataAsc, { data: newDataAsc, loading: dataAscLoading }] = useLazyQuery(
    GET_ALL_RELATED_PRODUK_ASC,
    {
      variables: {
        slug: params,
      },
    }
  );

  const handleClickDescButton = useCallback(() => {
    loadDataDesc();
    setProducts(newDataDesc);
  }, [newDataDesc]);

  const handleClickAscButton = useCallback(() => {
    loadDataAsc();
    setProducts(newDataAsc);
  }, [newDataAsc]);

  useEffect(() => {
    if (data) {
      setProducts(data);
    }
  }, [data]);

  if (dataDescLoading || dataAscLoading) <h1>loading...</h1>;
  return (
    <>
      <div className="container">
        <h1 className="heading heading--title">Produk - </h1>
        <div className="produkProduk-filter">
          <span className="produkProduk-filterButton" onClick={handleClickDescButton}>
            Urut dari <b>paling mahal</b> ke <b>paling murah</b>
          </span>
          <span className="produkProduk-filterButton" onClick={handleClickAscButton}>
            Urut dari <b>paling murah</b> ke <b>paling mahal</b>
          </span>
        </div>
        <ul className="produkProduk-produkList">
          {products?.produkCollection?.items.map((item, id) => {
            return (
              <React.Fragment key={id}>
                <li className="produkProduk-produkItem">
                  <div className="produkProduk-gambarList">
                    {item.fotoProdukCollection.items.map((gbr, idx) => {
                      const backgroundImage = `url(${gbr.url})`;
                      return (
                        <div
                          className="produkProduk-gambarItem"
                          style={{ backgroundImage }}
                          key={idx}
                        ></div>
                      );
                    })}
                  </div>
                  <h3 className="produkProduk-nama heading heading--small">{item.namaProduk}</h3>
                  <h4 className="produkProduk-harga heading heading--mini">
                    {item.hargaProduk !== null ? 'Rp. ' + item.hargaProduk + ',-' : 'menyusul'}
                  </h4>
                </li>
              </React.Fragment>
            );
          })}
        </ul>
      </div>
    </>
  );
};

export default Stuff;
