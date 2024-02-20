import React from "react";

const MenuItems = () => {
  return (
    <div className="bg-gray-200 p-4 rounded-xl text-center hover:bg-white hover:shadow-black/50 hover:shadow-lg transition-all ">
      <div className="text-center">
        <img src="/pizza.png" className=" max-h-36 block mx-auto" alt="" />
      </div>
      <h4 className="font-semibold my-2">Pepperoni pizza</h4>
      <p className="text-gray-500 text-sm">
        Lorem ipsum dolor sit amet consectetur adipisicing elit.{" "}
      </p>
      <button className="bg-primary text-white rounded-full px-6 py-2 mt-2">
        Add to cart $12
      </button>
    </div>
  );
};

export default MenuItems;
