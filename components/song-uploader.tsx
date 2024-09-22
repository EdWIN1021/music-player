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
import { useEffect, useRef, useState } from "react";

export default function SongUploader() {
  const [open, toggle] = useState(false);
  const ref = useRef<HTMLFormElement | null>(null);

  const [formState, action] = useFormState(actions.uploadSong, {
    errors: {},
    success: false,
  });

  useEffect(() => {
    if (formState.success) {
      ref.current?.reset();
      toggle(false);
    }
  }, [formState]);

  return (
    <div className="hidden sm:block">
      <Dialog open={open} onOpenChange={() => toggle((open) => !open)}>
        <DialogTrigger asChild>
          <Button>Upload</Button>
        </DialogTrigger>

        <DialogContent className="sm:max-w-[425px]">
          <form ref={ref} action={action}>
            <DialogHeader>
              <DialogTitle>Download Music</DialogTitle>
              <DialogDescription></DialogDescription>
            </DialogHeader>

            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-5 items-center gap-4">
                <Label htmlFor="title" className="text-left text-sm">
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
                <Label htmlFor="artist" className="text-left text-sm">
                  Artist
                </Label>
                <Input
                  id="artist"
                  name="artist"
                  className="col-span-4  rounded"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-5 items-center gap-4">
              <Label htmlFor="url" className="text-left text-sm">
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

            <DialogFooter>
              <SubmitButton>Save</SubmitButton>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
