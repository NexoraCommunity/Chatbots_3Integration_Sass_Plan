import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useState } from "react";
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
import { DeleteProductModal } from "./modal/DeleteProductModal";

export default function TableActions() {
  const router = useRouter();

  const handleNavigate = (path: string) => {
    router.push(path);
  };
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleDeleteProduct = () => {
    // Logic untuk menghapus produk
    setIsDeleteModalOpen(true);
  };

  return (
    <div className="h-full flex flex-col">

    {/* header table tetap */}
    <div className="relative">
    <Table>
      <TableHeader className="sticky top-0 bg-white z-20">
        <TableRow className="bg-white">
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
          <TableCell className="font-medium w-60">347</TableCell>
          <TableCell className="font-medium w-60">12 kg</TableCell>
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
                    onClick={() =>
                      handleNavigate("/product-manager/edit-product")
                    }
                  >
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() =>
                      handleNavigate("/product-manager/detail-product")
                    }
                  >
                    Details
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />

                  <DropdownMenuItem
                    variant="destructive"
                    onClick={() => setIsDeleteModalOpen(true)}
                  >
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              {isDeleteModalOpen && (
                <DeleteProductModal
                  open={isDeleteModalOpen}
                  onClose={() => setIsDeleteModalOpen(false)}
                />
              )}
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
          <TableCell className="font-medium w-60">347</TableCell>
          <TableCell className="font-medium w-60">12 kg</TableCell>
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
                    onClick={() =>
                      handleNavigate("/product-manager/edit-product")
                    }
                  >
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() =>
                      handleNavigate("/product-manager/detail-product")
                    }
                  >
                    Details
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />

                  <DropdownMenuItem
                    variant="destructive"
                    onClick={() => setIsDeleteModalOpen(true)}
                  >
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              {isDeleteModalOpen && (
                <DeleteProductModal
                  open={isDeleteModalOpen}
                  onClose={() => setIsDeleteModalOpen(false)}
                />
              )}
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
          <TableCell className="font-medium w-60">347</TableCell>
          <TableCell className="font-medium w-60">12 kg</TableCell>
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
                    onClick={() =>
                      handleNavigate("/product-manager/edit-product")
                    }
                  >
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() =>
                      handleNavigate("/product-manager/detail-product")
                    }
                  >
                    Details
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />

                  <DropdownMenuItem
                    variant="destructive"
                    onClick={() => setIsDeleteModalOpen(true)}
                  >
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              {isDeleteModalOpen && (
                <DeleteProductModal
                  open={isDeleteModalOpen}
                  onClose={() => setIsDeleteModalOpen(false)}
                />
              )}
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
          <TableCell className="font-medium w-60">347</TableCell>
          <TableCell className="font-medium w-60">12 kg</TableCell>
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
                    onClick={() =>
                      handleNavigate("/product-manager/edit-product")
                    }
                  >
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() =>
                      handleNavigate("/product-manager/detail-product")
                    }
                  >
                    Details
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />

                  <DropdownMenuItem
                    variant="destructive"
                    onClick={() => setIsDeleteModalOpen(true)}
                  >
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              {isDeleteModalOpen && (
                <DeleteProductModal
                  open={isDeleteModalOpen}
                  onClose={() => setIsDeleteModalOpen(false)}
                />
              )}
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
          <TableCell className="font-medium w-60">347</TableCell>
          <TableCell className="font-medium w-60">12 kg</TableCell>
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
                    onClick={() =>
                      handleNavigate("/product-manager/edit-product")
                    }
                  >
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() =>
                      handleNavigate("/product-manager/detail-product")
                    }
                  >
                    Details
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />

                  <DropdownMenuItem
                    variant="destructive"
                    onClick={() => setIsDeleteModalOpen(true)}
                  >
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              {isDeleteModalOpen && (
                <DeleteProductModal
                  open={isDeleteModalOpen}
                  onClose={() => setIsDeleteModalOpen(false)}
                />
              )}
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
          <TableCell className="font-medium w-60">347</TableCell>
          <TableCell className="font-medium w-60">12 kg</TableCell>
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
                    onClick={() =>
                      handleNavigate("/product-manager/edit-product")
                    }
                  >
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() =>
                      handleNavigate("/product-manager/detail-product")
                    }
                  >
                    Details
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />

                  <DropdownMenuItem
                    variant="destructive"
                    onClick={() => setIsDeleteModalOpen(true)}
                  >
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              {isDeleteModalOpen && (
                <DeleteProductModal
                  open={isDeleteModalOpen}
                  onClose={() => setIsDeleteModalOpen(false)}
                />
              )}
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
          <TableCell className="font-medium w-60">347</TableCell>
          <TableCell className="font-medium w-60">12 kg</TableCell>
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
                    onClick={() =>
                      handleNavigate("/product-manager/edit-product")
                    }
                  >
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() =>
                      handleNavigate("/product-manager/detail-product")
                    }
                  >
                    Details
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />

                  <DropdownMenuItem
                    variant="destructive"
                    onClick={() => setIsDeleteModalOpen(true)}
                  >
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              {isDeleteModalOpen && (
                <DeleteProductModal
                  open={isDeleteModalOpen}
                  onClose={() => setIsDeleteModalOpen(false)}
                />
              )}
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
          <TableCell className="font-medium w-60">347</TableCell>
          <TableCell className="font-medium w-60">12 kg</TableCell>
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
                    onClick={() =>
                      handleNavigate("/product-manager/edit-product")
                    }
                  >
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() =>
                      handleNavigate("/product-manager/detail-product")
                    }
                  >
                    Details
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />

                  <DropdownMenuItem
                    variant="destructive"
                    onClick={() => setIsDeleteModalOpen(true)}
                  >
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              {isDeleteModalOpen && (
                <DeleteProductModal
                  open={isDeleteModalOpen}
                  onClose={() => setIsDeleteModalOpen(false)}
                />
              )}
            </div>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
    </div>
    </div>
  );
}
