import express from 'express';

import MessageResponse from '../interfaces/MessageResponse';
import nade from './nade/nade.route'
import startarea from './startarea/startarea.route'
const router = express.Router();

router.get<{}, MessageResponse>('/', (req, res) => {
  res.json({
    message: 'API here!',
  });
});

router.use('/nade', nade)
router.use('/startarea', startarea)

export default router;
