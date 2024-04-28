import nodemailer from 'nodemailer';

const forgetPassword = async (data) => {
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
        subject: 'Reset your password',
        html: `
            <h1>Reset Password</h1>
            <h2>Hello ${name}</h2>
            <p>Click the following link to restablish your password</p>
            <a href='${process.env.FRONTEND_URL}/forget-password/${token}'> Reset password </a>
        `
    });
    console.log('Message sent: %s', info.messageId);
}

export default forgetPassword;
