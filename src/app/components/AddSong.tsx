"use client";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import axios from "axios";

export default function AddSong({ creatorId }: { creatorId: string }) {
  const [url, setUrl] = useState("");

  const handleSubmit = async(event: any) => {
    // without this whole application refreshes
    event.preventDefault()
    try {
      await axios.post(`/api/streams?creatorId=${creatorId}`, { url: url });
    } catch (error: any) {
      console.log("error while adding song: ", error);
    }
    setUrl("");
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Add a Song</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            placeholder="song youtube url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
          />
          <Button type="submit" className="w-full">
            Add to Queue
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
