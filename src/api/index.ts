import express from 'express';

import MessageResponse from '../interfaces/MessageResponse';
import nade from './nade/nade.route'
const router = express.Router();

router.get<{}, MessageResponse>('/', (req, res) => {
  res.json({
    message: 'API here!',
  });
});

router.use('/nade', nade)

export default router;
