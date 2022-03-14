const { compileQuery, isCompiledQuery } = require("graphql-jit");
const { execute } = require("graphql");
const LRU = require("tiny-lru");

const executor = (
  schema,
  cacheSize = 1024,
  compilerOpts = {
    disableLeafSerialization: true // this is dangerous!
  }
) => {
  const jitCache = LRU(cacheSize);

  return async ({ context, document, operationName, request, queryHash }) => {
    const prefix = operationName || "Anonymous";
    const cacheKey = `${prefix}-${queryHash}`;
    let compiledQuery = jitCache.get(cacheKey);
    const wasCompiled = !!compiledQuery;

    if (!compiledQuery) {
      console.info("Compiling...", cacheKey);

      const compilationResult = compileQuery(
        schema,
        document,
        operationName || undefined,
        compilerOpts
      );

      if (isCompiledQuery(compilationResult)) {
        compiledQuery = compilationResult;
        jitCache.set(cacheKey, compiledQuery);
      } else {
        console.warn("[WARM]");
        return compilationResult;
      }
    }

    console.warn(`[HOT], Precompiled ${wasCompiled}`);

    return compiledQuery.query(undefined, context, request.variables || {}); // HOT
  };
};

module.exports = { executor };
