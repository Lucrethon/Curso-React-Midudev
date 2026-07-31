import React, { useState } from "react"
import { PRODUCT_CATEGORY, type Category } from "../types"
import { useFilter } from "../Context/filters"

const Options = () => {
    return (
        Object.values(PRODUCT_CATEGORY).map((category: string) => {
            return (
                <option key={category} value={category}>{category.toUpperCase()}</option>
            )
        })
    )
}

export const Filters = () => {

    // para mostrar el rango de precio en el filtro de precio se necesita un estado
    const [maxPrice, setMaxPrice] = useState(0)
    // hook personalizado con el useContext 
    const { setFilters } = useFilter()

    const handleChangePrice = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newPrice = Number(event.currentTarget.value)
        // es importante leer el valor del evento de forma síncrona antes de utilizar un actualizador de estado
        // ya que React reutiliza los objetos de evento (SyntheticEvent) por razones de rendimiento. 
        // Una vez que la función del manejador de eventos ha finalizado su ejecución, React anula las propiedades del objeto event para poder reutilizarlo.
        // event se limpia y event.currentTarget es null.
        setMaxPrice(newPrice)
        setFilters(prevState => ({
            ...prevState,
            maxPrice: newPrice
        }))
    }

    const handleChangeCategory = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const newCategory = event.currentTarget.value as Category
        setFilters(prevState => ({
            ...prevState,
            category: newCategory
        }))
    }

    return (
        <section className="filters">
            <div>
                <label htmlFor="price">Max Price</label>
                <input
                id='price'
                type="range"
                min={0}
                max={3000}
                onChange={handleChangePrice}
                ></input>
                <span>{maxPrice}</span>
            </div>

            <div>
                <label htmlFor="category">Category</label>
                <select id="category" onChange={handleChangeCategory}>
                    <Options/>
                </select>
            </div>
        </section>
    )
}