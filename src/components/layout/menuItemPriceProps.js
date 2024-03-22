"use client";
import Trash from "../../components/icons/Trash";
import Plus from "../../components/icons/Plus";
import ChevronDown from "../../components/icons/ChevronDown";
import ChevronUp from "../../components/icons/ChevronUp";
import { useState } from "react";
export default function MenuItemPriceProps({
  name,
  addLabel,
  props,
  setProps,
}) {
  const [isOpen, setIsOpen] = useState(false);
  function addSize() {
    setProps((oldSizes) => {
      return [...oldSizes, { name: "", price: 0 }];
    });
  }

  function editSize(e, index, prop) {
    const newValue = e.target.value;
    setProps((prevSizes) => {
      const newSizes = [...prevSizes];
      newSizes[index][prop] = newValue;
      return newSizes;
    });
  }
  function removeSize(indexToRemove) {
    setProps((prev) => prev.filter((v, i) => i !== indexToRemove));
  }

  return (
    <div className="bg-gray-200 py-2 rounded-md mb-2">
      <button
        type="button"
        className="inline-flex p-1 border-0"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {isOpen ? <ChevronUp /> : <ChevronDown />}
        <span>{name}</span>
        <span>({props?.length})</span>
      </button>
      <div className={isOpen ? "block" : "hidden"}>
        {props?.length > 0 &&
          props.map((size, index) => (
            <div className="flex gap-2 ml-1 items-end">
              <div>
                <label>Size name</label>
                <input
                  type="text"
                  placeholder="Size name"
                  value={size.name}
                  onChange={(e) => editSize(e, index, "name")}
                />
              </div>
              <div>
                <label>Extra Price</label>
                <input
                  type="text"
                  placeholder="Extra Price"
                  value={size.price}
                  onChange={(e) => editSize(e, index, "price")}
                />
              </div>
              <div>
                <button
                  type="button"
                  onClick={() => removeSize(index)}
                  className="bg-white mb-2 px-2"
                >
                  <Trash />
                </button>
              </div>
            </div>
          ))}
        <button
          type="button"
          onClick={addSize}
          className="bg-white items-center"
        >
          <Plus className="w-4 h-4" /> <span>{addLabel}</span>
        </button>
      </div>
    </div>
  );
}
