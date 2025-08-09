import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'
import { SupabaseClient, User } from "@supabase/supabase-js";
import { createServer } from './server';

export async function updateSession(request: NextRequest) {
    let supabaseResponse = NextResponse.next({
        request,
    })

    const supabase = await createServer()

    // Do not run code between createServerClient and
    // supabase.auth.getUser(). A simple mistake could make it very hard to debug
    // issues with users being randomly logged out.
    // IMPORTANT: DO NOT REMOVE auth.getUser()

    const {
        data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
        // no user, potentially respond by redirecting the user to the login page
        const url = request.nextUrl.clone()
        url.pathname = '/login'
        return NextResponse.redirect(url)
    }
    else {
        if (!await checkAdministrator(supabase, user)) {
            console.log("hooop");
            /*return new NextResponse(null, {
                status: 403
            })*/
            return NextResponse.error();
        }
    }

    return supabaseResponse
}


async function checkAdministrator(supabase: SupabaseClient, user: User) {
    console.log(user)
    const info = await supabase
        .from("user_infos")
        .select("is_admin")
        .filter("id", "eq", user.id);

    console.log(info);
    if (info.error || info.data.length === 0)
        return false;

    return info.data.at(0)!.is_admin ?? false;
}
