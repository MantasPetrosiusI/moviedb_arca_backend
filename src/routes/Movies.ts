import express from "express";
import createHttpError from "http-errors";
import NodeCache from "node-cache";
import { Request, Response, NextFunction } from "express";

const moviesRouter = express.Router();
const apiUrl = "http://www.omdbapi.com";

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
  } else {
    next();
  }
}

moviesRouter.get("/:movieId", applyCache, async (req, res, next) => {
  try {
    const apiKey = process.env.OMDB_API_KEY;
    const movieId = req.params.movieId;
    const url = `${apiUrl}/?i=${movieId}&apikey=${apiKey}`;
    const response = await fetch(url);

    if (!response.ok) {
      throw createHttpError(404, "Movie not found");
    }

    const data = await response.json();

    cache.set(req.originalUrl, data);

    res.json(data);
  } catch (error) {
    next(error);
  }
});

export default moviesRouter;
