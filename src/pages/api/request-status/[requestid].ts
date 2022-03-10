import nc from 'next-connect';
import Request from '../../../../models/Request';
import User from '../../../../models/User';
import db from '../../../../utils/db';

const handler = nc();

handler.get(async (req: any, res: any) => {
    await db.connect();

    const { query: { requestid } } = req;

    const requestInfo = await Request.findOne({ _id: requestid })

    await db.disconnect();
    return res.status(200).json(requestInfo)
});

handler.patch(async (req: any, res: any) => {
    await db.connect();

    const { query: { requestid } } = req;
    //const acceptedById = req.body.acceptebby;

    const userAccept = await User.findOne({ _id: req.body.acceptebby })
    await Request.findOneAndUpdate(
        { _id: requestid },
        { $set: { status: req.body.status, acceptebby: req.body.acceptebby } },
        (err: any) => {
            if (err) {
                return res.status(500).json({ message: err })
            }
            return res.status(200).json({ message: 'status updated', userAccept })
        }
    ).clone()

    await db.disconnect();
});

export default handler;