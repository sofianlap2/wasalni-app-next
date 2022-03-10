import nc from 'next-connect';
import Price from "../../../../models/Price"
import db from '../../../../utils/db';

const handler = nc();

handler.patch(async (req : any,res : any) => {
    await db.connect();

    const { query: { price } } = req;

    const newPrice = await Price.findOneAndUpdate(
        { _id: price },
        { $set: { price: req.body.price } },
        (err : any) => {
            if (err) {
                return res.status(500).json({message: err})
            }
            return res.status(200).json({message: 'Price updated'})
        }
    ).clone()
    await db.disconnect();
    return res.status(200).json(newPrice)
    });

export default handler;