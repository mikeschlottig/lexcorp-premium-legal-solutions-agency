import { Hono } from "hono";
import { Env } from "./core-utils";
type LeadPayload = {
  name: string;
  contact: string;
  reason: string;
  page: string;
  timestamp: string;
} & Record<string, unknown>;
function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}
export function userRoutes(app: Hono<{ Bindings: Env }>) {
  // Add more routes like this. **DO NOT MODIFY CORS OR OVERRIDE ERROR HANDLERS**
  app.get("/api/test", (c) => c.json({ success: true, data: { name: "this works" } }));
  app.post("/api/leads", async (c) => {
    try {
      const payload = await c.req.json<LeadPayload>();
      if (
        !isNonEmptyString(payload?.name) ||
        !isNonEmptyString(payload?.contact) ||
        !isNonEmptyString(payload?.reason) ||
        !isNonEmptyString(payload?.page) ||
        !isNonEmptyString(payload?.timestamp)
      ) {
        return c.json(
          {
            success: false,
            error: "Missing required fields. Please provide name, contact, reason, page, and timestamp.",
          },
          400,
        );
      }
      const normalized = {
        name: payload.name.trim(),
        contact: payload.contact.trim(),
        reason: payload.reason.trim(),
        page: payload.page.trim(),
        timestamp: payload.timestamp.trim(),
      };
      console.log("[LEAD CAPTURE]", JSON.stringify(normalized, null, 2));
      return c.json({ success: true });
    } catch (error) {
      console.error("[LEAD CAPTURE] Invalid JSON or handler failure:", error);
      return c.json(
        {
          success: false,
          error: "Invalid request. Please submit a valid JSON payload.",
        },
        400,
      );
    }
  });
}