"use client";

import { Chat } from "@/components/chat";
import { ReactionBar } from "@/components/reaction-bar";
import { StreamPlayer } from "@/components/stream-player";
import { TokenContext } from "@/components/token-context";
import { CreateStreamResponse } from "@/lib/controller";
import { LiveKitRoom } from "@livekit/components-react";
import { Box, Flex } from "@radix-ui/themes";
import { useEffect, useState } from "react";

export default function HostPage({
  authToken,
  roomToken,
  serverUrl,
}: {
  authToken: string;
  roomToken: string;
  serverUrl: string;
}) {
  const [autoGenRoomToken, setAutoGenRoomToken] = useState<string | null>(null);
  const [autoGenAuthToken, setAutoGenAuthToken] = useState<string | null>(null);

  useEffect(() => {
    const onGoLive = async () => {
      const res = await fetch("/api/create_stream", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          room_name: "o2o",
          metadata: {
            creator_identity: "o2o",
            enable_chat: true,
            allow_participation: true,
          },
        }),
      });
      const {
        auth_token,
        connection_details: { token },
      } = (await res.json()) as CreateStreamResponse;

      setAutoGenRoomToken(token);
      setAutoGenAuthToken(auth_token);
    };

    onGoLive();
  }, []);

  return (
    <TokenContext.Provider value={authToken || autoGenAuthToken!}>
      <LiveKitRoom serverUrl={serverUrl} token={roomToken || autoGenRoomToken!}>
        <Flex className="w-full h-screen">
          <Flex direction="column" className="flex-1">
            <Box className="flex-1 bg-gray-1">
              <StreamPlayer isHost />
            </Box>
            <ReactionBar />
          </Flex>
          <Box className="bg-accent-2 min-w-[280px] border-l border-accent-5 hidden sm:block">
            <Chat />
          </Box>
        </Flex>
      </LiveKitRoom>
    </TokenContext.Provider>
  );
}
