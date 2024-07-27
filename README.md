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
src/ts-rest.ts:46:1 - error TS2578: Unused '@ts-expect-error' directive.

46 // @ts-expect-error -- TS2345: Argument of type string is not assignable to parameter of type
   ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

src/ts-rest.ts:49:1 - error TS2578: Unused '@ts-expect-error' directive.

49 // @ts-expect-error -- TS2345: Argument of type string is not assignable to parameter of type
   ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

src/ts-rest.ts:59:11 - error TS2304: Cannot find name 'RequestCredentials'.

59 type T2 = RequestCredentials;
             ~~~~~~~~~~~~~~~~~~

src/ts-rest.ts:63:11 - error TS2304: Cannot find name 'RequestCache'.

63 type T6 = RequestCache;
             ~~~~~~~~~~~~


Found 4 errors in the same file, starting at: src/ts-rest.ts:46
```

But we would expect to find 2 or 0 errors instead ("cannot find name", it's unclear whether we should need these types since we won't use them)

# Thoughts
If it is meant to work on TS 5.5, maybe it's a wrong tsconfig? I use [tsconfig/bases/node22](https://github.com/tsconfig/bases/blob/main/bases/node22.json) which I copy pasted here for clarity.

# The solution
You need to include `dom` in the tsconfig `compiler.lib` option.  
However, this is awkward for NodeJS projects that need a ts-rest client.  
And it doesn't explain why it works without `dom` on ts 5.4  
