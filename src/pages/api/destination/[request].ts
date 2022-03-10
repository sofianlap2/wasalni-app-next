import nc from 'next-connect';
import Request from '../../../../models/Request';
import db from '../../../../utils/db';
import User from '../../../../models/User';


const handler = nc();

handler.post(async (req: any, res: any) => {
    await db.connect();

    const { query: { request } } = req;

    const newRequest = new Request({
        date: req.body.date,
        time: req.body.time,
        road: req.body.road,
        from: req.body.from,
        to: req.body.to,
        priceTag: req.body.priceTag,
        status: req.body.status,
        acceptedby: req.body.acceptebby,
        user_id: request
    })

    User.findById(request, function (err: any, docs: any) {
        if (err) {
            return res.status(500).json(err);
        }
        else {
            newRequest.save().then(() => {
                return res.status(200).json({
                    message: 'Request added succesfully',
                    newRequest,
                    userReq: docs
                })
            }).catch(
                (error: any) => {
                    res.status(500).json({
                        message: error
                    });
                }
            );
        }
    })


    await db.disconnect();


});


export default handler;