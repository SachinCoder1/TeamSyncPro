"use server";

import { BACKEND_URL } from "@/config";

/**
 * Custom fetcher that abstracts away common headers and method selection.
 * @param {string} url - The endpoint URL, appended to the backend base URL.
 * @param {object} [options] - Optional settings: method, body, additional headers.
 * @returns {Promise<any>} - The parsed JSON response from the fetch request.
 */
export async function fetcher(url: string, options = {} as any) {
  const {token, body, ...rest } = options;
  console.log("token: ", token);

  // Determine the method based on the presence of a body or use the method specified in options.
  const method = options.method || (body ? "POST" : "GET");

  // Get the access token.
  // const accessToken = (await getServerAuth()).accessToken.token;

  // Construct the full URL.
  const fullUrl = `${BACKEND_URL}${url}`;

  // Default headers
  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
    ...rest.headers, // Allow overriding and addition of headers
  };

  const fetchOptions: any = {
    method,
    headers,
    ...rest,
  };

  // If there's a body, stringify it and include in the fetch options.
  if (body) {
    fetchOptions.body = JSON.stringify(body);
  }

  const response = await fetch(fullUrl, fetchOptions);
  console.log("response: ", response);
  // if (response.ok === false) {
  //   throw new Error(`Network response was not ok: ${response.statusText}`);
  // }

  return response.json();
}
