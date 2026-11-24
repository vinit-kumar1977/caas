import request from "supertest";
import type { Express } from "express";

export function createHttpClient(app: Express) {
  return request(app);
}
