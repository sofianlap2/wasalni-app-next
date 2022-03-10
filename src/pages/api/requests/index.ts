import nc from 'next-connect';
import Request from '../../../../models/Request';
import db from '../../../../utils/db';

const handler = nc();

handler.get(async (req  ,res : any) => {
    console.log(req)
    await db.connect();
    const requests = await Request.find()
    await db.disconnect();
    
    return res.status(200).json(requests)
});

export default handler;