/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-var-requires */
// eslint-disable-next-line prettier/prettier
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import Qs from "qs";
import mitt from "mitt";

// const serverUrl = "http://101.200.43.108:9000";
const serverUrl = "http://localhost:9000";

const bus = mitt();

function trans(word: string): Promise<string> {
  for (let i = word.length - 1; i >= 0; i--) {
    word = word.replace("\n", "");
  }
  return new Promise((resolve) => {
    axios
      .request({
        method: "POST",
        url: serverUrl + "/fanyi",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        data: Qs.stringify({
          word: word,
        }),
      })
      .then((res) => {
        resolve(JSON.parse(res.data.data).trans_result[0].dst);
      })
      .catch((err) => {
        resolve(JSON.stringify(err));
      });
  });
}

function getDate(): string {
  const date = new Date();
  return (
    date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate()
  );
}

async function GetInfo(): Promise<any> {
  return new Promise((resolve, reject) => {
    const token = localStorage.getItem("userToken");
    if (token != null) {
      axios({
        method: "get",
        url: serverUrl + "/user/info",
        headers: {
          Authorization: "Bearer " + token,
        },
      })
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    } else {
      reject("no token");
    }
  });
}
type Method =
  | "get"
  | "GET"
  | "delete"
  | "DELETE"
  | "head"
  | "HEAD"
  | "options"
  | "OPTIONS"
  | "post"
  | "POST"
  | "put"
  | "PUT"
  | "patch"
  | "PATCH"
  | "purge"
  | "PURGE"
  | "link"
  | "LINK"
  | "unlink"
  | "UNLINK";
function request(
  api: string,
  mode: Method,
  isVerify: boolean,
  datas?: any
): Promise<any> {
  const token = localStorage.getItem("userToken");
  if (isVerify) {
    return axios({
      method: mode,
      url: serverUrl + api,
      headers: {
        Authorization: "Bearer " + token,
      },
      data: Qs.stringify(datas),
    });
  } else {
    return axios({
      method: mode,
      url: serverUrl + api,
      data: Qs.stringify(datas),
    });
  }
}

export { GetInfo, request, trans, getDate, bus };
