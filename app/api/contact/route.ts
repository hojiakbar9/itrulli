import {NextResponse} from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(request: Request) {
    try {
        const { name, email, subject, message } = await request.json();

        const transporter = nodemailer.createTransport({
            host: process.env.EMAIL_SERVER_HOST,
            port: Number(process.env.EMAIL_SERVER_PORT) || 587,
            secure: (process.env.EMAIL_SERVER_PORT === '465'), // true for 465, false for other ports
            auth: {
                user: process.env.EMAIL_SERVER_USER,
                pass: process.env.EMAIL_SERVER_PASSWORD,
            },
        });

        const mailOptions = {
            from: `"${name}" <${process.env.EMAIL_SERVER_USER}>`, // sender address
            to: process.env.EMAIL_TO, // list of receivers
            replyTo: email,
            subject: `Kontaktformular: ${subject}`, // Subject line
            text: message, // plain text body
            html: `
                <h1>Neue Nachricht vom Kontaktformular</h1>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>E-Mail:</strong> ${email}</p>
                <p><strong>Betreff:</strong> ${subject}</p>
                <hr />
                <p>${message.replace(/\n/g, '<br>')}</p>
            `,
        };

        await transporter.sendMail(mailOptions);

        return NextResponse.json({ message: "Email sent successfully!" }, { status: 200 });

    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Failed to send email." }, { status: 500 });
    }
}
