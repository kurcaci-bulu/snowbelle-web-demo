import Link from 'next/link';

const ProdukJualan = ({ data }) => {
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
                <Link href={item.jenisKategoriProduk.namaKategoriProduk}>
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
