import Link from 'next/link';

const ProdukJualan = ({ data }) => {
  return (
    <>
      <section className="featured wrapMe">
        <h2 className="title--section">
          <span className="title-sub">Kategori</span>
        </h2>
        <div className="featured-list">
          {data?.coverKategoriProdukCollection.items.map((item) => {
            const backgroundImage = `url(${item.gambarCoverKategoriProduk.url})`;
            return (
              <Link href={item.jenisKategoriProduk.namaKategoriProduk}>
                <a className="featured-item" href="item-1.html">
                  <div className="featured-imageHover">
                    <div className="featured-image" style={{ backgroundImage }} />
                  </div>
                  <div className="featured-contentWrapper">
                    <h3 className="featured-mainTitle">
                      {item.jenisKategoriProduk.namaKategoriProduk === 'full-chrysant' &&
                        'Full Chrysant Packages'}
                      {item.jenisKategoriProduk.namaKategoriProduk === 'kombinasi-rose-chrysant' &&
                        'Chrysant + Rose Combo Packages'}

                      {item.jenisKategoriProduk.namaKategoriProduk === 'full-rose' &&
                        'Full Rose Packages'}
                      {item.jenisKategoriProduk.namaKategoriProduk === 'produk' &&
                        'Special Packages'}
                    </h3>
                  </div>
                  <div className="featured-button"></div>
                </a>
              </Link>
            );
          })}
        </div>
      </section>
    </>
  );
};

export default ProdukJualan;
