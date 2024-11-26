import CartItem from "./CartItem";
import {
  useAddToCartMutation,
  useDeleteCartItemsMutation,
  useEditCartItemsMutation,
} from "../store";
import { useContext } from "react";
import CartContext from "../context/CartContext";

const Cart = () => {
  const cart = useContext(CartContext).cart;

  const [addToCart, addResult] = useAddToCartMutation();
  const [editCartItems, editResult] = useEditCartItemsMutation();
  const [deleteCartItems, deleteResult] = useDeleteCartItemsMutation();

  const handleAddItem = (id) => {
    addToCart({ productId: id, amount: 1 });
  };

  const handleRemoveItem = (id, amount) => {
    editCartItems({ productId: id, amount: amount - 1 });
  };

  const handleDeleteItem = (id) => {
    deleteCartItems({ cart_item_id: id });
  };

  const renderCartItems = () => {
    return (
      <div className="mt-4 space-y-4">
        {cart?.items.map((item, index) => (
          <CartItem
            key={index}
            index={index}
            item={item}
            handleAddItem={() => handleAddItem(item)}
            handleRemoveItem={() => handleRemoveItem(item)}
            handleDeleteItem={() => handleDeleteItem(item)}
          />
        ))}
      </div>
    );
  };
  return (
    <div className="my-4 mx-16">
      {cart?.items.length > 0 && renderCartItems()}
      {cart?.items.length === 0 && (
        <p className="text-xl text-gray-500">Cart is empty.</p>
      )}
      <div className="flex justify-end bg-blue-400 p-4 mx-8 round">
        <p className="text-lg font-semibold">Total: ${cart?.total_price}</p>
      </div>
    </div>
  );
};

export default Cart;
