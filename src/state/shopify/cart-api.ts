import { fetchShopify } from './shopify-client';

export async function createCart() {
  const query = `
    mutation {
      cartCreate {
        cart {
          id
          checkoutUrl
          lines(first: 10) {
            edges {
              node {
                id
                quantity
                merchandise {
                  ... on ProductVariant {
                    id
                    title
                  }
                }
              }
            }
          }
        }
      }
    }
  `;

  const data = await fetchShopify(query);
  return data.cartCreate.cart;
}

export async function addToCart(
  cartId: string,
  merchandiseId: string,
  quantity: number
) {
  const query = `
    mutation AddToCart($cartId: ID!, $lines: [CartLineInput!]!) {
      cartLinesAdd(cartId: $cartId, lines: $lines) {
        cart {
          id
          checkoutUrl
          lines(first: 10) {
            edges {
              node {
                id
                quantity
                merchandise {
                  ... on ProductVariant {
                    id
                    title
                  }
                }
              }
            }
          }
        }
      }
    }
  `;

  const variables = {
    cartId,
    lines: [{ merchandiseId, quantity }],
  };

  const data = await fetchShopify(query, variables);
  return data.cartLinesAdd.cart;
}

export async function removeFromCart(cartId: string, lineIds: string[]) {
  const query = `
    mutation RemoveFromCart($cartId: ID!, $lineIds: [ID!]!) {
      cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
        cart {
          id
          lines(first: 10) {
            edges {
              node {
                id
              }
            }
          }
        }
      }
    }
  `;

  const variables = { cartId, lineIds };
  const data = await fetchShopify(query, variables);
  return data.cartLinesRemove.cart;
}

export async function updateCartLine(
  cartId: string,
  lineId: string,
  quantity: number
) {
  const query = `
    mutation UpdateCartLine($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
      cartLinesUpdate(cartId: $cartId, lines: $lines) {
        cart {
          id
          lines(first: 10) {
            edges {
              node {
                id
                quantity
              }
            }
          }
        }
      }
    }
  `;

  const variables = {
    cartId,
    lines: [{ id: lineId, quantity }],
  };

  const data = await fetchShopify(query, variables);
  return data.cartLinesUpdate.cart;
}
