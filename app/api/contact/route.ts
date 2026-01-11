import {NextResponse} from 'next/server'
import nodemailer from 'nodemailer'

const sanitize = (str: string) => {
    if(!str) return '';
    return str.replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

const validate = (data: {name: string, email: string, subject: string, message: string}) => {
    if (!data.name || !data.email || !data.subject || !data.message) {
        return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
        return false;
    }
    return true;
}

export async function POST(request: Request) {
    try {
        const { name, email, subject, message } = await request.json();

        if (!validate({ name, email, subject, message })) {
            return NextResponse.json({ message: "Invalid input." }, { status: 400 });
        }

        const sanitizedName = sanitize(name);
        const sanitizedSubject = sanitize(subject);
        const sanitizedMessage = sanitize(message);

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
            from: `"${sanitizedName}" <${process.env.EMAIL_SERVER_USER}>`, // sender address
            to: process.env.EMAIL_TO, // list of receivers
            replyTo: email,
            subject: `Kontaktformular: ${sanitizedSubject}`, // Subject line
            text: sanitizedMessage, // plain text body
            html: `
                <h1>Neue Nachricht vom Kontaktformular</h1>
                <p><strong>Name:</strong> ${sanitizedName}</p>
                <p><strong>E-Mail:</strong> ${email}</p>
                <p><strong>Betreff:</strong> ${sanitizedSubject}</p>
                <hr />
                <p>${sanitizedMessage.replace(/\n/g, '<br>')}</p>
            `,
        };

        await transporter.sendMail(mailOptions);

        return NextResponse.json({ message: "Email sent successfully!" }, { status: 200 });

    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Failed to send email." }, { status: 500 });
    }
}
