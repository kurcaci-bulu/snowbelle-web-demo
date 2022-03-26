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

const GET_COVER_KATEGORI = gql`
  query getCoverKategori($slug: String!) {
    coverKategoriProdukCollection(where: { jenisKategoriProduk: { namaKategoriProduk: $slug } }) {
      items {
        gambarCoverKategoriProduk {
          url
        }
        jenisKategoriProduk {
          namaKategoriProduk
        }
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

  const { data: dataCover } = await apolloClient.query({
    query: GET_COVER_KATEGORI,
    variables: {
      slug: params.namaKategori,
    },
    fetchPolicy: 'network-only',
  });

  return {
    props: {
      data,
      dataCover,
      params: params.namaKategori,
    },
    revalidate: 1,
  };
};

const Stuff = ({ data, dataCover, params }) => {
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

  const handleClickToBuy = useCallback(
    (produk) => {
      const pertanyaan = encodeURI(
        `Hallo Snow Belle Florist, saya berminat dengan ${produk}, apa bisa dibantu?`
      );
      const url = 'https://api.whatsapp.com/send?phone=+6281281116881.&text=' + pertanyaan;
      window.open(url, '_blank').focus();
    },
    [products]
  );

  return (
    <>
      <section className="poster2">
        <div
          className="poster2-image"
          style={{
            backgroundImage: `url(${dataCover.coverKategoriProdukCollection.items[0].gambarCoverKategoriProduk.url})`,
          }}
        />
      </section>
      <div className="container">
        <h2 className="title--section">
          <span className="title-sub">{pageTitle}</span>
        </h2>
        <div className="produkProduk-filter">
          <span className="produkProduk-filterButton" onClick={handleClickDescButton}>
            Urut dari <b>paling mahal</b> ke <b>paling murah</b>
          </span>
          <span className="produkProduk-filterButton" onClick={handleClickAscButton}>
            Urut dari <b>paling murah</b> ke <b>paling mahal</b>
          </span>
        </div>
        {dataDescLoading || dataAscLoading ? (
          <ul className="produkProduk-produkList">
            <h1>loading...</h1>
          </ul>
        ) : (
          <ul className="produkProduk-produkList">
            {products?.produkCollection?.items.map((item, id) => {
              return (
                <React.Fragment key={id}>
                  <li className="produkProduk-produkItem">
                    <div
                      className="produkProduk-cta"
                      onClick={() => {
                        handleClickToBuy(item.namaProduk);
                      }}
                    >
                      Kontak untuk instant order
                    </div>
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
                      {item.hargaProduk !== null
                        ? 'Rp. ' + item.hargaProduk.toLocaleString('id-ID') + ',-'
                        : 'menyusul'}
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
