import axios, { create } from "axios";
import { store } from "../reducers/store";
export const HTTP_METHODS = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  DELETE: "DELETE",
};

/**
 * axios object
 */
const API = create({
  timeout: 60000,
});

/**
 * To perform api from class where this function/method is imported,
 * and send back completion in resolve or reject based on api response.
 */
export const request = (
  url: any,
  httpMethod: any,
  params: any,
  header: any,
  isWithToken: boolean
) =>
  new Promise(async (resolve, reject) => {
    try {
      const tokenObj = isWithToken
        ? {
            Authorization: `Bearer ${
              store.getState()?.LoginReducer?.accessToken
            }` /*the token is a variable which holds the token */,
          }
        : {};
      const configObj = {
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
          ...header,
          ...tokenObj,
        },
      };
      console.log("<><><><><> start request <><><><><>");
      console.log("<><><><><> url <><><><><>", url);
      console.log("<><><><><> httpMethod <><><><><>", httpMethod);
      console.log("<><><><><> configObj <><><><><>", configObj);
      console.log("<><><><><> params <><><><><>", JSON.stringify(params));
      console.log("<><><><><> end request <><><><><>");

      switch (httpMethod) {
        // GET
        case HTTP_METHODS.GET:
          doGet(url, resolve, reject, configObj);
          break;

        // POST
        case HTTP_METHODS.POST:
          doPost(url, params, resolve, reject, configObj);
          break;

        // PUT
        case HTTP_METHODS.PUT:
          doPut(url, params, resolve, reject, configObj);
          break;

        // DELETE
        case HTTP_METHODS.DELETE:
          doDelete(url, params, resolve, reject, configObj);
          break;
      }
    } catch (error) {
      reject(error);
    }
  });

/**
 *  This function is used to parse response and send completion to handle resolve and reject value for parent Promise.
 * We can consider it as a child promise
 * @param {*} response
 */
export const parseResponse = (response: any) =>
  new Promise(async (parsedResponse) => {
    const isSuccess =
      response.status === 200 || response.status === 201 ? true : false; // 202 is used for Knet-checkout
    if (isSuccess) {
      parsedResponse({ isSuccess: true, response: response });
    } else {
      let message = "SOMETHING_WENT_WRONG";
      console.log("responseJSON-->");
      if (response != null && response.message) {
        message = response.message;
      }
      parsedResponse({ isSuccess: false, message: message });
    }
  });

/***
 * This function is used for service request with GET as request type
 * and send back completion in resolve or reject based on parent Promise.
 * @param {*} url
 * @param {*} resolve
 * @param {*} reject
 * @param {*} config
 */
const doGet = (url: any, resolve: any, reject: any, configObj: any) => {
  API.get(url, configObj)
    .then((response: any) => {
      parseResponse(response).then((parsedResponse: any) => {
        console.log("do Get parsedResponse-->", parsedResponse);
        if (parsedResponse.isSuccess) {
          resolve({ response: parsedResponse.response });
        } else {
          reject(parsedResponse.message);
        }
      });
    })
    .catch((error: any) => {
      console.log("do Get Error-->", error);
      reject(error);
    });
};

/***
 * This function is used for service request with POST as request type
 * and send back completion in resolve or reject based on parent Promise.
 * @param {*} url
 * @param {*} resolve
 * @param {*} reject
 * @param {*} config
 */
const doPost = async (
  url: any,
  params: any,
  resolve: any,
  reject: any,
  config = {}
) => {
  API.post(url, params, config)
    .then((response: any) => {
      console.log("RESPONSE FROM DOPOST: ", response);
      parseResponse(response).then((parsedResponse: any) => {
        if (parsedResponse.isSuccess) {
          resolve({ response: parsedResponse.response });
        } else {
          reject(parsedResponse.message);
        }
      });
    })
    .catch((error: any) => {
      reject(error);
    });

  // let response = await fetch(url, {
  //   method: "POST",
  //   body: params instanceof FormData ? params : JSON.stringify(params),
  //   ...config,
  // });
  // let responseJSON = response.json();
  // if (response.status == 200) {
  //   resolve({ response: responseJSON });
  // } else {
  //   reject(responseJSON, response.status);
  // }
};

/***
 * This function is used for service request with PUT as request type
 * and send back completion in resolve or reject based on parent Promise.
 * @param {*} url
 * @param {*} resolve
 * @param {*} reject
 * @param {*} config
 */
const doPut = (
  url: any,
  params: any,
  resolve: any,
  reject: any,
  config = {}
) => {
  API.put(url, params, config)
    .then((response: any) => {
      parseResponse(response).then((parsedResponse: any) => {
        if (parsedResponse.isSuccess) {
          resolve({ response: parsedResponse.response });
        } else {
          reject(parsedResponse.message);
        }
      });
    })
    .catch((error: any) => {
      reject(error);
    });
};

/***
 * This function is used for service request with DELETE as request type
 * and send back completion in resolve or reject based on parent Promise.
 * @param {*} url
 * @param {*} resolve
 * @param {*} reject
 * @param {*} config
 */
const doDelete = (
  url: any,
  params: any,
  resolve: any,
  reject: any,
  config = {}
) => {
  API.delete(url, config)
    .then((response: any) => {
      parseResponse(response).then((parsedResponse: any) => {
        console.log(`url ${url} response => ${JSON.stringify(response)}`);
        if (parsedResponse.isSuccess) {
          resolve({ response: parsedResponse.response });
        } else {
          reject(parsedResponse);
        }
      });
    })
    .catch((error: any) => {
      reject(error.response);
    });
};
