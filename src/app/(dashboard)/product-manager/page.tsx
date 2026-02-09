"use client";
import { useState } from "react";
import { Button } from "@/src/components/ui/Button";
import { Input } from "@/src/components/ui/Input";
import { SearchBar } from "@/src/components/ui/SearchBar";
import { Icon } from "@iconify/react";
import TableActions from "@/src/components/ui/TableActions";
import { PaginationDemo } from "@/src/components/ui/Pagination";

const Page = () => {
  const [openFilter, setOpenFilter] = useState(false);

  const handleOpenFilter = () => {
    setOpenFilter(!openFilter);
  };

  return (
    <>
      <div className="Add-product mt-6 py-4 bg-white items-center border-2 rounded-lg">
        <div className="flex justify-between items-center mx-9">
          <SearchBar
            placeholder="Search Products..."
            className="w-80"
            variant="secondary"
          />
          <div className="flex gap-5">
            <Button
              label="Filter"
              variant="custom"
              icon={<Icon icon="mdi:filter" width={20} />}
              iconPosition="left"
              onClick={handleOpenFilter}
              className="flex gap-2.5 text-[16px] text-gray-500 rounded-lg border-4 border-[#575555] hover:border-[#01D2B3] py-3 px-10"
            />

            <Button
              label="Add Product"
              variant="custom"
              icon={<Icon icon="ic:baseline-plus" width={20} />}
              iconPosition="left"
              moveTo="/product-manager/add-product"
              className="flex gap-2.5 text-[16px] bg-linear-to-r from-[#00D2B2] to-[#7cfce9] text-white justify-center px-10 py-3 rounded-lg"
            />
          </div>
        </div>
        {openFilter && (
          <>
            <hr className="my-3.75" />
            <div className="grid grid-cols-4 gap-5.5 mx-9">
              <div className="filterBySku flex flex-col">
                <p>SKU</p>
                <Input
                  placeholder=""
                  variant="custom"
                  className="p-2 rounded-lg border-2 border-[#767373]"
                />
              </div>
              <div className="filterBySku flex flex-col">
                <p>Kategori</p>
                <Input
                  placeholder=""
                  variant="custom"
                  className="p-2 rounded-lg border-2 border-[#767373]"
                />
              </div>
              <div className="filterBySku flex flex-col">
                <p>Harga</p>
                <Input
                  placeholder=""
                  variant="custom"
                  className="p-2 rounded-lg border-2 border-[#767373]"
                />
              </div>
              <div className="filterBySku flex flex-col">
                <p>Status</p>
                <Input
                  placeholder=""
                  variant="custom"
                  className="p-2 rounded-lg border-2 border-[#767373]"
                />
              </div>
            </div>
          </>
        )}
      </div>
      <div className="flex flex-col mt-3.5 py-4 bg-white w-full rounded-lg">
        <div className="mx-9">
          <TableActions />
        </div>
        <div className="flex items-center justify-between px-11 pt-2 border-t text-xs w-full">
          <p>
            Show Data <span className="border p-1 rounded">17</span> of 200
          </p>
          <div className="flex justify-end">
            <PaginationDemo />
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
