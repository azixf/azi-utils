/**
 * @vitest-environment happy-dom
 */

import { it, describe, expect, vi, beforeEach, afterEach } from "vitest";
import { Storage } from "@/core/storage/storage";

const storage = new Storage({
  secret: "this is a very wonderful secret",
});
describe("test Storage", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });
  afterEach(() => {
    vi.restoreAllMocks();
  });
  it("test storage set/get complex type data", () => {
    const key = "test-complex";
    const data = { name: "this is your test" };
    storage.set(key, data);
    const result = storage.get(key);

    expect(result).toBeTypeOf("object");
    expect(result.name).toBe(data.name);
  });

  it("test storage set/get base type data", () => {
    const key = "test-basic";
    const data = undefined;
    storage.set(key, data);
    const result = storage.get(key);
    expect(result).toBe(data);

    const key1 = "test-basic-string";
    const data1 = "test";
    storage.set(key1, data1);
    const result1 = storage.get(key1);
    expect(result1).toBe(data1);

    const key2 = "test-basic-number";
    const data2 = 9;
    storage.set(key2, data2);
    const result2 = storage.get(key2);
    expect(result2).toBe(data2);
  });

  it("test storage expires", () => {
    const key = "test-expires";
    const data = "expires";
    const expires = 0;
    storage.set(key, data, expires);
    let result: any = null;

    const mock = vi.fn(() => {
      result = storage.get(key);
    });

    setTimeout(mock, 1000 * 10);
    vi.runAllTimers();
    expect(result).toBe(data);

    const key1 = "test-expires1";
    const data1 = "expires";
    const expires1 = 5000;
    storage.set(key1, data1, expires1);
    let result1: any = null;

    const mock1 = vi.fn(() => {
      result1 = storage.get(key1);
    });

    setTimeout(mock1, 1000 * 10);
    vi.runAllTimers();
    expect(result1).toBe(null);
  });

  it("test storage no expired", () => {
    const key1 = "test-no-expired";
    const data1 = "expires";
    const expires1 = 15000;
    storage.set(key1, data1, expires1);
    let result1: any = null;

    const mock1 = vi.fn(() => {
      result1 = storage.get(key1);
    });

    setTimeout(mock1, 1000 * 10);
    vi.runAllTimers();
    expect(result1).toBe(data1);
  });
});
