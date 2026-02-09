"use client"
import { Input } from "@/src/components/ui/Input";
import { Icon } from "@iconify/react";
import { Button } from "@/src/components/ui/Button"
import React from "react";

const page = () => {
  return (
    <div className="mt-6 p-9 bg-white text-[#655E5E]">
      <div className="header">
        <h1 className="text-4xl font-medium text-[#01D2B3]">Add Product</h1>
        <p className="text-[#655E5E] my-2">Lengkapi informasi product</p>
        <hr />
      </div>
      {/* upload */}
      <div className="flex justify-center mt-5">
        <div className="relative upload-file flex flex-col h-87.5 w-112.5 rounded-lg border items-center justify-center">
          <Icon icon="bxs:image-add" width={140} />
          <label htmlFor="">
            <Input
              placeholder=""
              type="file"
              variant="custom"
              className="absolute top-0 left-0 w-full h-full opacity-0"
            />
            Upload Image
          </label>
        </div>
      </div>
      <div className="inputan">
        <div className="product-name mt-6">
          <p className="mb-2.5 text-xl">Nama product</p>
          <Input placeholder="Masukan Nama Product" />
        </div>
        <div className="product-name mt-6">
          <p className="mb-2.5 text-xl">Deskripsi product</p>
          <textarea
            name=""
            id=""
            className="w-full h-auto border rounded-lg"
          ></textarea>
        </div>
        {/* 2 kolom input */}
        <div className="grid grid-cols-2 gap-x-15">
          <div className="product-name mt-6">
            <p className="mb-2.5 text-xl">SKU product</p>
            <Input placeholder="Masukan Nama Product" />
          </div>
          <div className="product-name mt-6">
            <p className="mb-2.5 text-xl">Kategori product</p>
            <Input placeholder="Masukan Nama Product" />
          </div>
          <div className="product-name mt-6">
            <p className="mb-2.5 text-xl">Berat product (optionaal)</p>
            <Input placeholder="Masukan Nama Product" />
          </div>
          <div className="product-name mt-6">
            <p className="mb-2.5 text-xl">Harga jual toko</p>
            <Input placeholder="Masukan Nama Product" />
          </div>
          <div className="product-name mt-6">
            <p className="mb-2.5 text-xl">Stock Product (semua)</p>
            <Input placeholder="Masukan Nama Product" />
          </div>
        </div>
        <div className="selection-info flex items-center justify-end mt-5 p-5 bg-[#01D2B3] rounded-lg text-gray-500 font-medium">
        <div className="flex">
          <Button
            variant="custom"
            label="Tambahkan product"
          />
        </div>
      </div>
      </div>
    </div>
  );
};

export default page;
