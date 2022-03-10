import nc from 'next-connect';
import Price from "../../../../models/Price"
import db from '../../../../utils/db';

const handler = nc();

handler.patch(async (req : any,res : any) => {
    await db.connect();

    const { query: { adress } } = req;

    const newAdress = await Price.findOneAndUpdate(
        { _id: adress },
        { $set: {  adress: req.body.adress } },
        (err : any) => {
            if (err) {
                return res.status(500).json({message: err})
            }
            return res.status(200).json({message: 'adress updated'})
        }
    ).clone()
    await db.disconnect();
    return res.status(200).json(newAdress)
    });

export default handler;