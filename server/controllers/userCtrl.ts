import { Request, Response } from "express"
import { IReqAuth } from '../config/interface'
import Users from '../models/userModel'
import bcrypt from 'bcrypt'


const userCtrl = {
    updateUser: async (req: IReqAuth, res: Response) => {
        if(!req.user) return res.status(400).json({msg: "Xác thực không hợp lệ."})

        try {
            const { avatar, name } = req.body

            await Users.findOneAndUpdate({_id: req.user._id}, {
                avatar, name
            })

            res.json({msg: 'Cập nhập thành công!'})
        } catch (err: any) {
            return res.status(500).json({msg: err.message})
        }
    },

    resetPassword: async (req: IReqAuth, res: Response) => {
        if(!req.user) return res.status(400).json({msg: "Xác thực không hợp lệ."})

        if(req.user.type !== 'register') 
            return res.status(400).json({
                msg: `Tài khoản đăng nhập bằng ${req.user.type} không thể sử dụng chức năng này.`}) 

        try {
            const { password } = req.body
            const passwordHash = await bcrypt.hash(password, 12)

            await Users.findOneAndUpdate({_id: req.user._id}, {
                password: passwordHash
            })

            res.json({msg: 'Thay đổi mật khẩu thành công!'})
        } catch (err: any) {
            return res.status(500).json({msg: err.message})
        }
    },

    getUser: async (req: Request, res: Response) => { 
        try {
            const user = await Users.findById(req.params.id).select('-password')
            res.json(user)
        } catch (err: any) {
            return res.status(500).json({msg: err.message})
        }
    }
}

export default userCtrl;