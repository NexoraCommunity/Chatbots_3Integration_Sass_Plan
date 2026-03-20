"use client";
import { useEffect } from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Switch } from "@/src/components/ui/Switch";
import { Badge } from "@/src/components/ui/Badge";
import { ProductApi } from "@/src/model/product/product.model";
import { ActionMenu } from "@/src/components/ActionMenu";
import { Icon } from "@iconify/react";
import { useProductStore } from "@/src/store/product/product.store";
import { useCategoryStore } from "@/src/store/category/category.store";
import { useToastStore } from "@/src/store/ui/toast.store";
import Image from "next/image";

interface ProductTableProps {
  products: ProductApi[];
  onDelete: (id: string) => void;
}

export default function ProductTable({ products, onDelete }: ProductTableProps) {
  const { updateStatus } = useProductStore();
  const { categories, fetchCategories } = useCategoryStore();
  const { addToast } = useToastStore();

  useEffect(() => {
    fetchCategories({ page: "1", limit: "100" });
  }, [fetchCategories]);

  const handleStatusToggle = async (product: ProductApi) => {
    try {
      await updateStatus(product.id, !product.isActive);
      addToast(`Produk ${!product.isActive ? 'diaktifkan' : 'dinonaktifkan'}`, "success");
    } catch (error: any) {
      console.error("Failed to update product status:", error);
      addToast(error.message || "Gagal memperbarui status produk", "error");
    }
  };

  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 bg-gray-50/50 rounded-3xl border border-dashed border-gray-200">
        <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center mb-4 text-gray-300">
          <Icon icon="solar:box-minimalistic-bold-duotone" width={32} />
        </div>
        <p className="text-gray-400 font-medium poppins-medium">No products found yet</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Mobile/Tablet Card Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:hidden">
        {products.map((product) => (
          <div key={product.id} className="bg-white p-5 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 space-y-4 group">
            {/* Top Section: Image & Basic Info */}
            <div className="flex items-start gap-4">
              <div className="size-16 bg-gray-50 rounded-2xl flex items-center justify-center overflow-hidden border border-gray-100 group-hover:border-primary/20 transition-colors relative shrink-0">
                {product.image ? (
                  <Image
                    src={product.image.startsWith('http') ? product.image : `/api-backend/${product.image}`}
                    alt={product.name}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <Icon icon="solar:box-minimalistic-bold-duotone" className="size-8 text-gray-200" />
                )}
              </div>
              <div className="flex-1 min-w-0 pt-1">
                <div className="flex items-start justify-between gap-2">
                  <span className="text-sm font-bold text-gray-800 line-clamp-2 leading-tight">{product.name}</span>
                  <div className="shrink-0">
                    <ActionMenu
                      baseUrl="/product-manager"
                      id={product.id}
                      detailUrl={`/product-manager/detail-product/${product.id}`}
                      editUrl={`/product-manager/edit-product/${product.id}`}
                      onDelete={() => onDelete(product.id)}
                    />
                  </div>
                </div>
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-tighter mt-1 block">SKU: {product.sku}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 py-1">
              <div className="bg-gray-50/50 p-2.5 rounded-2xl border border-gray-100/50">
                <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest block mb-0.5">Price</span>
                <span className="text-xs font-black text-gray-700">Rp {product.price.toLocaleString()}</span>
              </div>
              <div className="bg-gray-50/50 p-2.5 rounded-2xl border border-gray-100/50">
                <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest block mb-0.5">Stock</span>
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-black text-gray-700">{product.stock}</span>
                  {product.stock <= 10 && (
                    <div className={`size-1.5 rounded-full ${product.stock === 0 ? 'bg-error animate-pulse' : 'bg-warning'}`} />
                  )}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-gray-50">
              <Badge variant="secondary" className="bg-gray-100/80 text-gray-600 border-none text-[9px] font-black uppercase px-2.5 py-1 rounded-lg">
                {categories.find(c => c.id === (product.categoryId || (product as any)?.category_id))?.name || product.categoryId || (product as any)?.category_id || "General"}
              </Badge>
              <div className="flex items-center gap-2 bg-gray-50 rounded-xl px-2 py-1 border border-gray-100">
                <Switch
                  checked={product.isActive}
                  onCheckedChange={() => handleStatusToggle(product)}
                  className="scale-75 origin-right"
                />
                <span className={`text-[9px] font-black uppercase tracking-tight ${product.isActive ? 'text-primary' : 'text-gray-400'}`}>
                  {product.isActive ? 'Active' : 'Inactive'}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop Table Layout */}
      <div className="hidden md:block overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="border-b border-gray-100 hover:bg-transparent">
              <TableHead className="py-4 px-6 text-xs font-bold text-gray-400 uppercase tracking-wider">Product</TableHead>
              <TableHead className="py-4 px-6 text-xs font-bold text-gray-400 uppercase tracking-wider w-[150px]">Price</TableHead>
              <TableHead className="py-4 px-6 text-xs font-bold text-gray-400 uppercase tracking-wider w-[150px]">Stock</TableHead>
              <TableHead className="py-4 px-6 text-xs font-bold text-gray-400 uppercase tracking-wider w-[150px]">Category</TableHead>
              <TableHead className="py-4 px-6 text-xs font-bold text-gray-400 uppercase tracking-wider w-[150px]">Status</TableHead>
              <TableHead className="py-6 px-8 text-xs font-bold text-gray-400 uppercase tracking-wider text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id} className="group border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                <TableCell className="py-4 px-6">
                  <div className="flex items-center gap-4">
                    <div className="size-12 bg-gray-100 rounded-xl flex items-center justify-center overflow-hidden border border-gray-100 group-hover:border-primary/20 transition-colors relative">
                      {product.image ? (
                        <Image
                          src={product.image.startsWith('http') ? product.image : `/api-backend/${product.image}`}
                          alt={product.name}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <Icon icon="solar:box-minimalistic-bold-duotone" className="size-6 text-gray-300" />
                      )}
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className="text-sm font-bold text-gray-800 truncate max-w-[200px]">{product.name}</span>
                      <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-tighter">SKU: {product.sku}</span>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="py-4 px-6 font-bold text-gray-700 text-sm">
                  Rp {product.price.toLocaleString()}
                </TableCell>
                <TableCell className="py-4 px-6 text-sm font-medium">
                  <div className="flex flex-col gap-1">
                    <span className="text-gray-700">{product.stock} units</span>
                    {product.stock <= 10 && (
                      <Badge variant={product.stock === 0 ? "error" : "warning"} className="w-fit scale-90 -translate-x-1">
                        {product.stock === 0 ? "Out of Stock" : "Low Stock"}
                      </Badge>
                    )}
                  </div>
                </TableCell>
                <TableCell className="py-4 px-6">
                  <Badge variant="secondary" className="bg-gray-100 text-gray-600 border-none text-[10px] font-bold uppercase whitespace-nowrap">
                    {categories.find(c => c.id === (product.categoryId || (product as any)?.category_id))?.name || product.categoryId || (product as any)?.category_id || "General"}
                  </Badge>
                </TableCell>
                <TableCell className="py-4 px-6">
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={product.isActive}
                      onCheckedChange={() => handleStatusToggle(product)}
                      className="scale-90"
                    />
                    <span className={`text-[10px] font-bold uppercase ${product.isActive ? 'text-primary' : 'text-gray-400'}`}>
                      {product.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="py-6 px-8 text-right">
                  <div className="flex justify-end">
                    <ActionMenu
                      baseUrl="/product-manager"
                      id={product.id}
                      detailUrl={`/product-manager/detail-product/${product.id}`}
                      editUrl={`/product-manager/edit-product/${product.id}`}
                      onDelete={() => onDelete(product.id)}
                    />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
