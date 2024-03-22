export default defineEventHandler(async (event) => {
  // Get the runtime configuration for the application
  const config = useRuntimeConfig();

  // Delete the cookie with the specified name
  deleteCookie(event, config.cookieName, {
    // Set the following cookie attributes
    httpOnly: true,
    path: "/", // The path to which the cookie applies
    sameSite: "strict", // The sameSite attribute for the cookie
    secure: process.env.NODE_ENV === "production", // Whether the cookie should be sent over a secure connection
  });

  // Return a JSON response with the user object set to null
  return {
    user: null,
  };
});
