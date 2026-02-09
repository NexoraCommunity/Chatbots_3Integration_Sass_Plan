import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EllipsisVertical } from "lucide-react";
import { useRouter } from "next/navigation";
import { Switch } from "@/components/ui/switch";

export default function TableActions() {
  const router = useRouter();

const handleNavigate = (path: string) => {
  router.push(path);
};

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Product</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Stock</TableHead>
          <TableHead>Weight</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell className="font-medium w-108.75">
            <div className="flex gap-6">
              <div className="gambar w-15 h-15 bg-gray-300 rounded-lg"></div>
              <div className="flex flex-col justify-center">
                <p>Sapu terbang penyihir...</p>
                <p>ID:SPU001</p>
              </div>
            </div>
          </TableCell>
          <TableCell className="font-medium w-60">$49.99</TableCell>
          <TableCell className="font-medium w-60">$49.99</TableCell>
          <TableCell className="font-medium w-60">$49.99</TableCell>
          <TableCell>
            <div className="flex gap-16 items-center h-full">
              <Switch className="cursor-pointer" />
            </div>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium w-108.75">
            <div className="flex gap-6">
              <div className="gambar w-15 h-15 bg-gray-300 rounded-lg"></div>
              <div className="flex flex-col justify-center">
                <p>Sapu terbang penyihir...</p>
                <p>ID:SPU001</p>
              </div>
            </div>
          </TableCell>
          <TableCell className="font-medium w-60">$49.99</TableCell>
          <TableCell className="font-medium w-60">$49.99</TableCell>
          <TableCell className="font-medium w-60">$49.99</TableCell>
          <TableCell>
            <div className="flex gap-16 items-center h-full">
              <Switch className="cursor-pointer" />
            </div>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium w-108.75">
            <div className="flex gap-6">
              <div className="gambar w-15 h-15 bg-gray-300 rounded-lg"></div>
              <div className="flex flex-col justify-center">
                <p>Sapu terbang penyihir...</p>
                <p>ID:SPU001</p>
              </div>
            </div>
          </TableCell>
          <TableCell className="font-medium w-60">$49.99</TableCell>
          <TableCell className="font-medium w-60">$49.99</TableCell>
          <TableCell className="font-medium w-60">$49.99</TableCell>
          <TableCell>
            <div className="flex gap-16 items-center h-full">
              <Switch className="cursor-pointer" />
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="secondary" size="icon" className="size-8">
                    <EllipsisVertical />
                    <span className="sr-only">Open menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem
                    onClick={() => handleNavigate("/product-manager/edit-product")}
                  >
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem>Details</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem variant="destructive">
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
