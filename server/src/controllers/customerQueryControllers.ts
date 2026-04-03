import { Request, Response } from "express";
import { type CreateQueryDTO, customerQueries } from "../db/schema";
import db from "../db/connection";

export const addCustomerQuery = async (
  req: Request<any, any, CreateQueryDTO>,
  res: Response
) => {
  try {
    const { name, email, subject, message, status } = req.body;
    const [newQuery] = await db
      .insert(customerQueries)
      .values({ name, email, subject, message, status })
      .returning();
    if (!newQuery) {
      res.status(500).json({
        error: "Failed to add new query!",
      });
    }
    res.status(201).json({
      message: "Query added",
      query: newQuery,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Something went wrong!",
      err,
    });
  }
};
