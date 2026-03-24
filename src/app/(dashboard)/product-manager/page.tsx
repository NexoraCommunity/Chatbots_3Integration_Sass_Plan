"use client";

import { useEffect, useState } from "react";
import { Button } from "@/src/components/ui/Button";
import { Input } from "@/src/components/ui/Input";
import { SearchBar } from "@/src/components/ui/SearchBar";
import { Icon } from "@iconify/react";
import { Cards } from "@/src/components/ui/Cards";
import { useProductStore } from "@/src/store/product/product.store";
import { useAuthStore } from "@/src/store/authentication/auth.store";
import ProductTable from "./components/ProductTable";
import { AppPagination } from "@/src/components/ui/Pagination";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useCategoryStore } from "@/src/store/category/category.store";
import { DeleteProductModal } from "@/src/components/ui/modal/DeleteProductModal";
import { useToastStore } from "@/src/store/ui/toast.store";

const Page = () => {
  const { user } = useAuthStore();
  const {
    products,
    fetchProducts,
    pagination,
    isLoading,
    removeProduct
  } = useProductStore();
  const { categories, fetchCategories } = useCategoryStore();
  const { addToast } = useToastStore();

  const [openFilter, setOpenFilter] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [filters, setFilters] = useState({
    sku: "",
    categoryId: "",
    harga: "",
    status: "",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (user?.id && user?.userSubcription && user.userSubcription.length > 0) {
      fetchCategories({ page: "1", limit: "100" });
    }
  }, [user?.id, user?.userSubcription, fetchCategories]);

  useEffect(() => {
    loadProducts()
  }, [user?.id, currentPage, debouncedSearch, filters]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchQuery);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const loadProducts = async () => {
    setIsError(false);

    try {
      const query = {
        userId: user?.id,
        page: currentPage.toString(),
        limit: "10",
        name: debouncedSearch || undefined,
        sku: filters.sku || undefined,
        categoryId: filters.categoryId || undefined,
        price: filters.harga || undefined,
        isActive: filters.status || undefined,
      };
      console.log("Loading products with query:", query);
      await fetchProducts(query);
    } catch (error: any) {
      console.error("Failed to load products:", error);
      setIsError(true);
      addToast(error.message || "Gagal memuat daftar produk. Silakan coba lagi.", "error");
    }
  };

  const handleOpenFilter = () => {
    setOpenFilter(!openFilter);
  };

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setCurrentPage(1);
  };

  const handleDeleteClick = (id: string) => {
    setSelectedProductId(id);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (selectedProductId) {
      try {
        await removeProduct(selectedProductId);
        setIsDeleteModalOpen(false);
        addToast("Produk berhasil dihapus", "success");
        loadProducts();
      } catch (error: any) {
        console.error("Failed to delete product:", error);
        addToast(error.message || "Gagal menghapus produk", "error");
      }
    }
  };

  return (
    <div className="flex flex-col space-y-6 animate-in fade-in duration-500">
      {/* Header Section */}
      <Cards className="p-1 px-1 bg-white border-gray-100 shadow-sm overflow-visible">
        <div className="flex flex-col md:flex-row justify-between items-center p-6 gap-4">
          <SearchBar
            placeholder="Search products..."
            className="w-full md:w-80 h-11"
            variant="secondary"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <div className="flex items-center gap-2 md:gap-3 w-full md:w-auto md:justify-end justify-between">
            <Button
              variant="secondary"
              onClick={handleOpenFilter}
              className={`h-11 px-4 md:px-6 border-gray-100 font-bold transition-all ${openFilter ? 'bg-primary/10 text-primary border-primary/20' : ''}`}
            >
              <Icon icon={openFilter ? "solar:close-circle-bold-duotone" : "solar:filter-bold-duotone"} width={20} />
              <span className="hidden sm:inline ml-2">{openFilter ? "Hide Filters" : "Filters"}</span>
            </Button>
            <Button
              variant="primary"
              moveTo="/product-manager/add-product"
              className="h-11 px-4 md:px-8 font-bold shadow-lg shadow-primary/20"
            >
              <Icon icon="solar:add-circle-bold-duotone" width={20} />
              <span className="hidden sm:inline ml-2">Add Product</span>
            </Button>
          </div>
        </div>

        {openFilter && (
          <div className="px-6 pb-6 animate-in slide-in-from-top-4 duration-300">
            <hr className="mb-6 border-gray-50" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <FilterField
                label="SKU"
                icon="solar:hashtag-bold-duotone"
                value={filters.sku}
                onChange={(v: string) => handleFilterChange('sku', v)}
              />
              <DropdownFilterField
                label="Category"
                icon="solar:widget-bold-duotone"
                value={filters.categoryId}
                options={(categories || []).map((c: any) => ({ label: c.name, value: c.id }))}
                placeholder="All Categories"
                onChange={(v: string) => handleFilterChange('categoryId', v)}
              />
              <FilterField
                label="Price Range"
                icon="solar:tag-bold-duotone"
                value={filters.harga}
                onChange={(v: string) => handleFilterChange('harga', v)}
              />
              <DropdownFilterField
                label="Status"
                icon="solar:check-circle-bold-duotone"
                value={filters.status}
                options={[
                  { label: "Active", value: "true" },
                  { label: "Inactive", value: "false" }
                ]}
                placeholder="All Status"
                onChange={(v: string) => handleFilterChange('status', v)}
              />
            </div>
          </div>
        )}
      </Cards>

      {/* Table Section */}
      <Cards className="bg-white border-gray-100 shadow-sm flex flex-col p-0">
        <div className="p-4 md:p-6 flex-1 min-h-[400px]">
          {isError ? (
            <div className="flex flex-col items-center justify-center h-full py-20 text-center animate-in fade-in zoom-in duration-500">
              <div className="bg-red-50 p-6 rounded-full mb-6">
                <Icon icon="solar:danger-bold-duotone" width={64} className="text-red-500" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 poppins-bold mb-2">Oops! Something went wrong</h3>
              <p className="text-gray-500 max-w-sm mb-8 poppins-medium">
                We encountered an error while trying to load your products. Please try again.
              </p>
              <Button
                variant="secondary"
                onClick={() => loadProducts()}
                className="h-12 px-10 font-bold border-gray-200"
              >
                <Icon icon="solar:restart-bold-duotone" width={20} className="mr-2" />
                Retry Loading
              </Button>
            </div>
          ) : isLoading ? (
            <div className="flex flex-col items-center justify-center h-full py-20 grayscale opacity-50">
              <Icon icon="solar:box-minimalistic-bold-duotone" width={48} className="animate-pulse" />
              <p className="mt-4 font-bold text-gray-400">Loading products...</p>
            </div>
          ) : (
            <ProductTable products={products} onDelete={handleDeleteClick} />
          )}
        </div>

        {products.length > 0 && (
          <div className="flex flex-col sm:flex-row items-center justify-between p-6 border-t border-gray-50 bg-gray-50/30 gap-4">
            <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest bg-white px-3 py-1.5 rounded-full border border-gray-100 shadow-sm">
              Showing <span className="text-gray-800">{(pagination.page - 1) * pagination.pageSize + 1}-{Math.min(pagination.page * pagination.pageSize, pagination.totalItems)}</span> of <span className="text-gray-800">{pagination.totalItems}</span> products
            </div>
            <div className="scale-90 sm:scale-100">
              <AppPagination 
                currentPage={currentPage}
                totalPages={pagination.totalPages}
                onPageChange={setCurrentPage}
              />
            </div>
          </div>
        )}
      </Cards>

      <DeleteProductModal
        open={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
};

const FilterField = ({ label, icon, value, onChange }: { label: string; icon: string; value: string; onChange: (v: string) => void }) => (
  <div className="flex flex-col space-y-2 group">
    <div className="flex items-center gap-2">
      <Icon icon={icon} className="text-gray-400 group-focus-within:text-primary transition-colors" width={14} />
      <p className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">{label}</p>
    </div>
    <Input
      placeholder={`Filter by ${label.toLowerCase()}...`}
      variant="secondary"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="h-10 text-xs border-gray-100 focus:border-primary/30 transition-all rounded-xl"
    />
  </div>
);

const DropdownFilterField = ({
  label,
  icon,
  value,
  options,
  placeholder,
  onChange
}: {
  label: string;
  icon: string;
  value: string;
  options: { label: string; value: string }[];
  placeholder: string;
  onChange: (v: string) => void
}) => (
  <div className="flex flex-col space-y-2 group">
    <div className="flex items-center gap-2">
      <Icon icon={icon} className="text-gray-400 group-focus-within:text-primary transition-colors" width={14} />
      <p className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">{label}</p>
    </div>
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="w-full flex items-center justify-between bg-gray-50/50 border border-gray-100 h-10 px-4 text-[11px] font-bold rounded-xl hover:bg-white transition-all text-left group">
          <span className={value ? "text-gray-700" : "text-gray-400 font-normal"}>
            {value ? (options.find(o => o.value === value)?.label || value) : placeholder}
          </span>
          <Icon icon="solar:alt-arrow-down-bold" className="text-gray-400 group-hover:text-primary transition-colors" width={14} />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-48 p-2 rounded-xl border-gray-100 shadow-xl max-h-[300px] overflow-y-auto">
        <DropdownMenuItem
          onClick={() => onChange("")}
          className="rounded-lg font-bold text-[10px] py-2 cursor-pointer hover:bg-primary/5 hover:text-primary"
        >
          {placeholder}
        </DropdownMenuItem>
        {options.map((opt) => (
          <DropdownMenuItem
            key={opt.value}
            onClick={() => onChange(opt.value)}
            className="rounded-lg font-bold text-[10px] py-2 cursor-pointer hover:bg-primary/5 hover:text-primary"
          >
            {opt.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  </div>
);

export default Page;

