/**
 * @vitest-environment happy-dom
 */

import { it, describe } from "vitest";
import { Storage } from "@/core/storage";

describe("test Storage", () => {
  it("test storage set/get basic type data", () => {
    const storage = new Storage();
    storage.set("test-basic", { name: "this is your test" });
  });

  it("test storage set/get complex type data", () => {
    const storage = new Storage();
    storage.set("test-complex", { name: "this is your test" });
  });
});
