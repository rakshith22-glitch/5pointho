
import express from 'express';
import { registerUser, becomeMember, cancelMembership, getUserProfile, loginUser } from '../controllers/userController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile', protect, getUserProfile);
router.put('/become-member', protect, becomeMember);
router.put('/cancel-membership', protect, cancelMembership);

export default router;
