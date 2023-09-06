import express from "express";
import createHttpError from "http-errors";
import { applyCache } from "../middleware/cacheMiddleware";
import NodeCache from "node-cache";

const searchRouter = express.Router();
const apiUrl = "http://www.omdbapi.com";

const cache = new NodeCache({ stdTTL: 3600 });

searchRouter.get("/:title", applyCache, async (req, res, next) => {
  try {
    const title = req.params.title;
    const apiKey = process.env.OMDB_API_KEY;
    const url = `${apiUrl}/?s=${title}&apikey=${apiKey}`;
    const response = await fetch(url);

    if (!response.ok) {
      if (response.status === 404) {
        throw createHttpError(404, "Movie not found");
      } else {
        throw createHttpError(
          response.status,
          "Failed to fetch data from OMDB API"
        );
      }
    }

    const data = await response.json();

    cache.set(req.originalUrl, data);

    res.json(data);
  } catch (error) {
    next(error);
  }
});

export default searchRouter;
