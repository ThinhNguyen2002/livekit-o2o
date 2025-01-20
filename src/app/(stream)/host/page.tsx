import { redirect } from "next/navigation";
import HostPageImpl from "./page.client";
import { CreateStreamResponse } from "@/lib/controller";

interface PageProps {
  searchParams: {
    at: string | undefined;
    rt: string | undefined;
  };
}

type User = {
  id: number;
  name: string;
};

// Sample user data
const users: User[] = [
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" },
  { id: 3, name: "Charlie" },
  { id: 4, name: "Diana" },
  { id: 5, name: "Eve" },
];

/**
 * Get a random user from the list of users.
 * @param userList Array of users.
 * @returns Random user's name.
 */
export function getRandomUserName(userList: User[] = users): string {
  if (userList.length === 0) {
    throw new Error("The user list is empty.");
  }
  const randomIndex = Math.floor(Math.random() * userList.length);
  return userList[randomIndex].name;
}

export default async function HostPage({
  searchParams: { at, rt },
}: PageProps) {
  if (!at || !rt) {
    // redirect("/");
  }

  const serverUrl = process.env
    .LIVEKIT_WS_URL!.replace("wss://", "https://")
    .replace("ws://", "http://");

  return <HostPageImpl authToken={at!} roomToken={rt!} serverUrl={serverUrl} />;
}
