import express from 'express'
import blogCtrl from '../controllers/blogCtrl'
import auth from '../middleware/auth'

const router = express.Router()

router.post('/blog', auth, blogCtrl.createBlog)

router.get('/home/blogs', blogCtrl.getHomeBlogs)

router.get('/blogs/category/:id', blogCtrl.getBlogsByCategoryId)

router.get('/blogs/user/:id', blogCtrl.getBlogsByUserId)

// Make a shortcut by created route in router
router.route('/blog/:id')
    .get(blogCtrl.getBlog)
    .put(auth, blogCtrl.updateBlog)
    .delete(auth, blogCtrl.deleteBlog)

router.get('/search/blogs', blogCtrl.searchBlogs)

export default router