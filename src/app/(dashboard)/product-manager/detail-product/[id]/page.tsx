"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useProductStore } from "@/src/store/product/product.store";
import { useCategoryStore } from "@/src/store/category/category.store";
import { Icon } from "@iconify/react";
import { Cards, CardHeader, CardTitle, CardContent } from "@/src/components/ui/Cards";
import { Button } from "@/src/components/ui/Button";
import { Badge } from "@/src/components/ui/Badge";
import Image from "next/image";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const DetailProductPage = () => {
  const { id } = useParams();
  const router = useRouter();
  const { currentProduct, fetchProductById, isLoading } = useProductStore();
  const { categories, fetchCategories } = useCategoryStore();

  useEffect(() => {
    if (id) {
      fetchProductById(id as string);
    }
    fetchCategories({ page: "1", limit: "100" });
  }, [id, fetchProductById, fetchCategories]);

  if (isLoading) {
    return (
      <div className="h-full flex flex-col items-center justify-center py-20 grayscale opacity-50">
        <Icon icon="solar:box-minimalistic-bold-duotone" width={48} className="animate-pulse text-primary" />
        <p className="mt-4 font-bold text-gray-400 uppercase tracking-widest text-xs">Loading product details...</p>
      </div>
    );
  }

  if (!currentProduct) {
    return (
      <div className="h-full flex flex-col items-center justify-center py-20">
        <Icon icon="solar:clapperboard-edit-bold-duotone" width={48} className="text-gray-300" />
        <p className="mt-4 font-bold text-gray-500">Product not found</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col space-y-6 md:space-y-8 min-h-screen animate-in fade-in duration-500 w-full pb-20">
      {/* Header with Back & Edit Button */}
      <div className="flex items-center justify-between mt-6 px-4 md:px-0 gap-2">
        <div className="flex items-center gap-3 md:gap-4 flex-1">
          <Button
            variant="secondary"
            onClick={() => router.back()}
            label=""
            iconPosition="mid"
            className="size-10 sm:size-11 p-0 rounded-2xl flex items-center justify-center hover:bg-white hover:shadow-md transition-all shrink-0 border border-gray-100 shadow-xs"
            icon={<Icon icon="solar:alt-arrow-left-bold" width={22} />}
          />
          <div className="min-w-0">
            <h1 className="text-lg md:text-2xl poppins-bold text-foreground leading-none truncate">Product Details</h1>
          </div>
        </div>
        <Button
          variant="primary"
          moveTo={`/product-manager/edit-product/${id}`}
          label="Edit Product"
          icon={<Icon icon="solar:pen-new-square-bold-duotone" width={20} />}
          iconPosition="left"
          hideLabelOnMobile={true}
          className="h-10 w-10 sm:h-11 sm:w-auto p-0 sm:px-6 flex items-center justify-center font-bold shadow-lg shadow-primary/20 rounded-[14px] sm:rounded-2xl whitespace-nowrap shrink-0"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Core Info */}
          <Cards className="overflow-hidden border-none shadow-xl shadow-gray-100/50">
            <div className="h-2 bg-primary w-full" />
            <div className="p-8 space-y-8">
              <div className="flex flex-col sm:flex-row gap-8">
                <div className="size-48 bg-gray-50 rounded-[2.5rem] border border-gray-100 flex items-center justify-center overflow-hidden shrink-0 shadow-inner relative">
                  {currentProduct.image ? (
                    <Image
                      src={currentProduct.image.startsWith('http') ? currentProduct.image : `/api-backend/${currentProduct.image}`}
                      alt={currentProduct.name}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <Icon icon="solar:box-minimalistic-bold-duotone" className="size-20 text-gray-200" />
                  )}
                </div>
                <div className="flex-1 space-y-6">
                  <div className="space-y-1">
                    <Badge variant="primary" className="bg-primary/10 text-primary border-none text-[10px] font-black uppercase tracking-widest px-3">
                      {categories.find((c: any) => c.id === (currentProduct.categoryId || (currentProduct as any)?.category_id))?.name || currentProduct.categoryId || (currentProduct as any)?.category_id || "General"}
                    </Badge>
                    <h2 className="text-2xl md:text-3xl poppins-bold text-gray-900 tracking-tight leading-tight">{currentProduct.name}</h2>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
                    <div className="space-y-0.5">
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Pricing</p>
                      <p className="text-lg md:text-xl font-bold text-gray-900">Rp {currentProduct.price.toLocaleString()}</p>
                    </div>
                    <div className="space-y-0.5">
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Stock</p>
                      <p className="text-lg md:text-xl font-bold text-gray-900">{currentProduct.stock} Units</p>
                    </div>
                    <div className="space-y-0.5 col-span-2 sm:col-span-1">
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">SKU</p>
                      <p className="text-lg md:text-xl font-bold text-primary truncate">{currentProduct.sku}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4 border-t border-gray-50 pt-8">
                <h4 className="text-[11px] font-black text-gray-900 uppercase tracking-[0.2em] flex items-center gap-2">
                  <Icon icon="solar:notes-bold-duotone" className="text-primary" />
                  Description
                </h4>
                <p className="text-sm text-gray-500 leading-relaxed font-medium">
                  {currentProduct.description || "No description provided for this product."}
                </p>
              </div>
            </div>
          </Cards>

          {/* Variants Table if any */}
          {currentProduct.haveVariant && currentProduct.productVariants && currentProduct.productVariants.length > 0 && (
            <Cards className="border-none shadow-xl shadow-gray-100/50">
              <CardHeader className="border-b border-gray-50 bg-gray-50/30">
                <CardTitle className="flex items-center gap-2 text-sm font-black uppercase tracking-widest">
                  <Icon icon="solar:widget-bold-duotone" className="text-primary" />
                  Product Variations
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0 overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gray-50/50 hover:bg-gray-50/50">
                      <TableHead className="w-20 pl-6 h-12"></TableHead>
                      <TableHead className="text-[9px] font-black uppercase tracking-wider text-gray-400 h-12">Combination</TableHead>
                      <TableHead className="text-[9px] font-black uppercase tracking-wider text-gray-400 h-12">SKU</TableHead>
                      <TableHead className="text-[9px] font-black uppercase tracking-wider text-gray-400 h-12">Price</TableHead>
                      <TableHead className="text-[9px] font-black uppercase tracking-wider text-gray-400 h-12 pr-6 text-right">Stock</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {currentProduct.productVariants.map((variant) => (
                      <TableRow key={variant.id} className="border-gray-50 hover:bg-gray-50/30 transition-colors group">
                        <TableCell className="py-4 pl-6">
                          <div className="size-12 bg-gray-50 rounded-xl border border-gray-100 flex items-center justify-center overflow-hidden group-hover:border-primary/20 transition-all shadow-sm relative">
                            {variant.image ? (
                              <Image
                                src={variant.image.startsWith('http') ? variant.image : `/api-backend/${variant.image}`}
                                alt="variant"
                                fill
                                className="object-cover"
                              />
                            ) : (
                              <Icon icon="solar:box-minimalistic-bold-duotone" className="size-6 text-gray-200" />
                            )}
                          </div>
                        </TableCell>

                        <TableCell>
                          <div className="flex flex-wrap gap-1">
                            {variant.optionValue.map((ov, i) => (
                              <Badge key={i} variant="secondary" className="text-[10px] font-bold px-2 py-0.5 bg-gray-100/80 border-none">
                                {ov.value}
                              </Badge>
                            ))}
                          </div>
                        </TableCell>
                        <TableCell className="text-xs font-bold text-gray-600">{variant.sku}</TableCell>
                        <TableCell className="text-xs font-black text-gray-900">Rp {variant.price.toLocaleString()}</TableCell>
                        <TableCell className="text-xs font-black text-gray-900 pr-6 text-right">{variant.stock}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Cards>
          )}
        </div>

        <div className="space-y-8">
          {/* Specifications/Metrics Card */}
          <Cards className="border-none shadow-xl shadow-gray-100/50 overflow-hidden">
            <div className="p-1.5 bg-primary/10 rounded-full w-fit mx-auto mt-8 mb-4">
              <div className="bg-primary p-3 rounded-full text-white shadow-lg shadow-primary/30">
                <Icon icon="solar:transmission-bold-duotone" width={24} />
              </div>
            </div>
            <div className="text-center px-6 pb-8">
              <h4 className="text-sm font-black uppercase tracking-widest text-gray-900">Product Health</h4>
              <p className="text-[10px] text-gray-400 font-bold mt-1 uppercase tracking-tighter">Current Inventory Metrics</p>

              <div className="mt-8 grid grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-3xl border border-gray-100">
                  <p className="text-[9px] font-black text-gray-400 uppercase tracking-[0.1em]">Status</p>
                  <p className={`text-xs font-black mt-1 uppercase ${currentProduct.isActive ? 'text-primary' : 'text-rose-500'}`}>
                    {currentProduct.isActive ? 'Active' : 'Hidden'}
                  </p>
                </div>
                <div className="bg-gray-50 p-4 rounded-3xl border border-gray-100">
                  <p className="text-[9px] font-black text-gray-400 uppercase tracking-[0.1em]">Weight</p>
                  <p className="text-xs font-black text-gray-900 mt-1 uppercase">{currentProduct.weight}g</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-3xl border border-gray-100">
                  <p className="text-[9px] font-black text-gray-400 uppercase tracking-[0.1em]">Visibility</p>
                  <p className="text-xs font-black text-gray-900 mt-1 uppercase">Public</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-3xl border border-gray-100">
                  <p className="text-[9px] font-black text-gray-400 uppercase tracking-[0.1em]">Type</p>
                  <p className="text-xs font-black text-gray-900 mt-1 uppercase">{currentProduct.haveVariant ? 'Variable' : 'Simple'}</p>
                </div>
              </div>
            </div>
          </Cards>

          {/* Support/Quick Actions */}
          <div className="p-8 rounded-[2.5rem] bg-gray-900 text-white space-y-6 relative overflow-hidden shadow-2xl shadow-gray-200">
            <Icon icon="solar:chat-round-dots-bold-duotone" className="absolute -bottom-6 -right-6 size-32 text-white/5" />
            <div className="flex items-center gap-3 relative z-10">
              <div className="bg-primary p-2.5 rounded-2xl text-white shadow-lg shadow-primary/30">
                <Icon icon="solar:question-square-bold-duotone" width={22} />
              </div>
              <h4 className="font-black text-xs uppercase tracking-widest">Inventory Help</h4>
            </div>
            <p className="text-xs text-gray-400 leading-relaxed font-bold relative z-10">
              "Manage your high-traffic products by setting low-stock alerts in the global settings."
            </p>
            <button className="w-full h-12 bg-white/10 hover:bg-white/20 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all relative z-10">
              View History
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailProductPage;
