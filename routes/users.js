const router = require('express').Router();
const auth = require('../middlewares/auth');

const {
  getUsers,
  getUser,
  createUser,
  updateAvatar,
  getCurrentUser,
} = require('../controllers/users');
const { login } = require('../controllers/login');
const { updateProfile } = require('../controllers/users');

router.post('/signup', createUser);
router.post('/signin', login);
router.get('/me', auth, getCurrentUser);
router.get('/', auth, getUsers);
router.get('/:userId', auth, getUser);
router.patch('/me', auth, updateProfile);
router.patch('/me/avatar', auth, updateAvatar);

module.exports = router;
