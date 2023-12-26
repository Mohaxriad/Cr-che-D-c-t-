const nodeMailer = require('nodemailer');
// setup node mailer to send email using gmail
const sendEmail = async (options) => {
    // 1) create a transporter
    const transporter = nodeMailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USERNAME,
            pass: process.env.EMAIL_PASSWORD
        },
        tls: {
            rejectUnauthorized: false
        }
    });
    // 2) define the email options
    const mailOptions = {
        from: process.env.EMAIL_FROM,
        to: options.to,
        subject: options.subject,
        html: options.text
    };
    // 3) actually send the email
    await transporter.sendMail(mailOptions);

}

module.exports = sendEmail;