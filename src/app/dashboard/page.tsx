"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Loader from "../components/Loader";
import { useEffect, useState } from "react";
import SongQueue from "../components/SongQueue";
import AddSong from "../components/AddSong";
import CurrentSong from "../components/CurrentSong";

export default function Dashboard() {
  const session = useSession();
  const navigation = useRouter();
  const [songs, setSongs] = useState([]);

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
  const userId = session.data?.userId;

  return (
    <div className="p-16 min-h-screen">
      <div className="flex w-full p-10 gap-5">
        <div className="flex flex-col w-1/2 gap-5">
          <SongQueue creatorId={userId} songs={songs} setSongs={setSongs} />
        </div>
        <div className="flex flex-col w-1/2 items-center gap-5">
          <AddSong creatorId={userId} />
          {songs.length > 0 ? <CurrentSong songs={songs} isCreator={true}/> : null}
        </div>
      </div>
    </div>
  );
}
