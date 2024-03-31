import NextAuth from "next-auth";

const stepType =
  "SIGNED_UP" |
  "PROFILE_SETUP" |
  "WORKSPACE_CREATED" |
  "PROJECT_CREATED" |
  "SECTION_CREATED" |
  "TASK_CREATED" |
  "INVITED_PEOPLE_OPTIONAL" |
  "COMPLETED";
declare module "next-auth" {
  interface Session {
    user: {
      id: number;
      email: string;
      name: string;
      emailVerified: "VERIFIED" | "NOT_VERIFIED";
      onboarding: {
        done: boolean;
        step: stepType;
      };
      workspace: string;
    };

    // secret_tokens: {
    accessToken: {
      token: string;
      expiresIn: number;
    };
    //   refreshToken: string;
    //   expiresIn: number;
    // };
  }
}

import { JWT } from "next-auth/jwt";

declare module "next-auth/jwt" {
  interface JWT {
    user: {
      id: number;
      email: string;
      name: string;
      emailVerified: "VERIFIED" | "NOT_VERIFIED";
      onboarding: {
        done: boolean;
        step: stepType;
      };
      workspace: string;

    };

    secret_tokens: {
      accessToken: {
        token: string;
        expiresIn: number;
      };
      refreshToken: string;
      expiresIn: number;
    };
  }
}
