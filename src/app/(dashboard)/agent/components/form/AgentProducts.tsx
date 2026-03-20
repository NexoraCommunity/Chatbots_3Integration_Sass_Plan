import React from "react";
import { Icon } from "@iconify/react";
import { Cards, CardContent, CardHeader, CardTitle } from "@/src/components/ui/Cards";
import { SearchBar } from "@/src/components/ui/SearchBar";
import Image from "next/image";
import { ProductApi } from "@/src/model/product/product.model";

interface AgentProductsProps {
  selectedProducts: Set<string>;
  filteredProducts: ProductApi[];
  searchQuery: string;
  isLoading: boolean;
  readOnly?: boolean;
  onSearchChange?: (value: string) => void;
  onToggleProduct?: (id: string) => void;
  onToggleAll?: () => void;
}

const AgentProducts = React.memo(({
  selectedProducts,
  filteredProducts,
  searchQuery,
  isLoading,
  readOnly = false,
  onSearchChange,
  onToggleProduct,
  onToggleAll,
}: AgentProductsProps) => {
  return (
    <Cards>
      <CardHeader className="flex flex-col  items-start  justify-between gap-6 pb-7 border-b border-gray-50/50 bg-gray-50/30">
        <div className="flex sm:items-center sm:flex-row flex-col gap-4">
          <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-500">
            <Icon icon="solar:box-minimalistic-bold-duotone" width={28} />
          </div>
          <div>
            <CardTitle className="text-xl poppins-bold text-gray-900">Product Knowledge</CardTitle>
            <p className="text-sm text-muted-foreground font-medium">Select specific products for the agent's knowledge</p>
          </div>
        </div>
        {!readOnly && (
          <div className="flex sm:items-center sm:justify-between items-center sm:flex-row flex-col gap-3 sm:w-full w-full">
            <div className="relative w-full sm:w-64">
              <SearchBar
                value={searchQuery}
                //@ts-ignore
                onChange={(e) => onSearchChange?.(e.target.value)}
                placeholder="Search by name or SKU..."
                className="h-11 font-bold text-sm"
                variant="miniDefault"
              />
            </div>
            <button
              onClick={onToggleAll}
              className={`whitespace-nowrap h-11 px-6 rounded-xl font-black text-sm transition-all border-2 ${selectedProducts.size === filteredProducts.length && filteredProducts.length > 0
                ? "bg-blue-500 text-white border-blue-500 shadow-lg shadow-blue-500/20"
                : "bg-white text-gray-900 border-gray-100 hover:border-blue-500 hover:text-blue-500"
                }`}
            >
              {selectedProducts.size === filteredProducts.length && filteredProducts.length > 0 ? "Deselect All" : "Select All"}
            </button>
          </div>
        )}
      </CardHeader>
      <CardContent className="p-5 sm:p-8">
        {isLoading ? (
          <div className="py-20 flex flex-col items-center justify-center gap-4 animate-pulse">
            <div className="w-16 h-16 rounded-full border-4 border-blue-100 border-t-blue-500 animate-spin" />
            <p className="text-blue-500 font-black uppercase tracking-widest text-xs">Syncing Inventory...</p>
          </div>
        ) : filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                onClick={() => !readOnly && onToggleProduct?.(product.id)}
                className={`group relative p-6 rounded-[2.5rem] border-2 transition-all duration-500 flex flex-col items-center text-center gap-4 ${!readOnly ? "cursor-pointer" : "cursor-default"
                  } ${selectedProducts.has(product.id)
                    ? "border-blue-500 bg-blue-50/40 shadow-2xl shadow-blue-500/20 -translate-y-2"
                    : "border-gray-50 bg-white hover:border-blue-200 hover:shadow-2xl hover:shadow-gray-200/50 hover:-translate-y-2"
                  }`}
              >
                {/* Selection Glow Effect */}
                {selectedProducts.has(product.id) && (
                  <div className="absolute inset-0 rounded-[2.5rem] bg-blue-500/5 animate-pulse" />
                )}

                {/* Selection Badge - Top Right */}
                <div className={`absolute top-4 right-4 w-7 h-7 rounded-full border-2 flex items-center justify-center transition-all duration-500 z-20 ${selectedProducts.has(product.id)
                  ? "bg-blue-500 border-blue-500 shadow-lg shadow-blue-500/40 scale-110"
                  : "border-gray-100 bg-gray-50 group-hover:border-blue-200"
                  }`}>
                  {selectedProducts.has(product.id) ? (
                    <Icon icon="solar:check-read-bold" className="text-white w-4 h-4 animate-in zoom-in duration-300" />
                  ) : (
                    <div className="w-1 h-1 rounded-full bg-gray-200 group-hover:bg-blue-200 transition-colors" />
                  )}
                </div>

                <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-[2rem] overflow-hidden shrink-0 border-4 border-white shadow-xl group-hover:border-blue-50 transition-all duration-500 z-10">
                  {product.image ? (
                    <Image
                      src={product.image.startsWith("http")
                        ? product.image
                        : `/api-backend/${product.image.replace(/^\//, "")}`}
                      alt={product.name}
                      fill
                      className={`object-cover transition-all duration-700 group-hover:scale-110 ${!selectedProducts.has(product.id) && "grayscale-[20%] opacity-90 group-hover:grayscale-0 group-hover:opacity-100"}`}
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
                      <Icon icon="solar:box-minimalistic-bold-duotone" className="w-10 h-10 text-gray-200" />
                    </div>
                  )}
                </div>

                <div className="space-y-3 z-10 w-full">
                  <h4 className={`text-sm sm:text-base font-black line-clamp-2 min-h-[2.5rem] leading-tight tracking-tight px-1 ${selectedProducts.has(product.id) ? "text-blue-700" : "text-gray-900"}`}>
                    {product.name}
                  </h4>

                  <div className="flex flex-col items-center gap-2">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-gray-50 rounded-full border border-gray-100 shadow-sm">
                      <Icon icon="solar:tag-bold-duotone" className="w-3 h-3 text-gray-400" />
                      <span className="text-[9px] font-black text-gray-500 uppercase tracking-widest leading-none">
                        {product.sku || 'N/A'}
                      </span>
                    </div>

                    <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border shadow-sm ${product.stock > 10
                      ? "bg-green-50/50 border-green-100 text-green-600"
                      : "bg-orange-50/50 border-orange-100 text-orange-600"
                      }`}>
                      <div className={`w-1.5 h-1.5 rounded-full ${product.stock > 10 ? 'bg-green-500' : 'bg-orange-500'} animate-pulse`} />
                      <span className="text-[9px] font-black uppercase tracking-widest leading-none">
                        {product.stock} in stock
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-20 flex flex-col items-center justify-center gap-6 text-center animate-in fade-in duration-700">
            <div className="w-24 h-24 rounded-full bg-gray-50 flex items-center justify-center text-gray-300">
              <Icon icon="solar:box-line-duotone" width={60} />
            </div>
            <div>
              <p className="text-gray-900 font-black text-xl mb-1">No products found</p>
              <p className="text-sm text-gray-500 font-medium">Try adjusting your search filters or check your inventory.</p>
            </div>
          </div>
        )}
      </CardContent>
    </Cards>
  );
});

export default AgentProducts;
