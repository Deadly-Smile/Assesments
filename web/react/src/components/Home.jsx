import { useEffect, useState } from "react";
import { useAddToCartMutation, useGetProductsQuery } from "../store";

const Home = () => {
  const { data, isSuccess, isLoading } = useGetProductsQuery();
  const [products, setProducts] = useState([]);
  const [addToCart, result] = useAddToCartMutation();

  useEffect(() => {
    if (isSuccess) {
      setProducts(data.products);
    }
  }, [isSuccess, data]);

  const handleAddToCart = (id) => {
    addToCart({ productId: id, amount: 1 });
  };

  useEffect(() => {
    if (result.isSuccess) {
      console.log("Added to cart successfully");
    } else {
      console.error("Error adding to cart:", result.error);
    }
  }, [result.error, result.isSuccess]);

  return (
    <div className="container mx-auto p-4">
      {isLoading && (
        <div className="flex justify-center items-center h-screen">
          <p className="text-lg font-semibold text-gray-600">Loading...</p>
        </div>
      )}
      {isSuccess && products.length === 0 && (
        <div className="flex justify-center items-center h-screen">
          <p className="text-lg font-semibold text-gray-600">
            No products found.
          </p>
        </div>
      )}
      {isSuccess && (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((product) => (
            <div
              key={product.id}
              className="card bg-white shadow-md rounded-lg overflow-hidden transition-transform transform hover:scale-105"
              title={product.description}
            >
              <figure className="relative">
                <img
                  src={product.images[0]}
                  alt={product.title}
                  className="w-full h-48 object-cover"
                />
              </figure>
              <div className="p-4">
                <h2 className="card-title text-lg font-bold text-gray-800 mb-2">
                  {product.title}
                </h2>
                <div className="flex justify-between">
                  <p className="">Rating-{product.rating}</p>
                  <p className="text-2xl">${product.price}</p>
                </div>

                <div className="card-actions mt-4">
                  <button
                    className="btn bg-blue-600 w-full py-2 text-white rounded-lg"
                    onClick={() => {
                      handleAddToCart(product.id);
                    }}
                  >
                    Add to cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
