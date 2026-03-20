"use client";

import { Cards, CardHeader, CardTitle, CardContent } from "@/src/components/ui/Cards";
import { Input } from "@/src/components/ui/Input";
import { Icon } from "@iconify/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface GeneralSectionProps {
  productData: {
    name: string;
    categoryId: string;
    sku: string;
    description: string;
  };
  categories: any[];
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onCategoryChange: (categoryId: string) => void;
}

export const GeneralSection = ({
  productData,
  categories,
  onChange,
  onCategoryChange,
}: GeneralSectionProps) => {
  return (
    <Cards>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Icon icon="solar:Box-bold-duotone" className="text-primary" />
          General Information
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6 pt-0">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2 space-y-2">
            <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider ml-1">Product Name</label>
            <Input
              name="name"
              value={productData.name}
              onChange={onChange}
              placeholder="e.g. Magic Broomstick 2000"
              variant="secondary"
              className="bg-gray-50/50 border-gray-100 focus:bg-white transition-all h-14 text-sm font-semibold rounded-2xl"
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider ml-1">Category</label>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="w-full flex items-center justify-between bg-gray-50/50 border border-gray-100 h-12 px-4 text-sm font-semibold rounded-xl hover:bg-white transition-all text-left">
                  <span className={productData.categoryId ? "text-foreground" : "text-muted-foreground"}>
                    {productData.categoryId ? (categories.find((c: any) => c.id === productData.categoryId)?.name || productData.categoryId) : "Select Category"}
                  </span>
                  <Icon icon="solar:alt-arrow-down-bold" className="text-gray-400" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-56 p-2 rounded-xl border-gray-100 shadow-xl max-h-[300px] overflow-y-auto">
                {(categories || []).map((cat: any) => (
                  <DropdownMenuItem
                    key={cat.id}
                    onClick={() => onCategoryChange(cat.id)}
                    className="rounded-lg font-bold text-xs py-2.5 cursor-pointer hover:bg-primary/5 hover:text-primary"
                  >
                    {cat.name}
                  </DropdownMenuItem>
                ))}
                {categories.length === 0 && (
                  <div className="p-2 text-[10px] text-muted-foreground text-center">No categories found</div>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider ml-1">SKU (Base)</label>
            <Input
              name="sku"
              value={productData.sku}
              onChange={onChange}
              placeholder="e.g. PRD-001"
              variant="secondary"
              className="bg-gray-50/50 border-gray-100 focus:bg-white transition-all h-12 text-sm font-semibold rounded-xl"
            />
          </div>
          <div className="md:col-span-2 space-y-2">
            <div className="flex items-center justify-between ml-1">
              <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Description</label>
              <span className={`text-[10px] font-bold uppercase tracking-wider ${productData.description.length >= 1000 ? 'text-error' : 'text-muted-foreground'}`}>
                {productData.description.length} / 1000
              </span>
            </div>
            <textarea
              name="description"
              value={productData.description}
              onChange={onChange}
              maxLength={1000}
              className="w-full h-40 p-5 text-sm bg-gray-50/50 border border-gray-100 rounded-2xl focus:bg-white focus:border-primary/30 outline-none transition-all resize-none text-foreground font-semibold placeholder:font-normal"
              placeholder="Describe your product features, benefits, and details..."
            ></textarea>
          </div>
        </div>
      </CardContent>
    </Cards>
  );
};
