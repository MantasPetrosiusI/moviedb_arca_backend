import express from "express";
import createHttpError from "http-errors";
import cache, { applyCache } from "../middleware/cacheMiddleware";

const searchRouter = express.Router();

searchRouter.get("/:title", applyCache, async (req, res, next) => {
  try {
    const title = req.params.title;
    const apiKey = process.env.OMDB_API_KEY;

    if (!apiKey) {
      throw createHttpError(500, "OMDB_API_KEY is not provided.");
    }

    const url = `${process.env.omdb_url}/?s=${title}&apikey=${apiKey}`;
    const response = await fetch(url);

    if (!response.ok) {
      throw createHttpError(response.status, "OMDb API request failed.");
    }

    const data = await response.json();

    if (data.Error) {
      if (data.Error.includes("Movie not found!")) {
        throw createHttpError(404, "Movie not found!");
      } else if (data.Error.includes("Too many results.")) {
        throw createHttpError(
          400,
          "Too many results. Please provide a more specific search."
        );
      } else {
        throw createHttpError(400, data.Error);
      }
    }
    cache.set(req.originalUrl, JSON.stringify(data));
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
});

export default searchRouter;
