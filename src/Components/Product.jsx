import React, { useReducer, useState } from "react";
import jsonData from "../Components/data.json";


export const Product = ({ addToCart, quantities }) => {

    const decrement = (productId, product) => {
        addToCart(product, 1);
    };

    const increment = (productId, product) => {
        if (quantities[productId] > 0) {
            addToCart(product, -1);
        }
    };

    return (

        <div className="w-1/2 border m-2">
            <h1 className="text-center text-3xl text-black">Products</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">

                {Object.values(jsonData).map((product) => (
                    <div
                        key={product.id}
                        className="border p-4 rounded-lg flex flex-col justify-between"
                    >
                        <div>

                            <h4 className="text-xl font-semibold mb-2 text-black">
                                {product.name}
                            </h4>

                            <p className=" text-red-400">
                                $<span className="text-green-400">{product.price}</span>
                            </p>

                        </div>

                        <div className="flex justify-between items-center mt-4">

                            <button
                                className="bg-gray-400 hover:bg-gray-500 text-red-400 font-bold py-2 px-4 rounded"
                                onClick={() => increment(product.id, product)}
                            >
                                -
                            </button>

                            <span className="bg-gray-200 px-4 py-2 rounded">
                                {quantities[product.id] || 0}
                            </span>


                            <button
                                className="bg-gray-400  hover:bg-gray-500 text-green-400 font-bold py-2 px-4 rounded"
                                onClick={() => decrement(product.id, product)}
                            >
                                +
                            </button>


                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
