export interface ProductApi {
  id: string;
  userId: string;
  categoryId: string;
  name: string;
  description: string;
  price: number;
  image: string;
  isActive: boolean;
  stock: number;
  sku: string;
  weight: number | null;
  haveVariant: boolean;
  createdAt: string;
  updatedAt: string;
  productVariants?: ProductVariantResponse[];
  variantOptions?: VariantOptionResponse[];
}

export interface ProductVariantResponse {
  id: string;
  productId: string;
  sku: string;
  stock: number;
  price: number;
  image: string;
  optionValue: OptionValueSingleResponse[];
}

export interface OptionValueSingleResponse {
  id: string;
  option: string;
  value: string;
  productVariantId: string;
}

export interface VariantOptionResponse {
  id: string;
  productId: string;
  name: string;
  values: VariantOptionValueResponse[];
}

export interface VariantOptionValueResponse {
  id: string;
  optionId: string;
  value: string;
}

export interface PostProduct {
  userId: string;
  categoryId: string;
  name: string;
  description: string;
  price: number;
  image: string;
  stock: number;
  sku: string;
  weight: number | null;
  haveVariant: boolean;
  isActive: boolean;
  optionValues: OptionValue[];
  productVariants: ProductVariantRequest[];
}

export interface ProductVariantRequest {
  sku: string;
  stock: number;
  price: number;
  image: string;
  optionValues: OptionValueSingleRequest[];
}

export interface OptionValueSingleRequest {
  option: string;
  value: string;
}

export interface OptionValue {
  option: string;
  values: string[];
}

export interface ChangeProduct extends PostProduct {
  id: string;
}

export interface GetModelProduct {
  userId?: string;
  categoryId?: string;
  name?: string;
  sku?: string;
  price?: string;
  isActive?: string;
  page: string;
  limit: string;
}

export interface ProductResponse {
  data: ProductApi[];
  pagination: {
    page: number;
    pageSize: number;
    totalItems: number;
    totalPages: number;
  };
  status: string;
}

export interface SingleProductResponse {
  data: ProductApi;
  status: string;
}
