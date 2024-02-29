"use client";
import Link from "next/link";
import Image from "next/image";
import UseProfile from "../../../components/UseProfile";
import UserTabs from "../../../components/layout/UserTabs";
import Left from "../../../components/icons/Left";
import EditableImage from "../../../components/layout/EditableImage";
import MenuItemForm from "../../../components/layout/MenuItemForm";
import toast from "react-hot-toast";
import { redirect } from "next/navigation";

import { useState } from "react";
export default function NewMenuItemPage() {
  // const [menuItem, setMenuItem] = useState(null);
  const { loading, data } = UseProfile();
  const [redirectToItems, setRedirectToItems] = useState(false);

  if (loading) {
    return "Loading user info...";
  }

  if (!data.admin) {
    return "Not an admin.";
  }

  async function handelFormSubmit(e, data) {
    e.preventDefault();
    // const data = { image, name, description, basePrice };
    const savingPromise = new Promise(async (resolve, reject) => {
      const res = await fetch("/api/menu-items", {
        method: "POST",
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
      <MenuItemForm onSubmit={handelFormSubmit} menuItem={null} />
    </section>
  );
}
