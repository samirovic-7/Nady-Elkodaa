// Import the `User` type from the `types` module
import type { User } from "~~/types";

// Define an array of fake user data
const users: User[] = [
  {
    id: "41dbc5f7-9a4e-42e6-832b-1d3dd8c7c4b6",
    email: "reymon@chd.com",
    password: "$2y$10$hXPea83sKsVsuf95mtEZZeIYtcFl1vLJ1BXVTEqcgKArf6/5.Zksm",
  },
];

// Export an asynchronous function for getting all users
export async function getUsers() {
  // Return the `users` array
  return users;
}

// Export an asynchronous function for getting a user by email
export async function getUserByEmail(email: string) {
  // Find the user with the given email in the `users` array
  return users.find((user) => user.email === email);
}

// Export an asynchronous function for getting a user by ID
export async function getUserById(id: string) {
  // Find the user with the given ID in the `users` array
  return users.find((user) => user.id === id);
}
