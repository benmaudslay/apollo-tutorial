import { InMemoryCache } from "@apollo/client";

export const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        // isLoggedIn() {
        //   return isLoggedInVar();
        // },
        // cartItems() {
        //   return cartItemsVar();
        // },
        isLoggedIn: {
          read(_, __) {
            return !!localStorage.getItem("token");
          },
        },
        cartItems: {
          read(_, __) {
            return [];
          },
        },
        launches: {
          keyArgs: false,
          merge(existing, incoming) {
            let launches = [];
            if (existing && existing.launches) {
              launches = launches.concat(existing.launches);
            }
            if (incoming && incoming.launches) {
              launches = launches.concat(incoming.launches);
            }
            return {
              ...incoming,
              launches,
            };
          },
        },
      },
    },
  },
});

// export const isLoggedInVar = makeVar(!!localStorage.getItem("token"));
// export const cartItemsVar = makeVar([]);
