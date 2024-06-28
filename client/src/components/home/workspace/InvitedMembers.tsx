import { InvitationType } from "@/types";
import React from "react";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatFullDate } from "@/utils/formatDate";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";

type Props = {
  invitedMembers?: InvitationType[];
};

const InvitedMembers = ({ invitedMembers }: Props) => {
  return (
    <div>
      {/* {JSON.stringify(invitedMembers || {}, null, 2)} */}

      <Table>
        {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">email</TableHead>
            <TableHead>status</TableHead>
            <TableHead>invited by</TableHead>
            <TableHead className="text-right">on</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {invitedMembers && invitedMembers.length > 0 ? (
            invitedMembers.map((item, index) => (
              <TableRow key={`${item.invited_to}:${index}`}>
                <TableCell className="font-medium">{item.invited_to}</TableCell>
                <TableCell>
                  <Badge variant={"outline"}>
                    {item.status.toLocaleLowerCase()}
                  </Badge>
                </TableCell>
                <TableCell>{item.invited_from.name}</TableCell>
                <TableCell className="text-right">
                  {format(new Date(item?.createdAt || ""), "MMMM d")}
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
                <TableCell
                  colSpan={4}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default InvitedMembers;
