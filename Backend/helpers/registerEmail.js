import nodemailer from 'nodemailer';

const registerEmail = async (data) => {
    var transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
        }
      });
    const {name, email, token} = data;
    const info = await transport.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Confirm your email',
        html: `
            <h1>Email Confirmation</h1>
            <h2>Hello ${name}</h2>
            <p>Thank you for subscribing. Please confirm your email by clicking on the following link</p>
            <a href='${process.env.FRONTEND_URL}/confirm-account/${token}'> Click here</a>
        `
    });
    console.log('Message sent: %s', info.messageId);
}

export default registerEmail;
