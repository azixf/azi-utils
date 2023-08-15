/**
 * @vitest-environment node
 */
import { test } from "vitest";
import { Request } from "../../core/request/request";

test("test request", () => {
  const request = new Request({
    baseURL: "https://api.github.com",
  });
  // request.get("/orgs/azi-org/repos").then((res) => {
  //   console.log(res);
  // });
});
