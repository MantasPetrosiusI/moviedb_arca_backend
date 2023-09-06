import { ErrorRequestHandler } from "express";

export const badRequestHandler: ErrorRequestHandler = (err, req, res, next) => {
  if (err.status === 400 || (err.name === "ValidationError" && err.details)) {
    res.status(400).send({ message: err.message });
  } else {
    next(err);
  }
};

export const genericErrorHandler: ErrorRequestHandler = (
  err,
  req,
  res,
  next
) => {
  console.error(err);
  res.status(500).send({ message: "We're working to fix this ASAP!" });
};

export const validationErrorHandler: ErrorRequestHandler = (
  err,
  req,
  res,
  next
) => {
  if (err.status === 422 || (err.name === "ValidationError" && err.details)) {
    res.status(422).send({ message: err.message });
  } else {
    next(err);
  }
};
