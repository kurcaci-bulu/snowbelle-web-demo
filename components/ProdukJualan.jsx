import { useQuery, gql } from '@apollo/client';
import Link from 'next/link';

const GET_PRODUK_JUALAN = gql`
  query produkJualan {
    coverKategoriProdukCollection {
      items {
        gambarCoverKategoriProduk {
          url
        }
        jenisKategoriProduk {
          namaKategoriProduk
        }
        alamatUrl
      }
    }
  }
`;

const ProdukJualan = () => {
  const { data } = useQuery(GET_PRODUK_JUALAN);
  console.log(
    data?.coverKategoriProdukCollection.items.map(
      (item) => item.jenisKategoriProduk.namaKategoriProduk
    )
  );
  return (
    <>
      <div className="container">
        <h2 className="heading heading--title">Kategori</h2>
        <ul className="produkJualanList">
          {data?.coverKategoriProdukCollection.items.map((item) => {
            const backgroundImage = `url(${item.gambarCoverKategoriProduk.url})`;

            return (
              <li
                className="produkJualanItem"
                key={item.jenisKategoriProduk.namaKategoriProduk}
                style={{ backgroundImage }}
              >
                <Link href={item.alamatUrl}>
                  <a className="produkJualanLink">
                    <span className="heading heading--subtitle color--whiteOnShadow text--bold produkJualan-text">
                      {item.jenisKategoriProduk.namaKategoriProduk}
                    </span>
                  </a>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};

export default ProdukJualan;
