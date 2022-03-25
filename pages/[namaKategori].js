import { gql, useLazyQuery } from '@apollo/client';
import React, { useCallback, useEffect, useState, useMemo } from 'react';
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
    fetchPolicy: 'network-only',
  });

  return {
    props: {
      data,
      params: params.namaKategori,
    },
    revalidate: 1,
  };
};

const Stuff = ({ data, params }) => {
  const [products, setProducts] = useState(data);

  const [loadDataDesc, { data: newDataDesc, loading: dataDescLoading }] = useLazyQuery(
    GET_ALL_RELATED_PRODUK_DESC,
    {
      variables: {
        slug: params,
      },
      errorPolicy: 'all',
      fetchPolicy: 'cache-and-network',
    }
  );

  const [loadDataAsc, { data: newDataAsc, loading: dataAscLoading, error }] = useLazyQuery(
    GET_ALL_RELATED_PRODUK_ASC,
    {
      variables: {
        slug: params,
      },
      errorPolicy: 'all',
      fetchPolicy: 'cache-and-network',
    }
  );

  const handleClickDescButton = useCallback(
    (e) => {
      e.preventDefault();
      loadDataDesc();
      setProducts(newDataDesc);
    },
    [newDataDesc]
  );

  const handleClickAscButton = useCallback(
    (e) => {
      e.preventDefault();
      loadDataAsc();
      setProducts(newDataAsc);
    },
    [newDataAsc]
  );

  const pageTitle = useMemo(() => {
    if (params === 'full-chrysant') return 'Full Chrysant Packages';
    else if (params === 'full-rose') return 'Full Rose Packages';
    else if (params === 'produk') return 'Special Packages';
    else return 'Chrysant + Rose Combo Packages';
  }, [params]);

  useEffect(() => {
    if (newDataAsc === undefined) loadDataAsc(); //to get data again when newDataAsc === undefined
  }, [newDataAsc]);

  useEffect(() => {
    if (newDataDesc === undefined) loadDataDesc(); //to get data again when newDataDesc === undefined
  }, [newDataDesc]);

  return (
    <>
      <div className="container">
        <h1 className="heading heading--title">{pageTitle}</h1>
        <div className="produkProduk-filter">
          <span className="produkProduk-filterButton" onClick={handleClickDescButton}>
            Urut dari <b>paling mahal</b> ke <b>paling murah</b>
          </span>
          <span className="produkProduk-filterButton" onClick={handleClickAscButton}>
            Urut dari <b>paling murah</b> ke <b>paling mahal</b>
          </span>
        </div>
        {dataDescLoading || dataAscLoading ? (
          <h1>loading...</h1>
        ) : (
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
        )}
      </div>
    </>
  );
};

export default Stuff;
