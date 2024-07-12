import { FormControl } from '@angular/forms';

export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
  tags: string[];
  sku?: string;
}

export interface Category {
  slug: string;
  name: string;
  url: string;
}

export interface ProductForm {
  id: FormControl<number>;
  title: FormControl<string>;
  description: FormControl<string>;
  price: FormControl<number | null>;
  discountPercentage: FormControl<number>;
  rating: FormControl<number | null>;
  stock: FormControl<number>;
  brand: FormControl<string>;
  category: FormControl<string>;
  thumbnail: FormControl<string>;
  images: FormControl<string[]>;
  tags: FormControl<string[]>;
  sku?: FormControl<string>;
}
