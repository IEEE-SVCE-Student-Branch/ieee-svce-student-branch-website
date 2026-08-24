import { describe, it, expect } from "vitest";
import { AppError, Errors, errorResponse } from "../../lib/errors";
import { z } from "zod";

describe("Error Handling", () => {
  it("should create AppError with correct properties", () => {
    const error = new AppError(400, "TEST_CODE", "Test message");
    expect(error.statusCode).toBe(400);
    expect(error.code).toBe("TEST_CODE");
    expect(error.message).toBe("Test message");
  });

  it("should format AppError response correctly", async () => {
    const error = Errors.unauthorized();
    const response = errorResponse(error);
    const body = await response.json();

    expect(response.status).toBe(401);
    expect(body).toEqual({
      error: { code: "UNAUTHORIZED", message: "Unauthorized" },
    });
  });

  it("should format ZodError response correctly", async () => {
    const schema = z.object({ name: z.string() });
    const parsed = schema.safeParse({});

    // safeParse returns success: false if it fails, and error is ZodError
    if (!parsed.success) {
      const response = errorResponse(parsed.error);
      const body = await response.json();

      expect(response.status).toBe(400);
      expect(body.error.code).toBe("VALIDATION_ERROR");
      expect(body.error.message).toContain("name");
    } else {
      expect.fail("Schema should have failed validation");
    }
  });

  it("should format unknown errors as 500 INTERNAL_ERROR", async () => {
    const error = new Error("Something catastrophic");
    const response = errorResponse(error);
    const body = await response.json();

    expect(response.status).toBe(500);
    expect(body.error.code).toBe("INTERNAL_ERROR");
    // Message should be generic, not leaking the internal error message
    expect(body.error.message).toBe("Internal server error");
  });
});
