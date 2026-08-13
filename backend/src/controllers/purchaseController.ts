import { Response } from 'express';
import { AuthRequest } from '../middlewares/authMiddleware';
import prisma from '../config/db';

export const createPurchase = async (req: AuthRequest, res: Response) => {
  try {
    const { baseId, equipmentTypeId, quantity } = req.body;
    const userId = req.user?.userId;

    const purchase = await prisma.$transaction(async (tx) => {
      const p = await tx.purchase.create({
        data: {
          baseId: Number(baseId),
          equipmentTypeId: Number(equipmentTypeId),
          quantity: Number(quantity),
        }
      });

      await tx.auditLog.create({
        data: {
          userId,
          action: 'PURCHASE',
          details: `Purchased ${quantity} items (Type: ${equipmentTypeId}) for Base #${baseId}`,
        }
      });

      return p;
    });

    res.status(201).json({ message: "Purchase completed successfully", purchase });
  } catch (error: any) {
    res.status(500).json({ error: "Purchase failed: " + error.message });
  }
};

export const getPurchases = async (req: AuthRequest, res: Response) => {
  try {
    const baseId = req.query.baseId ? Number(req.query.baseId) : undefined;
    const purchases = await prisma.purchase.findMany({
      where: { baseId },
      include: { base: true, equipmentType: true },
      orderBy: { createdAt: 'desc' },
      take: 50
    });
    res.json(purchases);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
