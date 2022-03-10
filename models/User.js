import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
    {
        name: { type: String },
        email: { type: String, required: true, unique: true},
        password: { 
            type: String,
            minLength: 6,
            required: true,
            default: '123456789'
        },
        role: { 
            type: String, 
            required: true, 
            enum: ['Admin', 'Conductor', 'Passenger'],
            default: 'Passenger'
        },
        phoneNumber: { type: Number, default: +21656766170 },
        resetLink: {
            data: String,
            default:''
        }
    },
    {
        timestamps: true,
    }
)

const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;