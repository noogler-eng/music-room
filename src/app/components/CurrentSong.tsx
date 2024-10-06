"use client";
import ReactPlayer from "react-player";
import songInterface from "../Interfaces/song";
import axios from "axios";
import { useState } from "react";

export default function CurrentSong({
  songs,
  isCreator,
}: {
  songs: songInterface[];
  isCreator: boolean;
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentSong = songs[currentIndex];

  const removeCurrentSong = async () => {
    try {
      await axios.delete(`/api/streams/delete?streamId=${currentSong.id}`);
      setCurrentIndex((prevIndex) => (prevIndex + 1) % songs.length);
    } catch (error) {
      console.error("Error while deleting the stream:", error);
    }
  };

  const handleProgress = async (progress: { played: number }) => {
    if (progress.played >= 0.95) {
      await removeCurrentSong();
    }
  };

  return (
    <div className="w-fit p-6 bg-gradient-to-r from-green-500 to-black">
      {currentSong && (
        <>
          <img
            src={currentSong.smallImg || ""}
            alt={currentSong.title || ""}
            width={400}
            height={400}
            className="rounded-lg"
          />
          <ReactPlayer
            key={currentIndex}
            url={currentSong.url || ""}
            playing={true}
            onProgress={handleProgress}
            height={isCreator ? 400: 0}
            width={isCreator ? 400: 0}
            controls
            autoplay
          />
          {isCreator && (
            <button
              className="border-2 font-extrabold rounded-xl bg-black text-white px-2 text-sm mt-2"
              onClick={removeCurrentSong}
            >
              Next Song
            </button>
          )}
        </>
      )}
    </div>
  );
}
