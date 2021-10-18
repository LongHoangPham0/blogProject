import mongoose from 'mongoose'
import { IBlog } from '../config/interface'

const blogSchema = new mongoose.Schema({
    user: { type: mongoose.Types.ObjectId, ref: 'user' },
    title: {
        type: String,
        require: true,
        trim: true,
        minlength: 10,
        maxLength: 50
    },

    content: {
        type: String,
        require: true,
        minlength: 50,
        maxLength: 2000
    },

    description: {
        type: String,
        require: true,
        trim: true,
        minlength: 10,
        maxLength: 2000
    },

    thumbnail:{
        type: String,
        require: true
    },

    category: { type: mongoose.Types.ObjectId, ref: 'category' }
}, {
    timestamps: true
})

export default mongoose.model<IBlog>('blog', blogSchema)