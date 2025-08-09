"use server";

import { signOut } from "@/utils/user_server_util";
import { redirect } from "next/navigation";

// import { NextRequest, NextResponse } from "next/server";
// import { signOut } from "@/utils/user_server_util";
// import { revalidatePath } from "next/cache";
//
//
// // ######## SKILL ISSUE!!! ########
// export async function GET(req: NextRequest) {
//     await signOut();
//
//     revalidatePath('/', 'layout')
//     return NextResponse.redirect(new URL('/login?reload=true', req.url), {
//         status: 302
//     });
// }

export default async function LogOut() {

    await signOut();

    redirect("/login?reload=true")
}
