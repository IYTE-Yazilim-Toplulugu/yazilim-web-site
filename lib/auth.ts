import Login from "@/app/server/login";
import Register from "@/app/server/register";

export function handleAuthMessage(wnd:Window){
    if (typeof window === "undefined")
        return;
    wnd.onmessage = async (e) => {
        if (typeof e.data !== "string")
            return;

        const data = JSON.parse(e.data);

        let msg;

        if (data.isRegister ?? true){
            msg = await Register(data.body);
        }
        else{
            msg = await Login(data.body);
        }

        if (msg == null)
            window.location.href = "/";
        else
            window.location.href = (data.isRegister ?? true ? '/register?msg=' : '/login?msg=') + msg;

        console.log(msg);
    };
}