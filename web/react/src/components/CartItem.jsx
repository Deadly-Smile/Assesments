/* eslint-disable react/prop-types */

import { useGetTheProductQuery } from "../store";

const CartItem = ({
  index,
  item,
  handleAddItem,
  handleRemoveItem,
  handleDeleteItem,
}) => {
  const { data } = useGetTheProductQuery({ id: item.product_id });

  return (
    <div
      key={index}
      className="card items-center mx-auto bg-base-100 w-1/2 shadow-xl"
    >
      <div className="card-body justify-between">
        <div className="card-actions justify-end">
          <button
            className="btn btn-square btn-sm"
            onClick={() => handleDeleteItem(item?.id)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div className="flex justify-between">
          <img
            src={data?.images[0]}
            alt={data?.title}
            className="w-48 h-48 object-cover rounded-lg"
          />
          <div>
            <h3 className="text-lg font-semibold">{data?.title}</h3>
            <p className="text-sm text-gray-700">
              ${item?.price} X {item.quantity} = ${item?.price * item.quantity}
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <button
              className="btn btn-sm btn-ghost btn-square"
              onClick={() => handleRemoveItem(item?.product_id, item?.quantity)}
            >
              -
            </button>
            <span className="text-xl">{item.quantity}</span>{" "}
            <button
              className="btn btn-sm btn-ghost btn-square"
              onClick={() => handleAddItem(item?.product_id)}
            >
              +
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
