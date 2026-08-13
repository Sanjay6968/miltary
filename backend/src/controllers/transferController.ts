import { Response } from 'express';
import { AuthRequest } from '../middlewares/authMiddleware';
import prisma from '../config/db';

export const createTransfer = async (req: AuthRequest, res: Response) => {
  try {
    const { sourceBaseId, destinationBaseId, equipmentTypeId, quantity } = req.body;
    const userId = req.user?.userId;

    if (!userId) throw new Error("Unauthorized");
    
    if (sourceBaseId === destinationBaseId) {
      return res.status(400).json({ error: "Source and destination cannot be the same base."});
    }

    const transfer = await prisma.$transaction(async (tx) => {
      const t = await tx.transfer.create({
        data: {
          sourceBaseId: Number(sourceBaseId),
          destinationBaseId: Number(destinationBaseId),
          equipmentTypeId: Number(equipmentTypeId),
          quantity: Number(quantity),
          initiatedById: userId,
          status: 'COMPLETED' // Simplified for demo
        }
      });

      await tx.auditLog.create({
        data: {
          userId,
          action: 'TRANSFER',
          details: `Transferred ${quantity} items (Type: ${equipmentTypeId}) from Base #${sourceBaseId} to Base #${destinationBaseId}`,
        }
      });

      return t;
    });

    res.status(201).json({ message: "Transfer completed successfully", transfer });
  } catch (error: any) {
    res.status(500).json({ error: "Transfer failed: " + error.message });
  }
};

export const getTransfers = async (req: AuthRequest, res: Response) => {
  try {
    const baseId = req.query.baseId ? Number(req.query.baseId) : undefined;
    const transfers = await prisma.transfer.findMany({
      where: baseId ? {
        OR: [
          { sourceBaseId: baseId },
          { destinationBaseId: baseId }
        ]
      } : undefined,
      include: { sourceBase: true, destinationBase: true, equipmentType: true, initiatedBy: true },
      orderBy: { createdAt: 'desc' },
      take: 50
    });
    res.json(transfers);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
