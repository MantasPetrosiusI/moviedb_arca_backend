import NodeCache from "node-cache";
import { Request, Response, NextFunction } from "express";

const cache = new NodeCache({ stdTTL: 3600 });

export function applyCache(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const cacheKey = req.originalUrl;

  if (cache.has(cacheKey)) {
    const cachedData = cache.get<any>(cacheKey);
    res.json(cachedData);
    return;
  }

  next();
}

export default cache;
