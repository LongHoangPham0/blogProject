import mongoose from 'mongoose'

import { IUser } from '../config/interface'

const useSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Nhập họ và tên của bạn.'],
        trim: true,
        maxLength: [20, 'Họ và tên chỉ dài tối đa 20 ký tự!']
    },
    account: {
        type: String,
        required: [true, 'Nhập địa chỉ email hoặc số điện thoại của bạn.'],
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Nhập mật khẩu.']
    },
    avatar: {
        type: String,
        default:'https://www.google.com/url?sa=i&url=https%3A%2F%2Freactjs.org%2F&psig=AOvVaw2f9RrczjiGtsQ7Dfx8f1Z1&ust=1632923497002000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCKiLkJzoofMCFQAAAAAdAAAAABAJ'
    }, 
    role: {
        type: String,
        default: 'user' //admin
    },
    type: {
        type: String,
        default:'register' //login
    },
    rf_token: {
        type: String,
        select: false
    }
}, {
    timestamps: true
})

export default mongoose.model<IUser>('user', useSchema)