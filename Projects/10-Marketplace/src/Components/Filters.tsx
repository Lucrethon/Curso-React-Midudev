import React, { useState } from "react"
import { PRODUCT_CATEGORY } from "../types"

const Options = () => {
    return (
        Object.values(PRODUCT_CATEGORY).map((category: string) => {
            return (
                <option value={category}>{category.toUpperCase()}</option>
            )
        })
    )
}

export const Filters = () => {

    // para mostrar el rango de precio en el filtro de precio se necesita un estado
    const [maxPrice, setMaxPrice] = useState(0)

    const handleChangePrice = (event: React.ChangeEvent<HTMLInputElement>) => {
        setMaxPrice(Number(event.currentTarget.value))
    }

    return (
        <section className="filters">
            <div>
                <label htmlFor="price">Max Price</label>
                <input
                id='price'
                type="range"
                min={0}
                max={200}
                onChange={handleChangePrice}
                ></input>
                <span>{maxPrice}</span>
            </div>

            <div>
                <label htmlFor="category">Category</label>
                <select id="category">
                    <Options/>
                </select>
            </div>
        </section>
    )
}