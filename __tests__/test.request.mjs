import { Request } from "../dist/index.mjs";
const request = new Request({
  baseURL: "https://api.github.com",
});
request.httpGet("/orgs/azi-org/repos").then((res) => {
  console.log(res);
});
