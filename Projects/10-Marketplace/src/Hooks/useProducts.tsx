import { useState, useEffect, useCallback } from "react";
import type { Product, ProductList } from "../types";

export const useProducts = () => {

    const [products, setProducts] = useState<Product[]>([])
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(true)

    const getProducts = async ({endpoint} : {endpoint: string}) => {

        const controller = new AbortController()
        const anthena = controller.signal
        
        try {
            const response = await fetch(endpoint, {
                signal: anthena
            })
            if (!response.ok) throw new Error("Error de conexción")

            const data = await response.json() as ProductList
            setProducts(data.products)
        }
        catch(err) {
            if (err instanceof Error || err instanceof TypeError) {
                setError(err.message)
            } 
            else if (err instanceof Error && err.name === 'AbortError') {
                setError("Petición cancelada")
            }
            else {
                setError(String(err))
            }
        }
        finally {
            setLoading(false)
        }

        return () => {
            controller.abort()
        }
    }

    return {products, error, loading, getProducts}
}



