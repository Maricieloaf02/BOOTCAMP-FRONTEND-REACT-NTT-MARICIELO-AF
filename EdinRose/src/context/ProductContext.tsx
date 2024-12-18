import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { Product } from '@/domain/Product';
import { fetchProducts } from '@/shared/utils/productService';

interface ProductContextProps {
  products: Product[];
  filteredProducts: Product[];
  search: string;
  category: string;
  setSearch: (query: string) => void;
  setCategory: (category: string) => void;
}

const ProductContext = createContext<ProductContextProps | undefined>(undefined);

export const ProductProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');

  useEffect(() => {
    const fetchAndSetProducts = async () => {
      try {
        const { products } = await fetchProducts(1, 10); // Página inicial y límite
        setProducts(products);
        setFilteredProducts(products);
      } catch (error) {
        console.error('Error al cargar los productos:', error);
      }
    };

    fetchAndSetProducts();
  }, []);

  useEffect(() => {
    let filtered = products;

    if (search) {
      filtered = filtered.filter((product) =>
        product.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (category) {
      filtered = filtered.filter((product) => product.category === category);
    }

    setFilteredProducts(filtered);
  }, [search, category, products]);

  return (
    <ProductContext.Provider
      value={{ products, filteredProducts, search, category, setSearch, setCategory }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export default ProductContext;
