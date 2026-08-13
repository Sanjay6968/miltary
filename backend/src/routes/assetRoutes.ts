import { Router } from 'express';
import { getDashboardMetrics } from '../controllers/assetController';
import { authenticateToken } from '../middlewares/authMiddleware';
import { authorizeRoles, enforceBaseScope } from '../middlewares/rbacMiddleware';

const router = Router();

router.use(authenticateToken);

router.get('/dashboard', enforceBaseScope, getDashboardMetrics);

export default router;
