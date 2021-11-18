import React, {useState, useEffect} from 'react'
import { getProducts } from '../api/products'


export default function Products() {
    const [products, setProducts] = useState([])
    useEffect(async() => {
        const allProducts = await getProducts()
        setProducts(allProducts)
    }, [])
    console.log(allProducts)
    // console.log(products)
    return (
        <div>
            <h1>Products</h1>
        </div>
    )
}
