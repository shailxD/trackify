import { create } from "zustand";
import { persist } from "zustand/middleware";

interface User {
  id: string;
  email: string;
  name: string;
  password: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => void;
  signup: (email: string, password: string, name: string) => void;
  logout: () => void;
}

// Dummy credentials that always work
const DUMMY_CREDENTIALS = {
  email: "demo@trackify.com",
  password: "demo1234",
  name: "Demo User",
};

// Get users from localStorage
const getStoredUsers = (): User[] => {
  const stored = localStorage.getItem("trackify-users");
  return stored ? JSON.parse(stored) : [];
};

// Save users to localStorage
const saveUsers = (users: User[]) => {
  localStorage.setItem("trackify-users", JSON.stringify(users));
};

const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      login: (email: string, password: string) => {
        // Check dummy credentials first
        if (
          email === DUMMY_CREDENTIALS.email &&
          password === DUMMY_CREDENTIALS.password
        ) {
          const user: User = {
            id: "demo-user",
            email: DUMMY_CREDENTIALS.email,
            name: DUMMY_CREDENTIALS.name,
            password: DUMMY_CREDENTIALS.password,
          };
          set({ user, isAuthenticated: true });
          return;
        }

        // Check stored users
        const users = getStoredUsers();
        const foundUser = users.find(
          (u) => u.email === email && u.password === password
        );

        if (foundUser) {
          set({ user: foundUser, isAuthenticated: true });
        } else {
          throw new Error(
            "Invalid credentials. Please check your email and password or sign up."
          );
        }
      },
      signup: (email: string, password: string, name: string) => {
        // Check if user already exists
        const users = getStoredUsers();
        const existingUser = users.find((u) => u.email === email);

        if (existingUser) {
          throw new Error("An account with this email already exists.");
        }

        // Create new user
        const newUser: User = {
          id: Math.random().toString(36).substring(2, 9),
          email,
          name,
          password,
        };

        // Save to localStorage
        users.push(newUser);
        saveUsers(users);

        // Set as authenticated
        set({ user: newUser, isAuthenticated: true });
      },
      logout: () => {
        set({ user: null, isAuthenticated: false });
      },
    }),
    {
      name: "auth-storage",
    }
  )
);

export default useAuthStore;
