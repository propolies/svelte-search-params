import { beforeEach, describe, expect, it, vi } from "vitest"
import * as v from "valibot"
import { searchParams } from "./search-params.svelte.ts"

vi.mock("$app/navigation", () => ({
	replaceState: () => {}
}))

vi.mock("$app/state", () => ({
	page: { url: new URL("https://domain.com/") }
}))

const { page } = await import("$app/state")

function setParam(key: string, value: any) {
	page.url.searchParams.set(key, JSON.stringify(value))
}

beforeEach(() => {
	page.url = new URL("https://domain.com/") as typeof page.url
})

describe("searchParams - initialization", () => {
	it("reads a string parameter from the URL", () => {
		setParam("name", "alice")

		const schema = v.object({
			name: v.string()
		})

		const params = searchParams(schema)

		expect(params.name).toBe("alice")
	})

	it("reads a number parameter from the URL", () => {
		setParam("age", 42)

		const schema = v.object({
			age: v.number()
		})

		const params = searchParams(schema)

		expect(params.age).toBe(42)
	})

	it("reads an array of strings from the URL", () => {
		setParam("tags", ["foo", "bar", "baz"])

		const schema = v.object({
			tags: v.array(v.string())
		})

		const params = searchParams(schema)

		expect(params.tags).toEqual(["foo", "bar", "baz"])
	})

	it("reads an array of numbers from the URL", () => {
		setParam("nums", [1, 2, 3])

		const schema = v.object({
			nums: v.array(v.number())
		})
		const params = searchParams(schema)

		console.log(params)

		expect(params.nums).toEqual([1, 2, 3])
	})
})

describe("searchParams - set", () => {
	it("sets a value in the url", () => {
		const schema = v.object({
			value: v.nullable(v.number())
		})
		const params = searchParams(schema)
		params.value = 3

		expect(page.url.searchParams.get("value")).toBe("3")
	})
})
