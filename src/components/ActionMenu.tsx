"use client";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/src/components/ui/Button";
import { Icon } from "@iconify/react";
import { useRouter } from "next/navigation";

interface ActionMenuProps {
  baseUrl: string;
  id: string | number;
  detailUrl?: string; // Optional override for detail link
  editUrl?: string;   // Optional override for edit link
  onlyDetail?: boolean;
  onDelete?: (id: string | number) => void;
}

export const ActionMenu = ({ baseUrl, id, detailUrl, editUrl, onlyDetail = false, onDelete }: ActionMenuProps) => {
  const router = useRouter();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="h-8 w-8 p-0 text-gray-400 hover:text-gray-600 rounded-lg"
          iconPosition="mid"
          icon={<Icon icon="lucide:more-horizontal" width={18} />}
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-40 poppins-medium">
        <DropdownMenuItem
          className="flex items-center gap-2 cursor-pointer text-sm"
          onClick={() => router.push(detailUrl || `${baseUrl}/${id}`)}
        >
          <Icon icon="lucide:eye" width={16} />
          <span>Detail</span>
        </DropdownMenuItem>
        
        {!onlyDetail && (
          <>
            <DropdownMenuItem
              className="flex items-center gap-2 cursor-pointer text-sm"
              onClick={() => router.push(editUrl || `${baseUrl}/${id}/edit`)}
            >
              <Icon icon="lucide:edit-3" width={16} />
              <span>Edit</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="flex items-center gap-2 cursor-pointer text-sm text-red-600 focus:text-red-600 focus:bg-red-50"
              onClick={() => onDelete && onDelete(id)}
            >
              <Icon icon="lucide:trash-2" width={16} />
              <span>Delete</span>
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
