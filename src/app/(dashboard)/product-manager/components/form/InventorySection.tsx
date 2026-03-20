"use client";

import { Cards, CardHeader, CardTitle, CardContent } from "@/src/components/ui/Cards";
import { Input } from "@/src/components/ui/Input";
import { Icon } from "@iconify/react";

interface InventorySectionProps {
  productData: {
    price: string;
    weight: string;
    stock: string;
  };
  isVariantEnabled: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

export const InventorySection = ({
  productData,
  isVariantEnabled,
  onChange,
}: InventorySectionProps) => {
  return (
    <Cards className="animate-in fade-in duration-300">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-foreground">
          <Icon icon="solar:tag-price-bold-duotone" className="text-primary" />
          {isVariantEnabled ? "Pricing & Inventory (Defaults)" : "Pricing & Inventory"}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6 pt-0">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider ml-1">Price</label>
            <div className="relative group">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-bold text-gray-400">Rp</span>
              <Input
                name="price"
                value={productData.price}
                onChange={onChange}
                placeholder="0"
                variant="secondary"
                className="bg-gray-50/50 border-gray-100 focus:bg-white transition-all h-12 pl-10 text-sm font-semibold rounded-xl"
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider ml-1">Weight (grams)</label>
            <Input
              name="weight"
              value={productData.weight}
              onChange={onChange}
              placeholder="0"
              variant="secondary"
              className="bg-gray-50/50 border-gray-100 focus:bg-white transition-all h-12 text-sm font-semibold rounded-xl"
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider ml-1">Stock Level</label>
            <Input
              name="stock"
              value={productData.stock}
              onChange={onChange}
              placeholder="0"
              type="number"
              variant="secondary"
              className="bg-gray-50/50 border-gray-100 focus:bg-white transition-all h-12 text-sm font-semibold rounded-xl"
            />
          </div>
        </div>
        {isVariantEnabled && (
          <p className="text-[10px] font-bold text-amber-500 uppercase tracking-widest flex items-center gap-2 mt-2">
            <Icon icon="solar:info-circle-bold-duotone" width={14} />
            These values will be used as defaults for your variants
          </p>
        )}
      </CardContent>
    </Cards>
  );
};
