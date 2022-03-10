import mongoose from 'mongoose';

const requestSchema = new mongoose.Schema(
    {
        date: { type: String, required: true },
        time: { type: String, required: true },
        road: { type: String, required: true },
        from: { type: String, required: true },
        to: { type: String, required: true },
        priceTag: { type: Number, default: 20, required: true },
        status: {
            type: String,
            enum: ['Pending', 'Ongoing', 'Past'],
            default: 'Pending'
        },
        user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        acceptebby: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: '111122223333444455556666' }
    },
    {
        timestamps: true,
    }
)

const Request = mongoose.models.Request || mongoose.model('Request', requestSchema);

export default Request;