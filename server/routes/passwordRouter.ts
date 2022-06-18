import express from 'express'
import passwordController from '../controllers/passwordController'
import authMiddleware from '../middleware/auth'

const router = express.Router()

router.get('/all-passwords', authMiddleware, passwordController.getAll)

router.get('/password/:id', authMiddleware, passwordController.getOne)

router.post('/password', authMiddleware, passwordController.createOne)

router.put('/password', authMiddleware, passwordController.updateOne)

router.delete('/password/:id', authMiddleware, passwordController.deleteOne)

export default router