import mongoose from 'mongoose';

const priceSchema = new mongoose.Schema(
    {
        price: { type: Number, default: 1},
        adress: { type: String, default: '2045 Rue du Lac Turkana, Tunis, Tunisia'},
    },
    {
        timestamps: true,
    }
)

const Price = mongoose.models.Price || mongoose.model('Price', priceSchema);

export default Price;