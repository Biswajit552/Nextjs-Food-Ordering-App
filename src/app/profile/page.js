"use client";
import UserTabs from "../../components/layout/UserTabs";
import InfoBox from "../../components/layout/InfoBox";
import SuccessBox from "../../components/layout/SuccessBox";
import UserForm from "../..//components/layout/UserForm";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function ProfilePage() {
  const session = useSession();

  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [profileFetched, setProfileFetched] = useState(false);
  const { status } = session;

  useEffect(() => {
    if (status === "authenticated") {
      fetch("/api/profile").then((response) => {
        response.json().then((data) => {
          setUser(data);
          setIsAdmin(data.admin);
          setProfileFetched(true);
        });
      });
    }
  }, [session, status]);

  async function handleProfileInfoUpdate(ev, data) {
    ev.preventDefault();

    const savingPromise = new Promise(async (resolve, reject) => {
      const response = await fetch("/api/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (response.ok) resolve();
      else reject();
    });

    await toast.promise(savingPromise, {
      loading: "Saving...",
      success: "Profile saved!",
      error: "Error",
    });
  }

  if (status === "loading" || !profileFetched) {
    return "Loading...";
  }

  if (status === "unauthenticated") {
    return redirect("/login");
  }

  return (
    <section className="mt-8">
      <UserTabs isAdmin={isAdmin} />
      <div className="max-w-2xl mx-auto mt-8">
        <UserForm user={user} onSave={handleProfileInfoUpdate} />
      </div>
    </section>
  );
}

// import { useSession } from "next-auth/react";
// import { redirect } from "next/navigation";
// import Image from "next/image";
// import { useEffect, useState } from "react";
// import toast from "react-hot-toast";
// import Link from "next/link";
// import UserTabs from "../../components/layout/UserTabs";
// import EditableImage from "../../components/layout/EditableImage";

// export default function ProfilePage() {
//   const session = useSession();
//   const [userName, setUserName] = useState("");
//   const { status } = session;
//   const [image, setImage] = useState("");
//   const [phone, setPhone] = useState("");
//   const [streetAddress, setStreetAddress] = useState("");
//   const [city, setCity] = useState("");
//   const [country, setCountry] = useState("");
//   const [postalCode, setPostalCode] = useState("");
//   const [isAdmin, setIsAdmin] = useState(false);
//   const [profileFetched, setProfileFetched] = useState(false);
//   useEffect(() => {
//     if (status === "authenticated") {
//       setUserName(session.data.user.name);
//       setImage(session.data.user.image);
//       fetch("/api/profile").then((res) => {
//         res.json().then((data) => {
//           setPhone(data.phone);
//           setStreetAddress(data.streetAddress);
//           setPostalCode(data.postalCode);
//           setCity(data.city);
//           setCountry(data.country);
//           setIsAdmin(data.admin);
//           setProfileFetched(true);
//         });
//       });
//     }
//   }, [session, status]);
//   if (status === "loading" || !profileFetched) {
//     return "Loading...";
//   }
//   if (status === "unauthenticated") {
//     return redirect("/login");
//   }

//   // const userImage = session.data.user.image;

//   async function handelProfileInfoUpdate(e) {
//     e.preventDefault();
//     const savingPromise = new Promise(async (resolve, reject) => {
//       const res = await fetch("/api/profile", {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           name: userName,
//           image,
//           phone,
//           streetAddress,
//           postalCode,
//           city,
//           country,
//         }),
//       });
//       if (res.ok) {
//         resolve();
//       } else {
//         reject();
//       }
//     });

//     await toast.promise(
//       savingPromise,
//       {
//         loading: <b>Saving...</b>,
//         success: <b>Profile saved!</b>,
//         error: "Error",
//       }
//       // { position: "top-right" }
//     );
//   }

//   return (
//     <section className="mt-8">
//       <UserTabs isAdmin={isAdmin} />

//       <div className="max-w-md mx-auto mt-8">
//         <div className="flex gap-3  ">
//           <div>
//             <div className=" p-2 rounded-lg relative max-w-[120px]">
//               <EditableImage link={image} setLink={setImage} />
//             </div>
//           </div>
//           <form className="grow" onSubmit={handelProfileInfoUpdate}>
//             <label>Name</label>
//             <input
//               type="text"
//               placeholder="Name"
//               value={userName}
//               onChange={(e) => setUserName(e.target.value)}
//             />
//             <label>Email</label>
//             <input
//               type="email"
//               value={session.data.user.email}
//               disabled={true}
//               placeholder="email"
//             />
//             <label>PhoneNumber</label>
//             <input
//               type="tel"
//               placeholder="Phone number"
//               value={phone}
//               onChange={(e) => setPhone(e.target.value)}
//             />
//             <label>Address</label>
//             <input
//               type="text"
//               placeholder="Street address"
//               value={streetAddress}
//               onChange={(e) => setStreetAddress(e.target.value)}
//             />
//             <div className="flex gap-2">
//               <div>
//                 <label>pincode</label>
//                 <input
//                   type="text"
//                   placeholder="pin-code"
//                   value={postalCode}
//                   onChange={(e) => setPostalCode(e.target.value)}
//                 />
//               </div>
//               <div>
//                 <label>City</label>
//                 <input
//                   type="text"
//                   placeholder="City"
//                   value={city}
//                   onChange={(e) => setCity(e.target.value)}
//                 />
//               </div>
//             </div>
//             <label>Country</label>
//             <input
//               type="text"
//               placeholder="Country"
//               value={country}
//               onChange={(e) => setCountry(e.target.value)}
//             />
//             <button type="submit">Save</button>
//           </form>
//         </div>
//       </div>
//     </section>
//   );
// }
