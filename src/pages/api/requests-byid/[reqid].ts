import nc from 'next-connect';
import Request from '../../../../models/Request';
import db from '../../../../utils/db';

const handler = nc();

handler.get(async (req: any, res: any) => {

    await db.connect();

    const { query: { reqid } } = req;

    const requestInfo = await Request.find({  user_id: reqid })

    await db.disconnect();

    return res.status(200).json(requestInfo)

});

export default handler;