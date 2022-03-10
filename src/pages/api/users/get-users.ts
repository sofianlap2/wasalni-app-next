import nc from 'next-connect';
import User from '../../../../models/User';
import db from '../../../../utils/db';

const handler = nc();

handler.get(async (req ,res : any) => {
    await db.connect();
    const users = await User.find()
    await db.disconnect();
    
    return res.status(200).json(users)
});

export default handler;