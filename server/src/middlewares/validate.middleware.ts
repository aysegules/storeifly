import type { Request, Response, NextFunction } from "express";
import { ValidationError } from "../errors/ValidationError";
import { z, type ZodType } from "zod";

export const validate = (schema: ZodType<any>) => {
  return (req: Request, _res: Response, next: NextFunction) => {
    const result = schema.safeParse({
      body: req.body,
      params: req.params,
      query: req.query,
    });

    if (!result.success) {
      const errors = z.treeifyError(result.error);

      throw new ValidationError(errors.errors.join(","));
    }

    const data = result.data;

    req.body = data.body;
    req.params = data.params;

    next();
  };
};
