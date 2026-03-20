"use client";

import { useState, useEffect } from "react";

import { Button } from "@/src/components/ui/Button";
import { Icon } from "@iconify/react";
import { Badge } from "@/src/components/ui/Badge";
import { useRouter } from "next/navigation";
import { useProductStore } from "@/src/store/product/product.store";
import { useAuthStore } from "@/src/store/authentication/auth.store";
import { useCategoryStore } from "@/src/store/category/category.store";
import { uploadImage } from "@/src/services/upload/upload.route";
import { ProductApi } from "@/src/model/product/product.model";
import { GeneralSection } from "./form/GeneralSection";
import { InventorySection } from "./form/InventorySection";
import { VariantSection } from "./form/VariantSection";
import { MediaSection } from "./form/MediaSection";
import { useToastStore } from "@/src/store/ui/toast.store";

export interface VariantOption {
  option: string;
  values: string[];
}

export interface VariantItem {
  id?: string;
  name: string;
  sku: string;
  weight: string;
  price: string;
  stock: string;
  image?: string;
  optionValues: { option: string; value: string }[];
}

interface ProductFormProps {
  initialData?: ProductApi;
  isEdit?: boolean;
}

const AddProduct = ({ initialData, isEdit = false }: ProductFormProps) => {
  const router = useRouter();
  const { user } = useAuthStore();
  const { addProduct, updateProduct } = useProductStore();
  const { categories, fetchCategories } = useCategoryStore();
  const { addToast } = useToastStore();

  const [isLoading, setIsLoading] = useState(false);
  const [mainPreview, setMainPreview] = useState<string | null>(null);
  const [variantPreviews, setVariantPreviews] = useState<Record<number, string>>({});
  const [productData, setProductData] = useState({
    name: initialData?.name || "",
    description: initialData?.description || "",
    sku: initialData?.sku || "",
    categoryId: initialData?.categoryId || (initialData as any)?.category_id || "",
    weight: initialData?.weight?.toString() || "",
    price: initialData?.price?.toString() || "",
    stock: initialData?.stock?.toString() || "",
    image: initialData?.image || "",
    isActive: initialData?.isActive ?? true,
  });

  const [isVariantEnabled, setIsVariantEnabled] = useState(initialData?.haveVariant ?? false);
  const [variantOptions, setVariantOptions] = useState<VariantOption[]>([]);
  const [generatedVariants, setGeneratedVariants] = useState<VariantItem[]>([]);

  useEffect(() => {
    if (isEdit && initialData) {
      if (initialData.variantOptions) {
        const mappedOptions: VariantOption[] = initialData.variantOptions.map(vo => ({
          option: vo.name,
          values: vo.values.map(v => v.value)
        }));
        setVariantOptions(mappedOptions);
      }

      if (initialData.productVariants) {
        const mappedVariants: VariantItem[] = initialData.productVariants.map(v => ({
          id: v.id,
          name: v.optionValue.map(ov => ov.value).join(" - "),
          sku: v.sku,
          weight: initialData.weight?.toString() || "0",
          price: v.price.toString(),
          stock: v.stock.toString(),
          image: v.image,
          optionValues: v.optionValue.map(ov => ({ option: ov.option, value: ov.value }))
        }));
        setGeneratedVariants(mappedVariants);
      }
    }
  }, [isEdit, initialData]);

  useEffect(() => {
    fetchCategories({ page: "1", limit: "100" });
  }, [fetchCategories]);

  useEffect(() => {
    if (!isVariantEnabled) {
      if (generatedVariants.length > 0) setGeneratedVariants([]);
      return;
    }

    const validOptions = variantOptions.filter(opt => opt.option.trim() !== "" && opt.values.length > 0);

    if (validOptions.length === 0) {
      if (generatedVariants.length > 0) setGeneratedVariants([]);
      return;
    }

    const getCombinations = (options: VariantOption[]): any[][] => {
      if (options.length === 0) return [[]];
      const result: any[][] = [];
      const first = options[0];
      const rest = options.slice(1);
      const restCombinations = getCombinations(rest);

      first.values.forEach(val => {
        restCombinations.forEach(combination => {
          result.push([{ option: first.option, value: val }, ...combination]);
        });
      });
      return result;
    };

    const combinations = getCombinations(validOptions);

    const getComboKey = (combo: { option: string; value: string }[]) =>
      combo.map(c => `${c.option}:${c.value}`).sort().join("|");

    const newVariants: VariantItem[] = combinations.map(combo => {
      const comboKey = getComboKey(combo);
      const name = combo.map(c => c.value).join(" - ");

      const existing = generatedVariants.find(v => getComboKey(v.optionValues) === comboKey);

      if (existing) {
        return {
          ...existing,
          name,
        };
      }

      return {
        name,
        sku: `${productData.sku}-${name.replace(/\s+/g, '')}`,
        weight: productData.weight,
        price: productData.price,
        stock: productData.stock,
        optionValues: combo
      };
    });

    // Check if anything actually changed before updating state to avoid unnecessary renders
    const isDifferent = JSON.stringify(generatedVariants.map(v => ({ ...v, id: undefined }))) !==
      JSON.stringify(newVariants.map(v => ({ ...v, id: undefined })));

    if (isDifferent) {
      setGeneratedVariants(newVariants);
    }
  }, [variantOptions, isVariantEnabled, productData.sku, productData.price, productData.stock, productData.weight, generatedVariants]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProductData((prev) => ({ ...prev, [name]: value }));
  };

  const handleMainImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Set preview for display only
      setMainPreview(URL.createObjectURL(file));
      try {
        setIsLoading(true);
        const response = await uploadImage(file);
        // Important: set the server path in productData for saving
        setProductData(prev => ({ ...prev, image: response.data }));
      } catch (error) {
        console.error("Upload failed", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleVariantImageUpload = async (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Set preview for display only
      const previewUrl = URL.createObjectURL(file);
      setVariantPreviews(prev => ({ ...prev, [index]: previewUrl }));

      try {
        setIsLoading(true);
        const response = await uploadImage(file);
        // Important: set the server path in variants for saving
        updateVariantItem(index, 'image', response.data);
      } catch (error) {
        console.error("Variant upload failed", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleSave = async () => {
    if (!user?.id) return;

    setIsLoading(true);
    try {
      const payload: any = {
        userId: user.id,
        categoryId: productData.categoryId || "default_cat_id",
        name: productData.name,
        description: productData.description,
        price: parseFloat(productData.price) || 0,
        stock: parseInt(productData.stock) || 0,
        weight: parseFloat(productData.weight) || 0,
        sku: productData.sku,
        image: productData.image,
        isActive: productData.isActive,
        haveVariant: isVariantEnabled,
        optionValues: isVariantEnabled ? variantOptions : [],
        productVariants: isVariantEnabled ? generatedVariants.map(v => ({
          sku: v.sku,
          stock: parseInt(v.stock) || 0,
          price: parseFloat(v.price) || 0,
          image: v.image || "",
          optionValues: v.optionValues
        })) : []
      };

      if (isEdit && initialData?.id) {
        await updateProduct(initialData.id, { ...payload, id: initialData.id });
        addToast("Produk berhasil diperbarui", "success");
      } else {
        await addProduct(payload);
        addToast("Produk berhasil ditambahkan", "success");
      }

      router.push("/product-manager");
    } catch (error: any) {
      console.error("Save failed", error);
      addToast(error.message || "Gagal menyimpan produk", "error");
    } finally {
      setIsLoading(false);
    }
  };

  const addOptionValue = (index: number, value: string) => {
    if (!value.trim()) return;
    setVariantOptions(prev => {
      const newOptions = [...prev];
      if (!newOptions[index].values.includes(value)) {
        newOptions[index] = {
          ...newOptions[index],
          values: [...newOptions[index].values, value]
        };
        return newOptions;
      }
      return prev;
    });
  };

  const removeOptionValue = (optIndex: number, valIndex: number) => {
    setVariantOptions(prev => {
      const newOptions = [...prev];
      const newValues = [...newOptions[optIndex].values];
      newValues.splice(valIndex, 1);
      newOptions[optIndex] = {
        ...newOptions[optIndex],
        values: newValues
      };
      return newOptions;
    });
  };

  const addVariantOption = () => {
    setVariantOptions(prev => [...prev, { option: "", values: [] }]);
  };

  const updateOptionName = (index: number, name: string) => {
    setVariantOptions(prev => {
      const newOptions = [...prev];
      newOptions[index] = { ...newOptions[index], option: name };
      return newOptions;
    });
  };

  const removeVariantOption = (index: number) => {
    setVariantOptions(prev => {
      const newOptions = [...prev];
      newOptions.splice(index, 1);
      return newOptions;
    });
  };

  const updateVariantItem = (index: number, field: keyof VariantItem, value: any) => {
    setGeneratedVariants(prev => {
      const newVariants = [...prev];
      newVariants[index] = { ...newVariants[index], [field]: value };
      return newVariants;
    });
  };

  return (
    <div className="flex flex-col space-y-6 md:space-y-8 min-h-screen animate-in fade-in duration-500 w-full pb-24">
      {/* Header */}
      <div className="flex items-center gap-4 mt-6 px-4 md:px-0">
        <Button
          variant="secondary"
          moveTo="/product-manager"
          label=""
          iconPosition="mid"
          className="size-11 p-0 rounded-2xl flex items-center justify-center hover:bg-white hover:shadow-md transition-all shrink-0 border border-gray-100 shadow-xs"
          icon={<Icon icon="solar:alt-arrow-left-bold" width={22} />}
        />
        <div>
          <h1 className="text-xl md:text-2xl poppins-bold text-foreground leading-none">
            {isEdit ? "Edit Product" : "Add New Product"}
          </h1>
          <p className="text-xs text-muted-foreground mt-2 font-medium">
            {isEdit ? "Update your product information" : "Lengkapi informasi product baru Anda"}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <GeneralSection
            productData={productData}
            categories={categories}
            onChange={handleChange}
            onCategoryChange={(categoryId) => setProductData(prev => ({ ...prev, categoryId }))}
          />

          <InventorySection
            productData={productData}
            isVariantEnabled={isVariantEnabled}
            onChange={handleChange}
          />

          <VariantSection
            isVariantEnabled={isVariantEnabled}
            setIsVariantEnabled={setIsVariantEnabled}
            variantOptions={variantOptions}
            generatedVariants={generatedVariants.map((v, idx) => ({
              ...v,
              image: variantPreviews[idx] || v.image
            }))}
            addVariantOption={addVariantOption}
            removeVariantOption={removeVariantOption}
            updateOptionName={updateOptionName}
            addOptionValue={addOptionValue}
            removeOptionValue={removeOptionValue}
            updateVariantItem={updateVariantItem}
            onVariantImageUpload={handleVariantImageUpload}
          />
        </div>

        <div className="space-y-8">
          <MediaSection
            image={mainPreview || productData.image}
            onImageUpload={handleMainImageUpload}
          />

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
      <div className="sticky bottom-0 w-full z-50 px-4 md:px-0 mt-auto pb-6">
        <div className="mx-auto max-w-5xl p-4 sm:p-5 bg-white/90 backdrop-blur-2xl border border-white/50 shadow-2xl rounded-2xl sm:rounded-3xl flex flex-col sm:flex-row justify-between items-center gap-4 animate-in fade-in slide-in-from-bottom-8 duration-500">
          <div className="flex items-center gap-4 sm:ml-4 w-full sm:w-auto justify-center sm:justify-start">
            <div className="bg-primary/10 text-primary w-12 h-12 rounded-2xl flex items-center justify-center font-black shadow-inner border border-primary/5">
              <Icon icon="solar:box-minimalistic-bold-duotone" width={24} />
            </div>
            <div className="flex flex-col text-center sm:text-left overflow-hidden">
              <span className="text-[9px] sm:text-[10px] font-bold text-gray-900 uppercase tracking-tighter truncate">
                {isEdit ? "Update Changes" : "Create Product"}
              </span>
              <span className="text-[8px] sm:text-[9px] text-muted-foreground font-medium italic truncate">
                {isEdit ? "Ready to update inventory" : "Ready to save to inventory"}
              </span>
            </div>
          </div>
          <div className="flex gap-3 sm:gap-4 w-full sm:w-auto">
            <Button
              variant="secondary"
              label="Cancel"
              moveTo="/product-manager"
              className="h-10 sm:h-auto px-6 sm:px-10 rounded-xl sm:rounded-2xl font-semibold text-[8px] sm:text-[10px] bg-gray-50 border-gray-100 hover:bg-gray-100 flex-1 sm:flex-none uppercase tracking-wider"
            />
            <Button
              variant="primary"
              label={isLoading ? (isEdit ? "Updating..." : "Creating...") : (isEdit ? "Simpan Perubahan" : "Tambahkan Product")}
              onClick={handleSave}
              disabled={isLoading}
              className="h-11 sm:h-auto px-8 sm:px-12 rounded-xl sm:rounded-2xl font-bold shadow-xl shadow-primary/30 hover:scale-[1.02] active:scale-[0.98] transition-all text-[9px] sm:text-[10px] flex-[2] sm:flex-none uppercase tracking-wider"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export { AddProduct };

