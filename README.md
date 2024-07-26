# [@ts-rest/core issue #647](https://github.com/ts-rest/ts-rest/issues/647)

A repro for a typescript type bug when using ts-rest and typescript 5.5.x

# How to repro
```bash
nvm i
npm i
npm run typecheck
npm run build
```

During the build and typecheck, you should get following output:
```
src/ts-rest.ts:48:8 - error TS2339: Property 'invalid' does not exist on type 'RecursiveProxyObj<RecursivelyApplyOptions<{ auth: { login: { method: "POST"; path: "/auth/login"; body: ZodObject<{ email: ZodString; password: ZodString; }, "strip", ZodTypeAny, { email: string; password: string; }, { ...; }>; responses: { ...; }; }; }; logout: { ...; }; }, { ...; }>, { ...; }>'.

48 client.invalid() // As expected: TS2339: Property invalid does not exist on type
          ~~~~~~~


Found 1 error in src/ts-rest.ts:48
```

But we would expect to find 3 errors instead, on lines 46, 47 and 48
