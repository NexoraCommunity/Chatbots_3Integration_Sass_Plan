"use client";

import { useState } from "react";
import { Button } from "@/src/components/ui/Button";
import { Input } from "@/src/components/ui/Input";
import { SearchBar } from "@/src/components/ui/SearchBar";
import { Icon } from "@iconify/react";
import TableActions from "@/src/components/ui/TableActions";
import { PaginationDemo } from "@/src/components/ui/Pagination";
import { Cards } from "@/src/components/ui/Cards";

const Page = () => {
  const [openFilter, setOpenFilter] = useState(false);

  const handleOpenFilter = () => {
    setOpenFilter(!openFilter);
  };

  return (
    <div className="h-full flex flex-col space-y-6 animate-in fade-in duration-500">
      {/* Header Section */}
      <Cards className="p-1 px-1 bg-white border-gray-100 shadow-sm overflow-visible">
        <div className="flex flex-col md:flex-row justify-between items-center p-6 gap-4">
          <SearchBar
            placeholder="Search products..."
            className="w-full md:w-80 h-11"
            variant="secondary"
          />
          <div className="flex items-center gap-3 w-full md:w-auto">
            <Button
              label={openFilter ? "Hide Filters" : "Filters"}
              variant="secondary"
              icon={<Icon icon={openFilter ? "solar:filter-cross-bold-duotone" : "solar:filter-bold-duotone"} width={20} />}
              iconPosition="left"
              onClick={handleOpenFilter}
              className={`h-11 px-6 border-gray-100 font-bold transition-all ${openFilter ? 'bg-primary/10 text-primary border-primary/20' : ''}`}
            />
            <Button
              label="Add Product"
              variant="primary"
              icon={<Icon icon="solar:add-circle-bold-duotone" width={20} />}
              iconPosition="left"
              moveTo="/product-manager/add-product"
              className="h-11 px-8 font-bold shadow-lg shadow-primary/20"
            />
          </div>
        </div>

        {openFilter && (
          <div className="px-6 pb-6 animate-in slide-in-from-top-4 duration-300">
            <hr className="mb-6 border-gray-50" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <FilterField label="SKU" icon="solar:hashtag-bold-duotone" />
              <FilterField label="Category" icon="solar:widget-bold-duotone" />
              <FilterField label="Price Range" icon="solar:tag-bold-duotone" />
              <FilterField label="Status" icon="solar:check-circle-bold-duotone" />
            </div>
          </div>
        )}
      </Cards>

      {/* Table Section */}
      <Cards className="flex-1 bg-white border-gray-100 shadow-sm flex flex-col p-0 overflow-hidden">
        <div className="p-6 flex-1 overflow-x-auto">
          <TableActions />
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between p-6 border-t border-gray-50 bg-gray-50/30 gap-4">
          <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest bg-white px-3 py-1.5 rounded-full border border-gray-100 shadow-sm">
            Showing <span className="text-gray-800">1-10</span> of <span className="text-gray-800">124</span> products
          </div>
          <div className="scale-90 sm:scale-100">
            <PaginationDemo />
          </div>
        </div>
      </Cards>
    </div>
  );
};

const FilterField = ({ label, icon }: { label: string; icon: string }) => (
  <div className="flex flex-col space-y-2 group">
    <div className="flex items-center gap-2">
      <Icon icon={icon} className="text-gray-400 group-focus-within:text-primary transition-colors" width={14} />
      <p className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">{label}</p>
    </div>
    <Input
      placeholder={`Filter by ${label.toLowerCase()}...`}
      variant="secondary"
      className="h-10 text-xs border-gray-100 focus:border-primary/30 transition-all rounded-xl"
    />
  </div>
);

export default Page;
