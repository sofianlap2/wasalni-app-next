import nc from 'next-connect';
import User from '../../../../models/User';
import db from '../../../../utils/db';
import { signToken } from '../../../../utils/auth';
const sgMail = require('@sendgrid/mail');
const nodemailer = require("nodemailer");

  
sgMail.setApiKey(process.env.EMAIL_KEY);

const handler = nc();

handler.post(async (req : any,res : any) => {
    await db.connect();
    const user = await User.findOne({ email: req.body.email });
    await db.disconnect();
    if( user ) {
        const token : any = signToken(user);

        try {
            // create reusable transporter object using the default SMTP transport
            let transporter = nodemailer.createTransport({
                host: "smtp.gmail.com",
                port: 465,
                secure: true, // use SSL
                auth: {
                    user: 'courrierrs2022@gmail.com', // generated ethereal user
                    pass: 'ALEIA2022', // generated ethereal password
                },
            });

            // send mail with defined transport object
            await transporter.sendMail({
                from: '"WASSALNI APP" <courrierrs2022@gmail.com>', // sender address
                to: user.email, // list of receivers
                subject: "Account reset password", // Subject line
                html: `<h2>Hey ${user.name} Please click on given link to activate your account</h2>
                    <a href="${process.env.PROD_LOCAL_URL}/reset-password/${token}">Reset password link</a>`,
            });

            return User.updateOne({resetLink: token}, function (err : any) {
                if(err) {
                    return res.status(400).json({ error : "reset password link error" })
                } else {
                    res.status(200).json({ error : "Check your email to change your password" })
                }
            }).clone();
            
        } catch (error) {
            console.log(error);
            res.status(401).send({ message: 'There was an error' });
        }
    } else {
        res.status(401).send({ message: 'This email is not registred yet ask an admin to add you' });
    }
});

export default handler;