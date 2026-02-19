import { Switch } from "@/components/ui/switch";
import { Icon } from "@iconify/react";
import React from "react";

const page = () => {
  return (
    <div className="mt-6 p-9 bg-white text-[#655E5E]">
      <div className="header">
        <h1 className="text-4xl font-medium text-[#01D2B3]">Detail Product</h1>
        <p className="text-[#655E5E] my-2">
          Pastikan data yang diubah sudah benar sebelum disimpan
        </p>
        <hr />
      </div>
      {/* konten */}
      <div className="w-full flex justify-center items-center m-5">
        <div className="w-112.5 h-87.5 bg-blue-300 rounded-lg"></div>
      </div>
      <div className="flex flex-col gap-5">
        <div>
          <p className="mb-2.5">Nama product</p>
          <div className="w-full h-15 bg-gray-200 rounded-lg"></div>
        </div>
        <div>
          <p className="mb-2.5">Deskripsi product</p>
          <div className="w-full h-15 bg-gray-200 rounded-lg"></div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-x-15">
        <div className="product-name mt-6">
          <p className="mb-2.5">SKU product</p>
          <div className="w-full h-15 bg-gray-200 rounded-lg"></div>
        </div>
        <div className="product-name mt-6">
          <p className="mb-2.5">Kategori product</p>
          <div className="w-full h-15 bg-gray-200 rounded-lg"></div>
        </div>
        <div className="product-name mt-6">
          <p className="mb-2.5">Berat product (optionaal)</p>
          <div className="w-full h-15 bg-gray-200 rounded-lg"></div>
        </div>
        <div className="product-name mt-6">
          <p className="mb-2.5">Harga jual toko</p>
          <div className="w-full h-15 bg-gray-200 rounded-lg"></div>
        </div>
        <div className="product-name mt-6">
          <p className="mb-2.5">Stock Product (semua)</p>
          <div className="w-full h-15 bg-gray-200 rounded-lg"></div>
        </div>
        <div className="flex items-center gap-4 mt-14.5 w-full h-15">
          <Switch size="xl" />
          <div>
            <p>Enable Variant</p>
            <p className="text-sm text-[#A4A4A4]">
              (Aktif jika product memiliki tipe yang berbeda)
            </p>
          </div>
        </div>
      </div>
      {/* Variant Produk */}
      <div className="mt-10">
        <p className="text-2xl font-medium mb-8">Variant Produk</p>
        <div className="flex gap-15 w-full">
          <div className="w-1/4">
            <p className="mb-2.5">Opsi variant</p>
            <div className="w-full h-15 bg-gray-200 rounded-lg"></div>
          </div>
          <div className="w-3/4">
            <p className="mb-2.5">Value variant</p>
            <div className="w-full h-15 bg-gray-200 rounded-lg"></div>
          </div>
        </div>
      </div>
      {/* Generate Variant */}
      <div className="flex text-[#01D2B3]">
        <Icon icon="ic:baseline-plus" width={24}/>
        <p>Opsi Variant</p>
        <p>Generate Variant</p>
      </div>
    </div>
  );
};

export default page;
