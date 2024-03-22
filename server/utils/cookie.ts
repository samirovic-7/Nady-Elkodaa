// Import required modules from the node:crypto library
import { type KeyObject, createHmac, timingSafeEqual } from "node:crypto";

// Define a type alias for a cookie secret, which can be a string, a Buffer, or a KeyObject
export type CookieSecret = string | Buffer | KeyObject;

// Define a serialize function to serialize an object into a Base64-encoded string
export function serialize(obj: object) {
  const value = Buffer.from(JSON.stringify(obj), "utf-8").toString("base64");
  const length = Buffer.byteLength(value);

  // Validate the length of the serialized string to ensure that it is not too large
  if (length > 4096)
    throw createError({
      statusCode: 400,
      statusMessage: "Bad request",
      message: "Cookie too large",
    });

  return value;
}

// Define a deserialize function to deserialize a Base64-encoded string into an object
export function deserialize(value: string) {
  return JSON.parse(Buffer.from(value, "base64").toString("utf-8"));
}

// Define a sign function to sign a Base64-encoded string with a secret key
export function sign(value: string, secret: CookieSecret) {
  const signature = createHmac("sha256", secret).update(value).digest("base64").replace(/=+$/, "");

  return `${value}.${signature}`;
}

// Define an unsign function to validate a signed cookie and extract the value
export function unsign(input: string, secret: CookieSecret) {
  const value = input.slice(0, input.lastIndexOf("."));
  const [expectedInput, expectedSignature] = sign(value, secret).split(".");

  // Validate the signature of the signed cookie by comparing the expected signature with the actual signature
  if (!(input === `${value}.${expectedSignature}` && timingSafeEqual(Buffer.from(expectedSignature, "base64"), createHmac("sha256", secret).update(value).digest()))) {
    throw createError({
      statusCode: 400,
      statusMessage: "Invalid cookie signature",
      message: "Invalid cookie signature",
    });
  }

  return value;
}
