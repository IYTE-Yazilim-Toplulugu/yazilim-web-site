import {NextRequest, NextResponse} from "next/server";
import {signOut} from "@/utils/user_util";
import {revalidatePath} from "next/cache";

export async function GET(req: NextRequest){
    await signOut();

    revalidatePath('/', 'layout')
    return NextResponse.redirect(new URL('/login?reload=true', req.url), {
        status: 302
    });
}