import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Play } from "lucide-react";
import ReactPlayer from 'react-player/youtube'

export default function Playing({ song }: any) {
  console.log("song::: ", song);

  return (
    <Card className="mb-6">
      {song && (
        <div>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Play className="mr-2" />
              Now Playing
            </CardTitle>
          </CardHeader>
          {song.active && (
            <CardContent className="flex items-center space-x-4">
              <img
                src={song?.bigImg || ""}
                alt={song?.title || ""}
                width={100}
                height={100}
                className="rounded-md"
              />
              <div>
                <p className="text-2xl font-bold">{song?.title || ""}</p>
              </div>
            </CardContent>
          )}
          <div className="flex flex-col items-center justify-center p-4">
            <ReactPlayer url={song.url} playing={true} width={400} height={200}/>
          </div>
        </div>
      )}
    </Card>
  );
}
