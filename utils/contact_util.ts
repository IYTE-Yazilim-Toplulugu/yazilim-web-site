import { Resend } from 'resend'
import { NextResponse } from 'next/server'

const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_API_KEY)

export async function POST(req: Request) {
    const body = await req.json()
    const { name, email, subject, message } = body

    try {
        const data = await resend.emails.send({
            from: 'gizlikedi.domain.com', // This should be a valid email address
            to: ['gizlikedi1090@gmail.com'],
            replyTo: email,
            subject: subject,
            text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
        })

        return NextResponse.json({ success: true })
    } catch (error) {
        return NextResponse.json({ error: 'Failed to send email' }, { status: 500 })
    }
}
