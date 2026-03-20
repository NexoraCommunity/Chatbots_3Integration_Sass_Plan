"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { AddProduct } from "../../components/AddProduct";
import { useProductStore } from "@/src/store/product/product.store";
import { Icon } from "@iconify/react";

const EditProductPage = () => {
  const { id } = useParams();
  const { currentProduct, fetchProductById, isLoading } = useProductStore();
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  useEffect(() => {
    if (id) {
      fetchProductById(id as string).then(() => setIsDataLoaded(true));
    }
  }, [id, fetchProductById]);

  if (isLoading || !isDataLoaded) {
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
    <div className="animate-in fade-in duration-500">
      <AddProduct initialData={currentProduct} isEdit={true} />
    </div>
  );
};

export default EditProductPage;
