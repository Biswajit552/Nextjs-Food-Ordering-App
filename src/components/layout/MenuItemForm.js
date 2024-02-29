import { useState } from "react";
import EditableImage from "../../components/layout/EditableImage";
import Trash from "../../components/icons/Trash";
import Plus from "../../components/icons/Plus";

export default function MenuItemForm({ onSubmit, menuItem }) {
  const [name, setName] = useState(menuItem?.name || "");
  const [description, setDescription] = useState(menuItem?.description || "");
  const [basePrice, setBasePrice] = useState(menuItem?.basePrice || "");
  const [image, setImage] = useState(menuItem?.image || "");
  const [sizes, setSizes] = useState([]);

  function addSize() {
    setSizes((oldSizes) => {
      return [...oldSizes, { name: "", price: 0 }];
    });
  }

  function editSize(e, index, prop) {
    const newValue = e.target.value;
    setSizes((prevSizes) => {
      const newSizes = [...prevSizes];
      newSizes[index][prop] = newValue;
      return newSizes;
    });
  }
  function removeSize(indexToRemove) {
    setSizes((prev) => prev.filter((v, i) => i !== indexToRemove));
  }

  return (
    <form
      onSubmit={(e) => onSubmit(e, { name, description, basePrice, image })}
      className="mt-8 max-w-md mx-auto"
    >
      <div
        className="grid items-start gap-4"
        style={{ gridTemplateColumns: ".3fr .7fr" }}
      >
        <div>
          <EditableImage link={image} setLink={setImage} />
        </div>
        <div>
          <label>Item name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <label>Description</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <label>Base Price</label>
          <input
            type="text"
            value={basePrice}
            onChange={(e) => setBasePrice(e.target.value)}
          />
          <div className="bg-gray-200 py-2 rounded-md mb-2">
            <label className="font-serif underline">Sizes</label>
            {sizes?.length > 0 &&
              sizes.map((size, index) => (
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
              <Plus className="w-4 h-4" /> <span>Add item size</span>
            </button>
          </div>
          <button type="submit">save</button>
        </div>
      </div>
    </form>
  );
}
