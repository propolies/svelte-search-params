import { describe, it, expect } from 'vitest'
import { add } from '$package'

describe("MAIN", () => {
  it("SHOULD WORK", () => {
    expect(add(1, 2)).toBe(3)
  })
})