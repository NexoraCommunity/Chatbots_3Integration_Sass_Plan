"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/src/components/ui/Button";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Icon } from "@iconify/react";
import { useRouter } from "next/navigation";
import { Switch } from "@/src/components/ui/Switch";
import { Badge } from "@/src/components/ui/Badge";
import { DeleteProductModal } from "./modal/DeleteProductModal";

export default function TableActions() {
  const router = useRouter();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleNavigate = (path: string) => {
    router.push(path);
  };

  const products = [
    {
      id: "SPU001",
      name: "Sapu Terbang Penyihir",
      price: "$49.99",
      stock: 347,
      weight: "12 kg",
      status: "active",
      thumbnail: "https://api.iconify.design/solar:magic-stick-3-bold-duotone.svg?color=%23888888",
    },
    {
      id: "POT002",
      name: "Ramuan Keberuntungan",
      price: "$29.99",
      stock: 12,
      weight: "0.5 kg",
      status: "warning",
      thumbnail: "https://api.iconify.design/solar:bottle-bold-duotone.svg?color=%23888888",
    },
    {
      id: "HAT003",
      name: "Topi Seleksi",
      price: "$99.99",
      stock: 0,
      weight: "1.2 kg",
      status: "inactive",
      thumbnail: "https://api.iconify.design/solar:crown-minimalistic-bold-duotone.svg?color=%23888888",
    },
    {
      id: "BRM004",
      name: "Sapu Nimbus 2000",
      price: "$149.99",
      stock: 85,
      weight: "15 kg",
      status: "active",
      thumbnail: "https://api.iconify.design/solar:magic-stick-bold-duotone.svg?color=%23888888",
    },
  ];

  return (
    <div className="w-full overflow-y-auto max-h-[600px] pr-2 scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent">
      <Table>
        <TableHeader className="z-10">
          <TableRow className="border-b border-gray-100 hover:bg-transparent">
            <TableHead className="sticky top-0 bg-white py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Product</TableHead>
            <TableHead className="sticky top-0 bg-white py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Price</TableHead>
            <TableHead className="sticky top-0 bg-white py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Stock</TableHead>
            <TableHead className="sticky top-0 bg-white py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Weight</TableHead>
            <TableHead className="sticky top-0 bg-white py-4 text-xs font-bold text-gray-400 uppercase tracking-wider text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id} className="group border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
              <TableCell className="py-4">
                <div className="flex items-center gap-4">
                  <div className="size-12 bg-gray-100 rounded-xl flex items-center justify-center overflow-hidden border border-gray-100 group-hover:border-primary/20 transition-colors">
                    <img src={product.thumbnail} alt={product.name} className="size-6 opacity-50" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-gray-800">{product.name}</span>
                    <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-tighter">ID: {product.id}</span>
                  </div>
                </div>
              </TableCell>
              <TableCell className="py-4 font-bold text-gray-700 text-sm">
                {product.price}
              </TableCell>
              <TableCell className="py-4 text-sm font-medium">
                <div className="flex flex-col gap-1">
                  <span className="text-gray-700">{product.stock} units</span>
                  {product.stock <= 20 && (
                    <Badge variant={product.stock === 0 ? "error" : "warning"} className="w-fit">
                      {product.stock === 0 ? "Out of Stock" : "Low Stock"}
                    </Badge>
                  )}
                </div>
              </TableCell>
              <TableCell className="py-4 text-sm text-gray-500 font-medium">
                {product.weight}
              </TableCell>
              <TableCell className="py-4 text-right">
                <div className="flex items-center justify-end gap-3">
                  <Switch checked={product.status === "active"} className="scale-90" />
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="secondary" label="Menu" iconPosition="mid" icon={<Icon icon="solar:menu-dots-bold" width={18} />} className="size-8 rounded-lg border-gray-200 hover:border-primary/30 hover:bg-primary/5 hover:text-primary transition-all" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-40">
                      <DropdownMenuItem onClick={() => handleNavigate("/product-manager/edit-product")} className="flex items-center gap-2 cursor-pointer font-medium text-xs">
                        <Icon icon="solar:pen-new-square-bold-duotone" width={16} />
                        Edit Product
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleNavigate("/product-manager/detail-product")} className="flex items-center gap-2 cursor-pointer font-medium text-xs">
                        <Icon icon="solar:eye-bold-duotone" width={16} />
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem 
                        className="flex items-center gap-2 cursor-pointer font-medium text-xs text-rose-600 focus:text-rose-600 focus:bg-rose-50"
                        onClick={() => setIsDeleteModalOpen(true)}
                      >
                        <Icon icon="solar:trash-bin-trash-bold-duotone" width={16} />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {isDeleteModalOpen && (
        <DeleteProductModal
          open={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
        />
      )}
    </div>
  );
}
