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

client.auth.login("invalid") // Problem: type of "login" is "any"
client.logout("invalid") // Problem: type of "logout" is "any"
client.invalid() // As expected: TS2339: Property invalid does not exist on type

/**
 * The following is to showcase that fetch and AbortSignal types are included in @types/node >=20
 */
async function showcaseFetchAndAbortSignalTypes() {
  const controller: AbortController = new AbortController();
  const signal: AbortSignal = controller.signal;

  const request: Request = new Request("https://example.org/get", { signal });
  const response: Response = await fetch(request);

  controller.abort();

  const text = await response.text();
  console.log(text);
}
