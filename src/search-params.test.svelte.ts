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
	it("marshalls correctly from the URL", () => {
		setParam("str", "someString")
		setParam("num", 1)
		setParam("arr", [2, "b"])

		const schema = v.object({
			str: v.string(),
			num: v.number(),
			arr: v.array(v.union([v.number(), v.string()]))
		})

		const params = searchParams(schema)

		expect(params.str).toBe("someString")
		expect(params.num).toBe(1)
		expect(params.arr).toStrictEqual([2, "b"])
	})

	it("accepts undefined values", () => {
		const schema = v.object({
			opt: v.optional(v.string(), "default")
		})
		const params = searchParams(schema)

		expect(params.opt).toEqual("default")
	})

	it("falls back to fallback value", () => {
		const schema = v.object({
			a: v.fallback(v.number(), 3)
		})
		const params = searchParams(schema)

		expect(params.a).toEqual(3)
	})
})

describe("searchParams - set", () => {
	it("sets a value in the url", () => {
		const schema = v.object({
			value: v.optional(v.number())
		})
		const params = searchParams(schema)
		params.value = 3

		expect(page.url.searchParams.get("value")).toBe("3")
	})
})
