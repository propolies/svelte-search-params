import { replaceState } from "$app/navigation"
import { page } from "$app/state"
import * as v from "valibot"

export function searchParams<
	T extends v.ObjectEntries,
	S extends v.ObjectSchema<T, undefined>
>(schema: S) {
	const params = Object.fromEntries(
		Object.keys(schema.entries).map((key) => {
			const value = page.url.searchParams.get(key)

			if (value === null) return [key, null]

			try {
				return [key, JSON.parse(value)]
			} catch (e) {
				return [key, null]
			}
		})
	)
	const parsedParams = v.parse(schema, params)
	const state = $state(parsedParams)

	return new Proxy(state, {
		set: (_, property, value) => {
			if (value === null) {
				page.url.searchParams.delete(property as string)
			} else {
				page.url.searchParams.set(property as string, JSON.stringify(value))
			}
			replaceState(page.url, {})
			state[property as keyof typeof state] = value
			return true
		}
	})
}
