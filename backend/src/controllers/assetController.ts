import { Response } from 'express';
import { AuthRequest } from '../middlewares/authMiddleware';
import prisma from '../config/db';

export const getDashboardMetrics = async (req: AuthRequest, res: Response) => {
  try {
    const { baseId, equipmentTypeId, startDate, endDate } = req.query;

    const baseFilter = baseId ? Number(baseId) : undefined;
    const equipmentFilter = equipmentTypeId ? Number(equipmentTypeId) : undefined;
    const startFilter = startDate ? new Date(startDate as string) : undefined;
    
    // Purchases
    const purchases = await prisma.purchase.aggregate({
      _sum: { quantity: true },
      where: {
        baseId: baseFilter,
        equipmentTypeId: equipmentFilter,
        createdAt: { gte: startFilter }
      }
    });

    // Transfers In
    const transfersIn = await prisma.transfer.aggregate({
      _sum: { quantity: true },
      where: {
        destinationBaseId: baseFilter,
        equipmentTypeId: equipmentFilter,
        status: 'COMPLETED',
        createdAt: { gte: startFilter }
      }
    });

    // Transfers Out
    const transfersOut = await prisma.transfer.aggregate({
      _sum: { quantity: true },
      where: {
        sourceBaseId: baseFilter,
        equipmentTypeId: equipmentFilter,
        status: 'COMPLETED',
        createdAt: { gte: startFilter }
      }
    });

    const totalPurchases = purchases._sum.quantity || 0;
    const totalTransfersIn = transfersIn._sum.quantity || 0;
    const totalTransfersOut = transfersOut._sum.quantity || 0;
    const netMovement = totalPurchases + totalTransfersIn - totalTransfersOut;

    // For simplicity, opening balance could be 0 if we assume all history is from start
    // or we'd calculate prior to startDate
    const openingBalance = 0; 
    const closingBalance = openingBalance + netMovement;

    return res.status(200).json({
      openingBalance,
      purchases: totalPurchases,
      transfersIn: totalTransfersIn,
      transfersOut: totalTransfersOut,
      netMovement,
      closingBalance,
      expended: 0, // placeholder for expenditures
    });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};
