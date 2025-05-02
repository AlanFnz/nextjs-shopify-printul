import { fetchShopify } from './shopify-client';

export type Product = {
  id: string;
  title: string;
  handle: string;
  description: string;
  featuredImage?: {
    url: string;
    altText: string;
  };
  variants: {
    edges: {
      node: {
        id: string;
        title: string;
        price: {
          amount: string;
          currencyCode: string;
        };
        image?: {
          url: string;
          altText: string;
        };
        availableForSale: boolean;
      };
    }[];
  };
};

export const fetchPosters = async (): Promise<Product[]> => {
  const query = `
    {
      products(first: 20) {
        edges {
          node {
            id
            title
            handle
            description
            featuredImage {
              url
              altText
            }
            variants(first: 1) {
              edges {
                node {
                  id
                  title
                  price {
                    amount
                    currencyCode
                  }
                  image {
                    url
                    altText
                  }
                  availableForSale
                }
              }
            }
          }
        }
      }
    }
  `;

  const data = await fetchShopify(query);
  return data.products.edges.map((edge: any) => edge.node);
};
