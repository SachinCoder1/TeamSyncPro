import { BACKEND_URL } from "@/config";
import fetcher from "../fetcher";

// user server actions and mutations of next js

export const login = async (email: string, password: string) => {
  try {
    // const res = await fetch(BACKEND_URL + "/auth/login-email", {
    //     method: "POST",
    //     body: JSON.stringify({
    //       email: email,
    //       password,
    //     }),
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //   });

    const res = await fetcher(BACKEND_URL + "/auth/login-email", {
        method: "POST",
        body: JSON.stringify({
            email: email,
            password,
        }),
        headers: {
            "Content-Type": "application/json",
        },
        });
    const data = await res.json();
    console.log("data: ", data);
    return data;
  } catch (error) {
    console.log("error: ", error);
  }
};
