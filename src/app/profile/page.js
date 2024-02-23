"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import Image from "next/image";
import { useEffect, useState } from "react";
import InfoBox from "../../components/layout/InfoBox";
import SuccessBox from "../../components/layout/SuccessBox";

export default function ProfilePage() {
  const session = useSession();
  console.log(session);
  const [userName, setUserName] = useState("");
  const [saved, setSaved] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const { status } = session;
  const [image, setImage] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  useEffect(() => {
    if (status === "authenticated") {
      setUserName(session.data.user.name);
      setImage(session.data.user.image);
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

    setSaved(false);
    setIsSaving(true);
    const res = await fetch("/api/profile", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: userName,
        image,
      }),
    });
    setIsSaving(false);
    if (res.ok) {
      setSaved(true);
    }
  }
  async function handelFileChange(e) {
    const files = e.target.files;
    if (files?.length === 1) {
      const data = new FormData();
      data.set("file", files[0]);
      setIsUploading(true);
      const res = await fetch("/api/upload", {
        method: "POST",
        body: data,
      });
      const link = await res.json();
      setImage(link);
      setIsUploading(false);
    }
  }
  return (
    <section className="mt-8">
      <h1 className="text-center text-primary text-4xl mb-4">Profile</h1>
      <div className="max-w-md mx-auto">
        {saved && <SuccessBox>Profile saved!</SuccessBox>}
        {isSaving && <InfoBox>Saving...</InfoBox>}
        {isUploading && <InfoBox>Uploading...</InfoBox>}
        <div className="flex gap-3 items-center ">
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
            <input
              type="text"
              placeholder="Name"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
            <input
              type="email"
              value={session.data.user.email}
              disabled={true}
              placeholder="email"
            />
            <button type="submit">Save</button>
          </form>
        </div>
      </div>
    </section>
  );
}
