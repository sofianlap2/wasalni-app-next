import nc from 'next-connect';
import User from '../../../../models/User';
import jwt from 'jsonwebtoken';
const sgMail = require('@sendgrid/mail');
import bcrypt from 'bcryptjs';

sgMail.setApiKey(process.env.EMAIL_KEY);

const handler = nc();

handler.post(async (req,res) => {
    const {resetLink, newPass} = req.body;

    try {
        var decoded = jwt.verify(resetLink, process.env.JWT_SECRET);

        var salt = bcrypt.genSaltSync(10);
        var hashedNewPassword = bcrypt.hashSync(newPass, salt);

        if(decoded) {
            await User.findOneAndUpdate(
                { email: decoded.email },
                { password: hashedNewPassword },
                { new: true }
            );

            res.status(200).json({message: 'Your password has changed'})
        }
    } catch(err) {
        res.status(500).json({message: 'Invalid token'})
    }
});

export default handler;