import { Response, NextFunction } from 'express';
import { AuthRequest } from './authMiddleware';

export const authorizeRoles = (...allowedRoles: string[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        message: "Access Denied: Insufficient authorization level."
      });
    }
    next();
  };
};

export const enforceBaseScope = (req: AuthRequest, res: Response, next: NextFunction) => {
  // Admins can see all bases; Commanders are scoped to their assigned base
  if (req.user && req.user.role === 'BASE_COMMANDER') {
    req.query.baseId = String(req.user.baseId);
    req.body.baseId = req.user.baseId; // Also restrict creation scoped to base
  }
  next();
};
