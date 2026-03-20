"use client";

import { Cards, CardHeader, CardTitle, CardContent } from "@/src/components/ui/Cards";
import { Input } from "@/src/components/ui/Input";
import { Button } from "@/src/components/ui/Button";
import { Icon } from "@iconify/react";
import { Badge } from "@/src/components/ui/Badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";

interface VariantOption {
  option: string;
  values: string[];
}

interface VariantItem {
  id?: string;
  name: string;
  sku: string;
  weight: string;
  price: string;
  stock: string;
  image?: string;
  optionValues: { option: string; value: string }[];
}

interface VariantSectionProps {
  isVariantEnabled: boolean;
  setIsVariantEnabled: (enabled: boolean) => void;
  variantOptions: VariantOption[];
  generatedVariants: VariantItem[];
  addVariantOption: () => void;
  removeVariantOption: (index: number) => void;
  updateOptionName: (index: number, name: string) => void;
  addOptionValue: (index: number, value: string) => void;
  removeOptionValue: (optIndex: number, valIndex: number) => void;
  updateVariantItem: (index: number, field: keyof VariantItem, value: any) => void;
  onVariantImageUpload: (index: number, e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const VariantSection = ({
  isVariantEnabled,
  setIsVariantEnabled,
  variantOptions,
  generatedVariants,
  addVariantOption,
  removeVariantOption,
  updateOptionName,
  addOptionValue,
  removeOptionValue,
  updateVariantItem,
  onVariantImageUpload,
}: VariantSectionProps) => {
  return (
    <Cards>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          <Icon icon="solar:widget-bold-duotone" className="text-primary" />
          Product Variants
        </CardTitle>
        <div
          onClick={() => setIsVariantEnabled(!isVariantEnabled)}
          className={`w-10 h-6 rounded-full p-1 cursor-pointer transition-colors duration-200 shrink-0 ${isVariantEnabled ? 'bg-primary' : 'bg-gray-200'}`}
        >
          <div className={`w-4 h-4 bg-white rounded-full shadow-sm transform transition-transform duration-200 ${isVariantEnabled ? 'translate-x-4' : 'translate-x-0'}`} />
        </div>
      </CardHeader>
      <CardContent className={`space-y-6 pt-0 transition-all duration-500 overflow-hidden ${isVariantEnabled ? 'max-h-[2000px] opacity-100 border-t border-gray-50 pt-6' : 'max-h-0 opacity-0'}`}>
        <div className="space-y-6">
          {variantOptions.map((option, optIndex) => (
            <div key={optIndex} className="p-5 rounded-2xl bg-gray-50/50 border border-gray-100 space-y-4 relative group">
              <button
                onClick={() => removeVariantOption(optIndex)}
                className="absolute top-4 right-4 text-gray-300 hover:text-rose-500 transition-colors opacity-0 group-hover:opacity-100"
              >
                <Icon icon="solar:trash-bin-minimalistic-bold" width={18} />
              </button>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider ml-1">Option Name</label>
                  <Input
                    placeholder="e.g. Color"
                    value={option.option}
                    onChange={(e) => updateOptionName(optIndex, e.target.value)}
                    variant="secondary"
                    className="bg-white border-gray-100 h-11 text-xs font-bold rounded-xl"
                  />
                </div>
                <div className="md:col-span-2 space-y-2">
                  <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider ml-1">Option Values</label>
                  <div className="flex flex-wrap gap-2 p-2 min-h-11 bg-white border border-gray-100 rounded-xl items-center">
                    {option.values.map((val, valIndex) => (
                      <Badge key={valIndex} variant="primary" className="h-7 text-[10px] gap-1 pl-3 pr-1.5 py-0 bg-primary shadow-xs border-transparent rounded-lg">
                        {val}
                        <button onClick={() => removeOptionValue(optIndex, valIndex)} className="hover:bg-white/20 rounded-md p-0.5 transition-colors">
                          <Icon icon="solar:close-circle-bold" width={14} />
                        </button>
                      </Badge>
                    ))}
                    <input
                      placeholder={option.values.length === 0 ? "Type and press Enter..." : ""}
                      className="flex-1 min-w-[120px] bg-transparent border-none outline-none text-xs font-bold text-gray-700 placeholder:font-normal"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          addOptionValue(optIndex, (e.target as HTMLInputElement).value);
                          (e.target as HTMLInputElement).value = "";
                        }
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}

          <div className="flex items-center gap-4 pt-2">
            <Button
              label="Add New Option"
              variant="secondary"
              icon={<Icon icon="solar:add-circle-bold-duotone" width={18} />}
              onClick={addVariantOption}
              className="h-11 px-6 rounded-xl text-[11px] font-black uppercase tracking-wider bg-white border-dashed border-2 hover:border-primary/30 hover:text-primary transition-all"
            />
          </div>

          {generatedVariants.length > 0 && (
            <div className="pt-4 animate-in slide-in-from-top-4 duration-500">
              <div className="mb-4 flex items-center justify-between">
                <h4 className="text-[11px] font-black text-gray-900 uppercase tracking-[0.2em] ml-1">Generated Variations</h4>
                <Badge variant="secondary" className="font-bold text-[9px] px-2">{generatedVariants.length} Items</Badge>
              </div>
              <div className="rounded-2xl border border-gray-100 overflow-hidden bg-white shadow-sm overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gray-50/50 hover:bg-gray-50/50 border-gray-100">
                      <TableHead className="w-16 h-12"></TableHead>
                      <TableHead className="text-[9px] font-black uppercase tracking-wider text-gray-400 h-12">Variation</TableHead>
                      <TableHead className="text-[9px] font-black uppercase tracking-wider text-gray-400 h-12">SKU</TableHead>
                      <TableHead className="text-[9px] font-black uppercase tracking-wider text-gray-400 h-12">Price</TableHead>
                      <TableHead className="text-[9px] font-black uppercase tracking-wider text-gray-400 h-12 w-24">Stock</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {generatedVariants.map((item, index) => (
                      <TableRow key={index} className="border-gray-50 hover:bg-gray-50/30 transition-colors">
                        <TableCell className="py-3 pl-4">
                          <div
                            onClick={() => document.getElementById(`variant-upload-${index}`)?.click()}
                            className="relative size-10 rounded-lg bg-white border border-gray-100 flex items-center justify-center text-gray-400 hover:text-primary hover:border-primary/30 transition-all cursor-pointer overflow-hidden shadow-sm hover:shadow-md"
                          >
                            {item.image ? (
                              <Image
                                src={item.image.startsWith('http') || item.image.startsWith('blob:') ? item.image : `/api-backend/${item.image.startsWith('/') ? item.image.substring(1) : item.image}`}
                                alt="preview"
                                fill
                                className="object-cover"
                              />
                            ) : (
                              <Icon icon="solar:camera-bold-duotone" width={18} />
                            )}
                          </div>
                          <input
                            id={`variant-upload-${index}`}
                            type="file"
                            className="hidden"
                            accept="image/*"
                            onChange={(e) => onVariantImageUpload(index, e)}
                          />
                        </TableCell>
                        <TableCell className="py-3">
                          <span className="text-[11px] font-black text-gray-800">{item.name}</span>
                        </TableCell>
                        <TableCell className="py-3">
                          <Input
                            value={item.sku}
                            onChange={(e) => updateVariantItem(index, 'sku', e.target.value)}
                            className="h-8 text-[11px] font-bold border-gray-100 min-w-28 bg-white focus:bg-white"
                          />
                        </TableCell>
                        <TableCell className="py-3">
                          <Input
                            value={item.price}
                            onChange={(e) => updateVariantItem(index, 'price', e.target.value)}
                            className="h-8 text-[11px] font-bold border-gray-100 w-24 bg-white focus:bg-white"
                          />
                        </TableCell>
                        <TableCell className="py-3 pr-4">
                          <Input
                            value={item.stock}
                            onChange={(e) => updateVariantItem(index, 'stock', e.target.value)}
                            className="h-8 text-[11px] font-bold border-gray-100 w-16 text-center bg-white focus:bg-white"
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Cards>
  );
};
