# graphql_typescript_starter

1. Run 'yarn build' to build.
2. Run 'yarn dev:server' to start the web server.

If you see the following errors: Cannot find name 'AsyncIterator'. That's because we don't have the latest GraphQL type file.
Find node_modules/@types/graphql/subscription/subscribe.d.ts and replace AsyncIterator and AsyncIterable to 'any'. Rebuild again.
