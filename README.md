# svelte-search-params - [npm](https://www.npmjs.com/package/svelte-search-params)

Tiny dependency free reactive search parameters for svelte 5.

## Errors not supported

Prevent validation errors by using `fallbacks` or `optionals`.

## Example using valibot

```svelte
<script lang="ts">
  import { searchParams } from 'svelte-search-params'
  import * as v from 'valibot'

  const schema = v.object({
    order: v.fallback(v.string(), "alphabetic"),
    page: v.fallback(v.number(), 1),
    optionalMaxParameter: v.optional(v.number())
  })

  const params = searchParams(schema)
</script>

<button onclick={() => params.page += 1}>next page</button>
```

## Support

Supports all validators who implement StandardSchemaV1.
