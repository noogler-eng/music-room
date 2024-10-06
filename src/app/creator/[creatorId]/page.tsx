"use client";
import AddSong from "@/app/components/AddSong";
import CurrentSong from "@/app/components/CurrentSong";
import Loader from "@/app/components/Loader";
import SongQueue from "@/app/components/SongQueue";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Creator({
  params,
}: {
  params: {
    creatorId: string;
  };
}) {
  const [songs, setSongs] = useState([]);
  const session = useSession();
  const navigation = useRouter();

  useEffect(() => {
    if (session.status === "unauthenticated") {
      navigation.replace("/");
    }
  }, [session.status, navigation]);

  if (session.status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  //@ts-ignore
  const userId = session?.data?.userId;

  return (
    <div className="flex w-full p-10 gap-5">
      <div className="flex flex-col w-1/2 gap-5">
        <SongQueue
          creatorId={params.creatorId}
          songs={songs}
          setSongs={setSongs}
        />
      </div>
      <div className="flex flex-col w-1/2 items-center gap-5">
        <AddSong creatorId={params.creatorId} />
        {songs.length > 0 ? <CurrentSong songs={songs} isCreator={userId == params.creatorId ? true: false} /> : null}
      </div>
    </div>
  );
}
