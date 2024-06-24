import React from "react";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Label } from "./ui/label";
import { Input } from "./ui/input";

const UploadDrawer = () => {
  return (
    <Drawer>
      <DrawerTrigger>Upload</DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Youtube to mp3</DrawerTitle>
          <DrawerDescription>Insert a YouTube video URL</DrawerDescription>
        </DrawerHeader>

        <form className="p-10 flex  flex-col gap-5">
          <Input
            id="title"
            name="title"
            className="col-span-4 rounded"
            placeholder="Title"
            required
          />

          <Input
            id="artist"
            name="artist"
            className="col-span-4  rounded"
            placeholder="Artist"
            required
          />

          <Input
            id="url"
            type="url"
            name="url"
            className="col-span-4 rounded"
            placeholder="Url"
            required
          />
        </form>

        <DrawerFooter>
          <Button>Submit</Button>
          <DrawerClose>
            <Button className="w-full" variant="outline">
              Cancel
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default UploadDrawer;
