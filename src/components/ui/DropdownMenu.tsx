import { Button } from "@/src/components/ui/Button"; // Keep existing button
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"; //shadcn components in root
import { EllipsisVertical } from "lucide-react";

interface DropdownMenuActionsProps {
  onEdit?: () => void;
  onDelete?: () => void;
  onDetails?: () => void;
}

export function DropdownMenuActions({ onEdit, onDelete, onDetails }: DropdownMenuActionsProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="size-8 p-0 flex items-center justify-center">
          <EllipsisVertical size={16} />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={onEdit}>Edit</DropdownMenuItem>
        <DropdownMenuItem onClick={onDetails}>Details</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={onDelete} className="text-destructive">Delete</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
