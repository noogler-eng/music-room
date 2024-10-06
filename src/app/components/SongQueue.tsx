"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUpCircle, ArrowDownCircle, Music } from "lucide-react";
import axios from "axios";
import { useEffect } from "react";

export default function SongQueue({creatorId, songs, setSongs}: {
  creatorId: string,
  songs: any,
  setSongs: any
}) {

  useEffect(() => {
    const fetchSongs = async() => {
      try {
        const response = await axios.get(
          `/api/streams/myqueue?creatorId=${creatorId}`
        );
        setSongs(response.data.msg);
      } catch (error: any) {
        console.log("error while fetching the song...", error);
      }
    };

    setInterval(() => {
      fetchSongs();
    }, 10 * 1000);
  }, []);

  const handleUpVote = async (id: number) => {
    try {
      await axios.post("/api/streams/upvotes", {
        streamId: id.toString(),
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleDownVote = async (id: number) => {
    try {
      await axios.post("/api/streams/downvotes", {
        streamId: id.toString(),
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Music className="mr-2" />
          Song Queue
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {songs.length > 0 &&
            songs.slice(1).map((song: any) => (
              <li
                key={song.id}
                className="flex items-center justify-between bg-gradient-to-r	from-[#1DB954] to-[#191414] p-3 rounded-md text-white"
              >
                <div className="flex items-center space-x-3">
                  <img
                    src={song?.smallImg || ""}
                    alt={song?.title || ""}
                    width={100}
                    height={100}
                    className="rounded-md"
                  />
                  <div>
                    <p className="font-semibold text-sm">{song?.title || ""}</p>
                    <p className="text-sm text-white">{song?.url || ""}</p>
                  </div>
                </div>
                {song.upvotes.length == 0 ? (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleUpVote(song.id)}
                    className="text-black"
                  >
                    <ArrowUpCircle className="mr-1 h-4 w-4" />
                    <span className="ml-1 bg-primary text-primary-foreground rounded-full px-2 py-0.5 text-xs">
                      {Number(song._count.upvotes)}
                    </span>
                  </Button>
                ) : (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDownVote(song.id)}
                    className="text-black"
                  >
                    <ArrowDownCircle className="mr-1 h-4 w-4" />
                    <span className="ml-1 bg-primary text-primary-foreground rounded-full px-2 py-0.5 text-xs">
                      {Number(song._count.upvotes)}
                    </span>
                  </Button>
                )}
              </li>
            ))}
        </ul>
      </CardContent>
    </Card>
  );
}
