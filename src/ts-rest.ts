import { initContract, initClient } from "@ts-rest/core"
import { z } from "zod"

export const contract = initContract().router(
  {
    auth: {
      login: {
        method: "POST",
        path: `/auth/login`,
        body: z.object({
          email: z.string(),
          password: z.string(),
        }),
        responses: {
          200: z.object({
            token: z.string(),
          }),
        },
      },
    },
    logout: {
      method: "POST",
      path: `/logout`,
      body: z.object({
        email: z.string(),
        password: z.string(),
      }),
      responses: {
        200: z.object({
          token: z.string(),
        }),
      },
    },
  },
  {
    strictStatusCodes: true,
    pathPrefix: "/api",
  },
)

const client = initClient(contract, {
  baseUrl: `http://localhost:3000`,
  baseHeaders: {},
})

// @ts-expect-error -- TS2345: Argument of type string is not assignable to parameter of type
client.auth.login("invalid") // Problem: type of "login" is "any"

// @ts-expect-error -- TS2345: Argument of type string is not assignable to parameter of type
client.logout("invalid") // Problem: type of "logout" is "any"

// @ts-expect-error -- TS2339: Property invalid does not exist on type
client.invalid()

/**
 * These are the types supposedly needed by ts-rest for app routes to be typed correctly
 */
type T1 = RequestInit;
type T2 = RequestCredentials;
type T3 = FormData;
type T4 = URLSearchParams;
type T5 = AbortSignal;
type T6 = RequestCache;
type T7 = Headers;
type T8 = typeof fetch;
type T9 = File;
