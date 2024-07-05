"use client";

import React, { useState } from "react";
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

import { useRouter } from "next/navigation";

import { Label } from "./ui/label";
import { Input } from "./ui/input";

const Config = () => {
  const [open, toggle] = useState(false);
  const [repo, setRepo] = useState("");
  const [githubId, setGithubId] = useState("");
  const [apiKey, setApiKey] = useState("");

  const handleClick = () => {
    localStorage.setItem(
      "config",
      JSON.stringify({
        repo,
        githubId,
        apiKey,
      })
    );

    toggleDialog();
    window.location.reload();
  };

  const toggleDialog = () => toggle((open) => !open);

  return (
    <Dialog open={open} onOpenChange={toggleDialog}>
      <DialogTrigger asChild>
        <Button className="absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2">
          Config
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Config</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-5 items-center gap-4">
            <Label htmlFor="title" className="text-right text-sm">
              Repo
            </Label>
            <Input
              id="repo"
              name="repoName"
              value={repo}
              className="col-span-4 rounded"
              onChange={(e) => setRepo(e.target.value)}
              required
            />
          </div>

          <div className="grid grid-cols-5 items-center gap-4">
            <Label htmlFor="artist" className="text-right text-sm">
              Github Id
            </Label>
            <Input
              id="github-id"
              value={githubId}
              className="col-span-4  rounded"
              onChange={(e) => setGithubId(e.target.value)}
              required
            />
          </div>

          <div className="grid grid-cols-5 items-center gap-4">
            <Label htmlFor="url" className="text-right text-sm">
              Api Key
            </Label>
            <Input
              id="api-key"
              className="col-span-4 rounded"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              required
            />
          </div>
        </div>

        <DialogFooter>
          <Button onClick={handleClick}>Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default Config;
