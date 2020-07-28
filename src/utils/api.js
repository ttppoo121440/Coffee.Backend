import { get } from "@/plugins/Axios";

/**
 * 測試
 */

function getData() {
  return get("https://randomuser.me/api/?results=20&#8243");
}

function test() {
  console.log("test");
}

export {
  getData,
  test,
};
