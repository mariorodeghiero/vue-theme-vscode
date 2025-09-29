import fetch from "node-fetch";
import fs from "fs";

const API_URL = process.env.API_URL || "https://jsonplaceholder.typicode.com/users";

interface User {
  id: number;
  name: string;
  email: string;
  active?: boolean;
}

export async function fetchUsers(url: string): Promise<User[]> {
  const response = await fetch(url);
  return await response.json();
}

export function getActiveUsers(users: User[]): User[] {
  return users.filter(user => user.active !== false);
}

export function logUsers(users: User[]): void {
  users.forEach(user => {
    console.log(`👤 ${user.name} (${user.email})`);
  });
}

export function exportUsers(users: User[], filename = "users.json"): void {
  fs.writeFileSync(filename, JSON.stringify(users, null, 2));
}

(async () => {
  const users = await fetchUsers(API_URL);
  const activeUsers = getActiveUsers(users);
  logUsers(activeUsers);
  exportUsers(activeUsers);
})();
