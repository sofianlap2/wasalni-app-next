import nc from 'next-connect';
import User from '../../../../models/User';
import db from '../../../../utils/db';
import bcrypt from "bcryptjs";

const handler = nc();

handler.post(async (req : any, res: any) => {
    await db.connect();

    const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 10),
        role: req.body.role,
    })
    newUser.save().then(() => {
        return res.status(200).json({
            message: 'User added succesfully',
            newUser
        })
    }).catch(
        (error : any) => {
            res.status(500).json({
                message: error
            });
        }
    );
    await db.disconnect();

});

export default handler;