import { Router } from 'express';
import { createTransfer, getTransfers } from '../controllers/transferController';
import { authenticateToken } from '../middlewares/authMiddleware';
import { authorizeRoles, enforceBaseScope } from '../middlewares/rbacMiddleware';

const router = Router();

router.use(authenticateToken);
// Base Commanders can see transfers for their base, Logistics can initiate
router.use(enforceBaseScope);

router.post('/', authorizeRoles('ADMIN', 'LOGISTICS_OFFICER'), createTransfer);
router.get('/', getTransfers);

export default router;
