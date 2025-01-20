export default async function WatchLayout({
  children,
  params: { roomName },
}: {
  children: React.ReactNode;
  params: { roomName?: string };
}) {
  console.log("roomName", roomName);
  return <main className="min-h-screen">{children}</main>;
}
