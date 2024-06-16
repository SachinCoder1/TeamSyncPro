'use client';

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";

import { Copy, UsersRound } from "lucide-react";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { MembersType } from "@/types";
import { useEffect, useState } from "react";

type Props = {
  members?: [MembersType];
  projectId?: string;
  projectName?: string;
};

export function ShareProject({ members, projectId, projectName }: Props) {
  const [isClient, setIsClient] = useState(false);
  const [link, setLink] = useState('');
  const [copyBtnText, setCopyBtnText] = useState("Copy link")

  useEffect(() => {
    setIsClient(true);
    if (isClient) {
      setLink(window.location.href);
    }
  }, [isClient]);

  if (!isClient) {
    return null;
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(link);
    setCopyBtnText("Copied!")
    setTimeout(() => {
      setCopyBtnText('Copy link')
    }, 2000);
  };

  if(!window) return;
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size={"sm"}>
          <UsersRound className="w-4 h-4 mr-2" /> Share
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Share {projectName}</DialogTitle>
          <DialogDescription>
            Anyone who has this link will be able to view this.
          </DialogDescription>
        </DialogHeader>
        <div className="flex space-x-2">
          <Input value={link} readOnly />
          <Button disabled={copyBtnText !== "Copy link"} onClick={() => copyToClipboard()} variant="secondary" className="shrink-0">
            {copyBtnText}
          </Button>
        </div>
        <Separator className="my-2" />
        <div className="space-y-4">
          <h4 className="text-sm font-medium">People with access</h4>
          <div className="grid gap-6">
            <div className="flex items-center justify-between space-x-4">
              <div className="flex items-center space-x-4">
                <Avatar>
                  <AvatarImage src="/avatars/03.png" />
                  <AvatarFallback>OM</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium leading-none">
                    Olivia Martin
                  </p>
                  <p className="text-sm text-muted-foreground">m@example.com</p>
                </div>
              </div>
              <Select defaultValue="edit">
                <SelectTrigger className="ml-auto w-[110px]">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="edit">Can edit</SelectItem>
                  <SelectItem value="view">Can view</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center justify-between space-x-4">
              <div className="flex items-center space-x-4">
                <Avatar>
                  <AvatarImage src="/avatars/05.png" />
                  <AvatarFallback>IN</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium leading-none">
                    Isabella Nguyen
                  </p>
                  <p className="text-sm text-muted-foreground">b@example.com</p>
                </div>
              </div>
              <Select defaultValue="view">
                <SelectTrigger className="ml-auto w-[110px]">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="edit">Can edit</SelectItem>
                  <SelectItem value="view">Can view</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center justify-between space-x-4">
              <div className="flex items-center space-x-4">
                <Avatar>
                  <AvatarImage src="/avatars/01.png" />
                  <AvatarFallback>SD</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium leading-none">
                    Sofia Davis
                  </p>
                  <p className="text-sm text-muted-foreground">p@example.com</p>
                </div>
              </div>
              <Select defaultValue="view">
                <SelectTrigger className="ml-auto w-[110px]">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="edit">Can edit</SelectItem>
                  <SelectItem value="view">Can view</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        <Separator className="my-2" />

        <DialogFooter className="sm:justify-end">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
