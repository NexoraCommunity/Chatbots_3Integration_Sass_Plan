"use client";

import { useState, useMemo } from "react";
import { Cards, CardHeader, CardTitle, CardContent } from "@/src/components/ui/Cards";
import { Input } from "@/src/components/ui/Input";
import { Button } from "@/src/components/ui/Button";
import { Icon } from "@iconify/react";
import { Badge } from "@/src/components/ui/Badge";
import { useRouter } from "next/navigation";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface VariantOption {
  name: string;
  values: string[];
}

interface VariantItem {
  name: string;
  sku: string;
  weight: string;
  price: string;
  stock: string;
  image?: string;
}

const AddProduct = () => {
  const router = useRouter();
  const [productData, setProductData] = useState({
    name: "",
    description: "",
    sku: "",
    category: "",
    weight: "",
    price: "",
    stock: "",
  });

  // Variant State
  const [variantOptions, setVariantOptions] = useState<VariantOption[]>([]);
  const [currentOptionName, setCurrentOptionName] = useState("");
  const [currentValue, setCurrentValue] = useState("");
  const [generatedVariants, setGeneratedVariants] = useState<VariantItem[]>([]);
  const [isVariantEnabled, setIsVariantEnabled] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProductData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCreate = () => {
    console.log("Creating product:", { productData, variantOptions, generatedVariants });
  };

  const addOptionValue = (index: number, value: string) => {
    if (!value.trim()) return;
    const newOptions = [...variantOptions];
    if (!newOptions[index].values.includes(value)) {
      newOptions[index].values.push(value);
      setVariantOptions(newOptions);
    }
  };

  const removeOptionValue = (optIndex: number, valIndex: number) => {
    const newOptions = [...variantOptions];
    newOptions[optIndex].values.splice(valIndex, 1);
    setVariantOptions(newOptions);
  };

  const addVariantOption = () => {
    setVariantOptions([...variantOptions, { name: "", values: [] }]);
  };

  const updateOptionName = (index: number, name: string) => {
    const newOptions = [...variantOptions];
    newOptions[index].name = name;
    setVariantOptions(newOptions);
  };

  const removeVariantOption = (index: number) => {
    const newOptions = [...variantOptions];
    newOptions.splice(index, 1);
    setVariantOptions(newOptions);
  };

  const generateVariants = () => {
    if (variantOptions.length === 0 || variantOptions.some(opt => opt.values.length === 0)) return;

    const combinations = variantOptions.reduce((acc, curr) => {
      const results: string[] = [];
      curr.values.forEach(val => {
        if (acc.length === 0) results.push(val);
        else acc.forEach(a => results.push(`${a} - ${val}`));
      });
      return results;
    }, [] as string[]);

    const items: VariantItem[] = combinations.map(name => ({
      name,
      sku: `${productData.sku}-${name.replace(/\s+/g, '')}`,
      weight: productData.weight,
      price: productData.price,
      stock: productData.stock,
    }));

    setGeneratedVariants(items);
  };

  const updateVariantItem = (index: number, field: keyof VariantItem, value: string) => {
    const newVariants = [...generatedVariants];
    (newVariants[index] as any)[field] = value;
    setGeneratedVariants(newVariants);
  };

  const handleVariantImageUpload = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updateVariantItem(index, 'image', reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex flex-col space-y-8  min-h-screen animate-in fade-in duration-500 max-w-5xl mx-auto w-full px-4 sm:px-0">
      {/* Header with Back Button */}
      <div className="flex items-center gap-4">
        <Button
          variant="secondary"
          moveTo="/product-manager"
          label=""
          iconPosition="mid"
          className="size-11 p-0 rounded-2xl flex items-center justify-center hover:bg-white hover:shadow-md transition-all shrink-0 border border-gray-100 shadow-xs"
          icon={<Icon icon="solar:alt-arrow-left-bold" width={22} />}
        />
        <div>
          <h1 className="text-2xl poppins-bold text-foreground leading-none">Add New Product</h1>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* General Information */}
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
                    onChange={handleChange}
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
                        <span className={productData.category ? "text-foreground" : "text-muted-foreground"}>
                          {productData.category || "Select Category"}
                        </span>
                        <Icon icon="solar:alt-arrow-down-bold" className="text-gray-400" />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start" className="w-56 p-2 rounded-xl border-gray-100 shadow-xl">
                      {["Equipment", "Potions", "Apparel", "Wands", "Books"].map((cat) => (
                        <DropdownMenuItem
                          key={cat}
                          onClick={() => setProductData(prev => ({ ...prev, category: cat }))}
                          className="rounded-lg font-bold text-xs py-2.5 cursor-pointer hover:bg-primary/5 hover:text-primary"
                        >
                          {cat}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider ml-1">SKU (Base)</label>
                  <Input
                    name="sku"
                    value={productData.sku}
                    onChange={handleChange}
                    placeholder="e.g. PRD-001"
                    variant="secondary"
                    className="bg-gray-50/50 border-gray-100 focus:bg-white transition-all h-12 text-sm font-semibold rounded-xl"
                  />
                </div>
                <div className="md:col-span-2 space-y-2">
                  <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider ml-1">Description</label>
                  <textarea
                    name="description"
                    value={productData.description}
                    onChange={handleChange}
                    className="w-full h-40 p-5 text-sm bg-gray-50/50 border border-gray-100 rounded-2xl focus:bg-white focus:border-primary/30 outline-none transition-all resize-none text-foreground font-semibold placeholder:font-normal"
                    placeholder="Describe your product features, benefits, and details..."
                  ></textarea>
                </div>
              </div>
            </CardContent>
          </Cards>

          {/* Pricing & Inventory */}
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
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-bold text-gray-400">$</span>
                    <Input
                      name="price"
                      value={productData.price}
                      onChange={handleChange}
                      placeholder="0.00"
                      variant="secondary"
                      className="bg-gray-50/50 border-gray-100 focus:bg-white transition-all h-12 pl-8 text-sm font-semibold rounded-xl"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider ml-1">Weight</label>
                  <Input
                    name="weight"
                    value={productData.weight}
                    onChange={handleChange}
                    placeholder="0 kg"
                    variant="secondary"
                    className="bg-gray-50/50 border-gray-100 focus:bg-white transition-all h-12 text-sm font-semibold rounded-xl"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider ml-1">Stock Level</label>
                  <Input
                    name="stock"
                    value={productData.stock}
                    onChange={handleChange}
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

          {/* Variants Section */}
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
            <CardContent className={`space-y-6 pt-0 transition-all duration-500 overflow-hidden ${isVariantEnabled ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'}`}>
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
                          value={option.name}
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
                  {variantOptions.length > 0 && (
                    <Button
                      label="Generate Variants"
                      variant="primary"
                      onClick={generateVariants}
                      className="h-11 px-8 rounded-xl text-[11px] font-black uppercase tracking-wider shadow-lg shadow-primary/20"
                    />
                  )}
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
                            <TableHead className="text-[9px] font-black uppercase tracking-wider text-gray-400 h-12">Weight</TableHead>
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
                                  className="size-10 rounded-lg bg-white border border-gray-100 flex items-center justify-center text-gray-400 hover:text-primary hover:border-primary/30 transition-all cursor-pointer overflow-hidden shadow-sm hover:shadow-md"
                                >
                                  {item.image ? (
                                    <img src={item.image} alt="preview" className="w-full h-full object-cover" />
                                  ) : (
                                    <Icon icon="solar:camera-bold-duotone" width={18} />
                                  )}
                                </div>
                                <input
                                  id={`variant-upload-${index}`}
                                  type="file"
                                  className="hidden"
                                  accept="image/*"
                                  onChange={(e) => handleVariantImageUpload(index, e)}
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
                                  value={item.weight}
                                  onChange={(e) => updateVariantItem(index, 'weight', e.target.value)}
                                  className="h-8 text-[11px] font-bold border-gray-100 w-16 text-center bg-white focus:bg-white"
                                />
                              </TableCell>
                              <TableCell className="py-3">
                                <Input
                                  value={item.price}
                                  onChange={(e) => updateVariantItem(index, 'price', e.target.value)}
                                  className="h-8 text-[11px] font-bold border-gray-100 w-20 bg-white focus:bg-white"
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
        </div>

        <div className="space-y-8">
          {/* Media Upload */}
          <Cards>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon icon="solar:gallery-bold-duotone" className="text-primary" />
                Product Media
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 pt-0">
              <div className="group relative aspect-square rounded-3xl border-2 border-dashed border-gray-100 bg-gray-50 items-center justify-center flex flex-col gap-4 cursor-pointer hover:border-primary/30 hover:bg-primary/5 transition-all duration-300">
                <div className="w-16 h-16 rounded-2xl bg-white shadow-sm border border-gray-100 flex items-center justify-center text-gray-400 group-hover:scale-110 group-hover:text-primary transition-all duration-300">
                  <Icon icon="solar:cloud-upload-bold-duotone" width={32} />
                </div>
                <div className="text-center">
                  <p className="text-xs font-black text-gray-900 uppercase tracking-widest">Click to upload</p>
                  <p className="text-[10px] text-gray-400 font-bold mt-1 uppercase">PNG, JPG up to 10MB</p>
                </div>
                <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" />
              </div>
            </CardContent>
          </Cards>

          {/* Quick Support Info */}
          <div className="p-8 rounded-[2.5rem] bg-gray-900 text-white space-y-6 relative overflow-hidden shadow-2xl shadow-gray-200">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
            <div className="flex items-center gap-3 relative z-10">
              <div className="bg-primary p-2.5 rounded-2xl text-white shadow-lg shadow-primary/30">
                <Icon icon="solar:lightbulb-bold-duotone" width={22} />
              </div>
              <h4 className="font-black text-xs uppercase tracking-widest">Product Tip</h4>
            </div>
            <p className="text-xs text-gray-400 leading-relaxed font-bold relative z-10 italic">
              "Include clear keywords in your description. This helps your AI agent find products faster for customer inquiries."
            </p>
            <div className="pt-2 relative z-10">
              <Badge variant="primary" className="bg-white/10 border-white/10 text-white text-[9px]">SEO Optimized</Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Footer */}
      <div className="sticky bottom-0 w-full z-50 px-0 sm:px-4 mt-auto">
        <div className="mx-auto max-w-5xl p-4 sm:p-5 bg-white/90 backdrop-blur-2xl border border-white/50 shadow-2xl rounded-2xl sm:rounded-3xl flex flex-col sm:flex-row justify-between items-center gap-4 animate-in fade-in slide-in-from-bottom-8 duration-500">
          <div className="flex items-center gap-4 sm:ml-4 w-full sm:w-auto justify-center sm:justify-start">
            <div className="bg-primary/10 text-primary w-12 h-12 rounded-2xl flex items-center justify-center font-black shadow-inner border border-primary/5">
              <Icon icon="solar:box-minimalistic-bold-duotone" width={24} />
            </div>
            <div className="flex flex-col text-center sm:text-left">
              <span className="text-xs font-black text-gray-900 uppercase tracking-tighter">Draft Status</span>
              <span className="text-[10px] text-muted-foreground font-bold italic">Ready to save to inventory</span>
            </div>
          </div>
          <div className="flex gap-4 w-full sm:w-auto">
            <Button
              variant="secondary"
              label="Cancel"
              moveTo="/product-manager"
              className="px-10 rounded-2xl font-black text-xs bg-gray-50 border-gray-100 hover:bg-gray-100 flex-1 sm:flex-none uppercase tracking-widest"
            />
            <Button
              variant="primary"
              label="Tambahkan Product"
              onClick={handleCreate}
              className="px-12 rounded-2xl font-black shadow-xl shadow-primary/30 hover:scale-[1.02] active:scale-[0.98] transition-all text-xs flex-1 sm:flex-none uppercase tracking-widest"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export { AddProduct };
