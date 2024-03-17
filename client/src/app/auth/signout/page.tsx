'use client'

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { signOut } from "next-auth/react";

export default function SignoutPage() {
    // const session = getServerSession(authOptions);
    // if(session){
        signOut({redirect: true, callbackUrl: "/auth/signin"});
    // }
    return (
        <div>
        <h1>Signout</h1>
        </div>
    );
}