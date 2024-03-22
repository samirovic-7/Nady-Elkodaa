// Define an event handler using the defineEventHandler function
export default defineEventHandler(async (event) => {
  // Get the user object from the event context
  const userWithPassword = event.context.user;

  // If there is no user (i.e., the user is not authenticated), return an object with a null user
  if (!userWithPassword) {
    return {
      user: null,
    };
  }

  // Destructure the user object to remove the password property and create a new object with the rest of the properties
  const { password: _password, ...userWithoutPassword } = userWithPassword;

  // Return an object containing the user without the password property
  return {
    user: userWithoutPassword,
  };
});
