import { replaceState } from "$app/navigation"
import { page } from "$app/state"
import type { StandardSchemaV1 } from "@standard-schema/spec"

export function searchParams<T extends object>(schema: StandardSchemaV1<T>) {
	const params = Object.fromEntries(
		page.url.searchParams.entries().map(([key, value]) => {
			try {
				return [key, JSON.parse(value)]
			} catch {
				return [key, undefined]
			}
		})
	)

	const validatedParams = schema["~standard"].validate(
		params
	) as StandardSchemaV1.SuccessResult<T>
	const state = $state(validatedParams.value)

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
