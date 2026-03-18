import type { z } from "zod";

import type { PipeTransform } from "@nestjs/common";
import { BadRequestException } from "@nestjs/common";

export class ZodValidationPipe implements PipeTransform {
  constructor(private schema: z.ZodType) {}

  transform(value: unknown) {
    try {
      return this.schema.parse(value);
    } catch {
      throw new BadRequestException("Validation failed");
    }
  }
}
