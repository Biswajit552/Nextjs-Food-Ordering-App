"use client";
import Link from "next/link";
import Image from "next/image";
import UseProfile from "../../../../components/UseProfile";
import UserTabs from "../../../../components/layout/UserTabs";
import Left from "../../../../components/icons/Left";
import EditableImage from "../../../../components/layout/EditableImage";
import MenuItemForm from "../../../../components/layout/MenuItemForm";
import toast from "react-hot-toast";
import { redirect, useParams } from "next/navigation";
import { useEffect, useState } from "react";
export default function EditMenuItemPage() {
  const [menuItem, setMenuItem] = useState(null);
  const { id } = useParams();
  const { loading, data } = UseProfile();
  const [redirectToItems, setRedirectToItems] = useState(false);

  useEffect(() => {
    fetch("/api/menu-items").then((res) => {
      res.json().then((items) => {
        const item = items.find((i) => i._id === id);
        setMenuItem(item);
      });
    });
  }, []);

  if (loading) {
    return "Loading user info...";
  }

  if (!data.admin) {
    return "Not an admin.";
  }

  async function handelFormSubmit(e, data) {
    e.preventDefault();
    data = { ...data, _id: id };
    const savingPromise = new Promise(async (resolve, reject) => {
      const res = await fetch("/api/menu-items", {
        method: "Put",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res.ok) {
        resolve();
      } else {
        reject();
      }
    });
    await toast.promise(savingPromise, {
      loading: <b>Saving...</b>,
      success: <b>Item created!</b>,
      error: <b>Error, sorry</b>,
    });
    setRedirectToItems(true);
  }
  if (redirectToItems) {
    return redirect("/menu-items");
  }

  return (
    <section className="mt-8 max-w-2xl mx-auto">
      <UserTabs isAdmin={true} />
      <div className="max-w-md mx-auto mt-8">
        <Link href={"/menu-items"} className="button">
          <Left />
          <span>Show all menu items</span>
        </Link>
      </div>
      <MenuItemForm menuItem={menuItem} onSubmit={handelFormSubmit} />
    </section>
  );
}
{
  /* <form onSubmit={handelFormSubmit} className="mt-8 max-w-md mx-auto">
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
            <button type="submit">save</button>
          </div>
        </div>
      </form> */
}
