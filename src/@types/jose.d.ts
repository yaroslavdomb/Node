import "jose";

declare module "jose" {
  interface JWTPayload {
    email: string;
    isAdmin: boolean;
    isBusiness: boolean;
    _id: string;
  }
}
