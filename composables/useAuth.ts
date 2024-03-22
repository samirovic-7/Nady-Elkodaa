import { useAuthUser } from "./useAuthUser";

// Export a composition function that returns an object containing authentication methods
export const useAuth = () => {
  // Use the `useAuthUser` composition function to get the current authenticated user
  const authUser = useAuthUser();

  // Setter function for updating the authenticated user
  const setUser = (user: any) => {
    authUser.value = user;
  };

  // Setter function for setting a cookie
  const setCookie = (cookie: any) => {
    cookie.value = cookie;
  };

  // Method for logging in a user
  const login = async (email: string, password: string, rememberMe: boolean) => {
    const data = await $fetch("/auth/login", {
      method: "POST",
      body: {
        email,
        password,
        rememberMe,
      },
    });

    // Set the authenticated user
    setUser(data.user);

    // Return the authenticated user
    return authUser;
  };

  // Method for logging out a user
  const logout = async () => {
    const data = await $fetch("/auth/logout", {
      method: "POST",
    });

    // Set the authenticated user
    setUser(data.user);
  };

  // Method for signing up a user
  const signup = async (name: string, email: string, password: string, rememberMe: boolean) => {
    const data = await $fetch("/auth/signup", {
      method: "POST",
      body: {
        name,
        email,
        password,
        rememberMe,
      },
    });

    // Set the authenticated user
    setUser(data.user);

    // Return the authenticated user
    return authUser;
  };

  // Method for fetching the current authenticated user
  const me = async () => {
    if (!authUser.value) {
      try {
        // @ts-ignore
        const data = await $fetch("/auth/me", {
          headers: useRequestHeaders(["cookie"]) as HeadersInit,
        });

        // @ts-ignore
        setUser(data.user);
      } catch (error) {
        setCookie(null);
      }
    }

    // Return the authenticated user
    return authUser;
  };

  // Return an object containing the authentication methods
  return {
    login,
    logout,
    me,
    signup,
  };
};
