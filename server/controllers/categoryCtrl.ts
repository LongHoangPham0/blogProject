import { Request, Response } from 'express'

import { IReqAuth } from '../config/interface'

import Categories from '../models/categoryModel'
import Blogs from '../models/blogModel'

const categoryCtrl = {
  createCategory: async (req: IReqAuth, res: Response) => {
    if(!req.user) return res.status(400).json({msg: "Xác thực không hợp lệ."})

    if(req.user.role !== 'admin')
      return res.status(400).json({msg: "Xác thực không hợp lệ."})

    try {
      const name = req.body.name.toLowerCase()

      const newCategory = new Categories({ name })
      await newCategory.save()

      res.json({ newCategory })
    } catch (err: any) {
      let errMsg;

      if(err.code === 11000){
        errMsg = Object.values(err.keyValue)[0] + " đã tồn tại."
      }else{
        let name = Object.keys(err.errors)[0]
        errMsg = err.errors[`${name}`].message
      }

      return res.status(500).json({ msg: errMsg })
    }
  },

  getCategories: async (req: Request, res: Response) => {
    try {
      const categories = await Categories.find().sort("-createdAt")
      res.json({ categories })
    } catch (err: any) {
      return res.status(500).json({ msg: err.message })
    }
  },

  updateCategory: async (req: IReqAuth, res: Response) => {
    if(!req.user) return res.status(400).json({msg: "Xác thực không hợp lệ."})

    if(req.user.role !== 'admin')
      return res.status(400).json({msg: "Xác thực không hợp lệ."})

    try {
      const category = await Categories.findOneAndUpdate({
        _id: req.params.id
      }, { name: (req.body.name).toLowerCase() })

      res.json({ msg: "Cập nhập thành công!" })
    } catch (err: any) {
      return res.status(500).json({ msg: err.message })
    }
  },
  
  deleteCategory: async (req: IReqAuth, res: Response) => {
    if(!req.user) return res.status(400).json({msg: "Xác thực không hợp lệ."})

    if(req.user.role !== 'admin')
      return res.status(400).json({msg: "Xác thực không hợp lệ."})

    try {
      const blog = await Blogs.find({category: req.params.id})
      
      if(blog)
      return res.status(400).json({
        msg: "Không thể xóa! Thể loại này vẫn còn bài viết."
      })

      const category = await Categories.findByIdAndDelete(req.params.id)
        if(!category) return res.status(400).json({msg: "Thể loại không tồn tại."})

      res.json({ msg: "Xóa thành công!" })
    } catch (err: any) {
      return res.status(500).json({ msg: err.message })
    }
  }
}


export default categoryCtrl;