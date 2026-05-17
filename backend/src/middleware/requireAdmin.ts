import type { NextFunction, Request, Response } from "express";
import { verifyAdminSessionToken } from "@/lib/adminAuth";

export function requireAdmin(req: Request, res: Response, next: NextFunction): void {
  const token = req.cookies?.admin_session as string | undefined;
  if (!verifyAdminSessionToken(token)) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }
  next();
}
