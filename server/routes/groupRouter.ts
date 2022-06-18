import express from 'express'
import authController from '../controllers/groupController'
import authMiddleware from '../middleware/auth'

const router = express.Router()

router.get('/all-groups', authMiddleware, authController.getAll)

router.get('/group/:id', authMiddleware, authController.getOne)

router.post('/group', authMiddleware, authController.createOne)

router.put('/group', authMiddleware, authController.updateOne)

router.delete('/group/:id', authMiddleware, authController.deleteOne)

export default router