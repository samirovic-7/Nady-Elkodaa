import { getUserByEmail } from "~~/server/models/user";

export default defineEventHandler(async (event) => {
  // Read the body of the request, which contains the email and password
  const body = await readBody<{ email: string; password: string; rememberMe: boolean }>(event);
  const { email, password, rememberMe } = body;

  // Check if the email and password are not provided
  if (!email || !password) {
    return createError({
      statusCode: 400,
      message: "Email address and password are required",
    });
  }

  // Get the user from the email
  const userWithPassword = await getUserByEmail(email);

  // Check if the password is founded but Email is not found
  if (!userWithPassword) {
    return createError({
      statusCode: 401,
      message: "Email is uncorrect",
    });
  }

  // Verify the password
  const verified = await verify(userWithPassword.password, password);

  // Check if the Email is founded but Password is not found

  if (!verified) {
    return createError({
      statusCode: 401,
      message: "Password is uncorrect",
    });
  }

  // Set up the session and set a cookie with the session information
  const config = useRuntimeConfig();
  const session = serialize({ userId: userWithPassword.id });
  const signedSession = sign(session, config.cookieSecret);
  setCookie(event, config.cookieName, signedSession, {
    httpOnly: true,
    path: "/",
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    expires: rememberMe
      ? new Date(Date.now() + config.cookieRememberMeExpires)
      : new Date(Date.now() + config.cookieExpires),
  });

  // Remove the password from the user object
  const { password: _password, ...userWithoutPassword } = userWithPassword;

  // Return the user without the password
  return {
    user: userWithoutPassword,
  };
});
