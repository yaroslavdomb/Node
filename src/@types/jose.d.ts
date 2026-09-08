import "jose";

declare module "jose" {
  interface JWTPayload {
    email: string;
    admin: boolean;
  }
}
