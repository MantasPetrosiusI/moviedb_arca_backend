import Express from "express";
import listEndpoints from "express-list-endpoints";
import cors from "cors";
import {
  badRequestHandler,
  genericErrorHandler,
  validationErrorHandler,
} from "./middleware/errorHandlers";
import moviesRouter from "./routes/Movies";
import searchRouter from "./routes/Search";
import rateLimit from "express-rate-limit";
const result = require("dotenv").config();

if (result.error) {
  console.error("Error loading .env file:", result.error);
}

const app = Express();

app.use(Express.json());
app.use(cors());

const port = process.env.PORT || 3001;

const limiter = rateLimit({
  windowMs: 120 * 1000,
  max: 20,
});

app.use("/movies", moviesRouter);
app.use(limiter);
app.use("/search", searchRouter);

app.use(badRequestHandler, genericErrorHandler, validationErrorHandler);

app.listen(port, () => {
  console.table(listEndpoints(app));
  console.log(`Server listening on port ${port}`);
});

export default app;
