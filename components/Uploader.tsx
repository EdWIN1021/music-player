"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "./ui/input";
import * as actions from "@/actions";
import { Label } from "@radix-ui/react-label";
import SubmitButton from "./submit-button";
import { useFormState } from "react-dom";

export default function Uploader() {
  const [formState, action] = useFormState(actions.youtubeToMp3, {
    errors: {},
  });

  return (
    <div className="hidden sm:block">
      <Dialog>
        <DialogTrigger asChild>
          <Button className="rounded-full">Upload</Button>
        </DialogTrigger>

        <DialogContent className="sm:max-w-[425px]">
          <form action={action}>
            <DialogHeader>
              <DialogTitle>Youtube to mp3</DialogTitle>
              <DialogDescription>Insert a YouTube video URL</DialogDescription>
            </DialogHeader>

            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-5 items-center gap-4">
                <Label htmlFor="title" className="text-right text-sm">
                  Title
                </Label>
                <Input
                  id="title"
                  name="title"
                  className="col-span-4 rounded"
                  required
                />
              </div>

              <div className="grid grid-cols-5 items-center gap-4">
                <Label htmlFor="artist" className="text-right text-sm">
                  Artist
                </Label>
                <Input
                  id="artist"
                  name="artist"
                  className="col-span-4  rounded"
                  required
                />
              </div>

              <div className="grid grid-cols-5 items-center gap-4">
                <Label htmlFor="url" className="text-right text-sm">
                  Url
                </Label>
                <Input
                  id="url"
                  type="url"
                  name="url"
                  className="col-span-4 rounded"
                  required
                />
              </div>
            </div>

            <DialogFooter>
              <SubmitButton>Convert</SubmitButton>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
