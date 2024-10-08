import { BACKEND_URL } from "@/config";
import { getServerAuth } from "@/lib/auth";

import { getQueryParam } from "@/lib/utils";
import { NextAuthOptions } from "next-auth";
import { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";

async function refreshToken(token: JWT): Promise<JWT> {
  const res = await fetch(BACKEND_URL + "/auth/refresh", {
    method: "POST",
    headers: {
      authorization: `Refresh ${token.secret_tokens.refreshToken}`,
    },
  });

  const response = await res.json();

  return {
    ...token,
    secret_tokens: {
      accessToken: {
        token: response.data.secret_tokens.accessToken.token,
        expiresIn: response.data.secret_tokens.accessToken.expiresIn,
      },
      refreshToken: token.secret_tokens.refreshToken,
      expiresIn: token.secret_tokens.expiresIn,
    },
  };
}

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: "/auth/signin",
    signOut: "/auth/signout",
    // error: "/auth/signin",
    newUser: "/onboarding/welcome",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: {
          label: "Username",
          type: "text",
          placeholder: "jsmith",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        if (!credentials?.username || !credentials?.password) return null;
        try {
          const { username, password } = credentials;
          const res = await fetch(BACKEND_URL + "/auth/login-email", {
            method: "POST",
            body: JSON.stringify({
              email: username,
              password,
            }),
            headers: {
              "Content-Type": "application/json",
            },
          });

          const user = await res.json();

          if (res.status == 401) {
            return null;
          }
          // const invitationToken = getQueryParam(
          //   (credentials as any).callbackUrl,
          //   "invitation_token"
          // );
          // if (invitationToken) {
          //   return { ...user.data, invitationToken };
          // }
          return user.data;
        } catch (error) {
          return false;
        }
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (trigger == "update") {
        if (session?.info) {
          token.user.workspace = session.info;
        }
      }
      if (user) return { ...token, ...user };
      if (new Date().getTime() < token.secret_tokens.accessToken.expiresIn)
        return token;

      return await refreshToken(token);
    },

    async session({ token, session, trigger, newSession }) {
      if (trigger === "update") {
        if (newSession.info) {
          session.user.workspace = newSession.info;
        }
        if (newSession.onboarding === "COMPLETED") {
          session.user.onboarding.step = "COMPLETED";
          session.user.onboarding.done = true;
        }
      } else {
        session.user = token.user;
        session.accessToken = token.secret_tokens.accessToken;
      }

      return session;
    },
  },
};
