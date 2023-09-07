import express from "express";
import createHttpError from "http-errors";
import { applyCache } from "../middleware/cacheMiddleware";

const moviesRouter = express.Router();

moviesRouter.get("/:movieId", applyCache, async (req, res, next) => {
  try {
    const apiKey = process.env.OMDB_API_KEY;
    const movieId = req.params.movieId;
    const url = `${process.env.omdb_url}/?i=${movieId}&apikey=${apiKey}`;

    const response = await fetch(url);

    if (!response.ok) {
      throw createHttpError(404, "Movie not found!");
    }

    const data = await response.json();

    res.json(data);
  } catch (error) {
    next(error);
  }
});

export default moviesRouter;
