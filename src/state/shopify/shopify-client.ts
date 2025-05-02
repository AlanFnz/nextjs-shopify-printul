const SHOPIFY_DOMAIN = process.env.NEXT_PUBLIC_STORE_URL!;
const API_VERSION = process.env.NEXT_PUBLIC_SHOPIFY_API_VERSION!;
const STOREFRONT_TOKEN = process.env.NEXT_PUBLIC_STOREFRONT_TOKEN!;

export async function fetchShopify(query: string, variables: any = {}) {
  const response = await fetch(
    `https://${SHOPIFY_DOMAIN}/api/${API_VERSION}/graphql.json`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': STOREFRONT_TOKEN,
      },
      body: JSON.stringify({ query, variables }),
    }
  );

  const result = await response.json();

  if (result.errors) {
    throw new Error(JSON.stringify(result.errors));
  }

  return result.data;
}
