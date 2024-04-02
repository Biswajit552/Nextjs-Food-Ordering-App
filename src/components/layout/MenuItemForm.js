import { useEffect, useState } from "react";
import EditableImage from "../../components/layout/EditableImage";
import Trash from "../../components/icons/Trash";
import Plus from "../../components/icons/Plus";
import { MenuItem } from "../../models/MenuItem";
import MenuItemPriceProps from "../layout/menuItemPriceProps";

export default function MenuItemForm({ onSubmit, menuItem }) {
  const [name, setName] = useState(menuItem?.name || "");
  const [description, setDescription] = useState(menuItem?.description || "");
  const [basePrice, setBasePrice] = useState(menuItem?.basePrice || "");
  const [image, setImage] = useState(menuItem?.image || "");
  const [sizes, setSizes] = useState(menuItem?.sizes || []);
  const [extraIngredientPrices, setExtraIngredientPrices] = useState(
    menuItem?.extraIngredientPrices || []
  );
  const [category, setCategory] = useState(menuItem?.category || null);
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    fetch("/api/categories").then((res) => {
      res.json().then((categories) => {
        setCategories(categories);
      });
    });
  });

  return (
    <form
      onSubmit={(e) =>
        onSubmit(e, {
          name,
          description,
          basePrice,
          image,
          sizes,
          extraIngredientPrices,
          category,
        })
      }
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
          <label>Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {categories?.length > 0 &&
              categories.map((category) => (
                <option value={category._id}>{category.name}</option>
              ))}
          </select>
          <label>Base Price</label>
          <input
            type="text"
            value={basePrice}
            onChange={(e) => setBasePrice(e.target.value)}
          />
          <MenuItemPriceProps
            name={"Sizes"}
            addLabel={"Add size"}
            props={sizes}
            setProps={setSizes}
          />
          <MenuItemPriceProps
            name={"Extra ingredients"}
            addLabel={"Add extra ingredients"}
            props={extraIngredientPrices}
            setProps={setExtraIngredientPrices}
          />

          <button type="submit">save</button>
        </div>
      </div>
    </form>
  );
}
