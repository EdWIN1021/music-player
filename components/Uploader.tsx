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

export function Uploader() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="rounded-full">Upload</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <form action={actions.youtubeToMp3}>
          <DialogHeader>
            <DialogTitle>Youtube to mp3</DialogTitle>
            <DialogDescription>Insert a YouTube video URL</DialogDescription>
          </DialogHeader>

          <Input type="url" name="url" required />

          <DialogFooter>
            <Button className="rounded-full mt-5" type="submit">
              Convert
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
