import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

// Not in use
export async function POST(req: Request) {
    try {
        const { name, email } = await req.json();

        // Basic validation
        if (!name || !email) {
            return NextResponse.json(
                { success: false, error: "Name and email are required" },
                { status: 400 }
            );
        }

        await resend.emails.send({
            from: process.env.EMAIL_FROM!,   // must be verified in Resend
            to: email,                        // recipient gets the congratulations
            subject: "🎉 Congrats! You got the Orange Tick",
            html: `
        <h2>Congratulations ${name}!</h2>
        <p>You are now officially an <b>Orange Tick</b> member of the Software Society.</p>
        <p>Thank you for being part of our community. Keep creating amazing software!</p>
        <p>— Software Society Team</p>
      `,
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Resend error:", error);
        return NextResponse.json(
            { success: false, error: "Failed to send congratulations email" },
            { status: 500 }
        );
    }
}

