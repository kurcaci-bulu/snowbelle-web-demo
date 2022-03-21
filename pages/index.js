import Head from "next/head";
import { GraphQLClient, gql } from "graphql-request";

export const getStaticProps = async () => {
  const endPoint =
    "https://graphql.contentful.com/content/v1/spaces/0s0kjd52m3s3";

  const graphQLClient = new GraphQLClient(endPoint, {
    headers: {
      authorization: `Bearer TpBId6BcrKUm2Ej8S_-xohiBoJaRkQAbTDM5Lll41po`,
    },
  });

  const productCollections = gql`
    {
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

  const products = await graphQLClient.request(productCollections);

  return {
    props: {
      products,
    },
  };
};

export default function Home({ products }) {
  console.log(products);
  return (
    <div>
      <Head>
        <title>Proyek Bunga</title>
        <meta name="description" content="Proyek Bunga" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
    </div>
  );
}
