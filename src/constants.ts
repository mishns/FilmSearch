export const DEV_COOKIES_HEADERS: RequestInit =
  process.env.NODE_ENV === "development"
    ? { credentials: "include", mode: "cors", referrerPolicy: "same-origin" }
    : {};

export const KP_TOKEN = "";
