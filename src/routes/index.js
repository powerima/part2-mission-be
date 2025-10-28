import express from 'express';
import { studyRouter } from './study.js';
import { reactionRouter } from './reaction.js';
import { habitRouter } from './habit.js';

// 다른 라우터들도 필요에 따라 import 할 수 있습니다.

const router = express.Router();

router.use('/api/study', studyRouter);
router.use('/api/reaction', reactionRouter);
router.use('/api/habit', habitRouter);

export { router as indexRouter };
