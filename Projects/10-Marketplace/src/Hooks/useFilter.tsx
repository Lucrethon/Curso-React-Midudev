import { useState } from "react"
import type { Product, Filter, Category } from "../types"
import { PRODUCT_CATEGORY } from "../types"


export const useFilter = ({products} : {products : Product[]}) => {

       const [filters, setFilters] = useState<Filter>({
            category: PRODUCT_CATEGORY.all as Category, 
            maxPrice: 3000
        })
    
        const filterProducts = ({products}: {products: Product[]}) => {
            return (
                products.filter((product)=> {
                    return (
                        product.price <= filters.maxPrice && (
                        filters.category === 'all' ||
                        product.category === filters.category
                    ))
                })
            )
        }
    
        const filteredProducts = filterProducts({products})

        return {filteredProducts, setFilters, filters}
}