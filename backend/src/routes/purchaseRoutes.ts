import { Router } from 'express';
import { createPurchase, getPurchases } from '../controllers/purchaseController';
import { authenticateToken } from '../middlewares/authMiddleware';
import { authorizeRoles, enforceBaseScope } from '../middlewares/rbacMiddleware';

const router = Router();

router.use(authenticateToken);
router.use(authorizeRoles('ADMIN', 'LOGISTICS_OFFICER')); // only admins and log officers can buy
router.use(enforceBaseScope);

router.post('/', createPurchase);
router.get('/', getPurchases);

export default router;
