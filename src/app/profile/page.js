"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import Image from "next/image";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Link from "next/link";
import UserTabs from "../../components/layout/UserTabs";

export default function ProfilePage() {
  const session = useSession();
  const [userName, setUserName] = useState("");
  const { status } = session;
  const [image, setImage] = useState("");
  const [phone, setPhone] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  useEffect(() => {
    if (status === "authenticated") {
      setUserName(session.data.user.name);
      setImage(session.data.user.image);
      fetch("/api/profile").then((res) => {
        res.json().then((data) => {
          setPhone(data.phone);
          setStreetAddress(data.streetAddress);
          setPostalCode(data.postalCode);
          setCity(data.city);
          setCountry(data.country);
          setIsAdmin(data.admin);
        });
      });
    }
  }, [session, status]);
  if (status === "loading") {
    return "Loading...";
  }
  if (status === "unauthenticated") {
    return redirect("/login");
  }

  // const userImage = session.data.user.image;

  async function handelProfileInfoUpdate(e) {
    e.preventDefault();
    const savingPromise = new Promise(async (resolve, reject) => {
      const res = await fetch("/api/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: userName,
          image,
          phone,
          streetAddress,
          postalCode,
          city,
          country,
        }),
      });
      if (res.ok) {
        resolve();
      } else {
        reject();
      }
    });

    await toast.promise(
      savingPromise,
      {
        loading: <b>Saving...</b>,
        success: <b>Profile saved!</b>,
        error: "Error",
      }
      // { position: "top-right" }
    );
  }
  async function handelFileChange(e) {
    const files = e.target.files;
    if (files?.length === 1) {
      const data = new FormData();
      data.set("file", files[0]);

      const uploadPromise = fetch("/api/upload", {
        method: "POST",
        body: data,
      }).then((res) => {
        if (res.ok) {
          return res.json().then((link) => {
            setImage(link);
          });
        }
        throw new Error("Something went wrong");
      });

      await toast.promise(
        uploadPromise,
        {
          loading: <b>Uploading...</b>,
          success: <b>Upload Complete!</b>,
          error: "Error",
        }
        // { position: "top-right" }
      );
    }
  }
  return (
    <section className="mt-8">
      <UserTabs isAdmin={isAdmin} />

      <div className="max-w-md mx-auto mt-8">
        <div className="flex gap-3  ">
          <div>
            <div className=" p-2 rounded-lg relative max-w-[120px]">
              {image && (
                <Image
                  src={image}
                  width={250}
                  height={250}
                  alt="profile-image"
                  className="rounded-lg w-full h-full mb-1"
                />
              )}
              <label>
                <input
                  type="file"
                  className="hidden"
                  onChange={handelFileChange}
                />
                <span className="block border text-black  border-gray-200 rounded-lg p-1 text-center cursor-pointer">
                  Edit
                </span>
              </label>
            </div>
          </div>
          <form className="grow" onSubmit={handelProfileInfoUpdate}>
            <label>Name</label>
            <input
              type="text"
              placeholder="Name"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
            <label>Email</label>
            <input
              type="email"
              value={session.data.user.email}
              disabled={true}
              placeholder="email"
            />
            <label>PhoneNumber</label>
            <input
              type="tel"
              placeholder="Phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <label>Address</label>
            <input
              type="text"
              placeholder="Street address"
              value={streetAddress}
              onChange={(e) => setStreetAddress(e.target.value)}
            />
            <div className="flex gap-2">
              <div>
                <label>pincode</label>
                <input
                  type="text"
                  placeholder="pin-code"
                  value={postalCode}
                  onChange={(e) => setPostalCode(e.target.value)}
                />
              </div>
              <div>
                <label>City</label>
                <input
                  type="text"
                  placeholder="City"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
              </div>
            </div>
            <label>Country</label>
            <input
              type="text"
              placeholder="Country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            />
            <button type="submit">Save</button>
          </form>
        </div>
      </div>
    </section>
  );
}
