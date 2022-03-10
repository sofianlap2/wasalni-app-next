import nc from 'next-connect';
import User from '../../../../models/User';
import db from '../../../../utils/db';

const handler = nc();

handler.patch(async (req :any, res: any) => {
    const { query: { id } } = req;

    await db.connect();
    await User.findOneAndUpdate(
        { _id: id },
        { $set: { name: req.body.name, role: req.body.role, email: req.body.email } },
        (err : any) => {
            if (err) {
                return res.status(500).json({message: err})
            }
            return res.status(200).json({message: 'User updated'})
        }
    ).clone()
    await db.disconnect();
});

handler.get(async (req :any, res: any) => {
    const { query: { id } } = req;

    await db.connect();
    const user = await User.findOne({_id: id});
    await db.disconnect();
    return res.status(200).json(user);
});

export default handler;