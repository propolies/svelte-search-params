# svelte-search-parameters - [npm](https://www.npmjs.com/package/svelte-search-parameters)

Tiny dependency free reactive search parameters for svelte 5.

## Example

```svelte
<script lang="ts">
  import { searchParams } from 'svelte-search-params'
  import * as v from 'valibot'

  const schema = v.object({
    order: v.fallback(v.string(), "alphabetic"),
    page: v.fallback(v.number(), 1),
    optionalRegionFilter: v.nullable(v.string())
  })

  const params = searchParams(schema)

  // To change the url search parameters simply reassign
  params.page = 2
</script>
```

## Support

Currently only supports [valibot](https://valibot.dev/) as validation library.
