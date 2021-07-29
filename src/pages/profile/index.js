import React from "react";
import { useSelector } from "react-redux";
import { selectUser } from "components/auth/slice";
import { logoutUser } from "utils/graphql";
import AppBar from "components/appBar";

const images = [
  "https://picsum.photos/350/270",
  "https://picsum.photos/350/270",
  "https://picsum.photos/350/270",
  "https://picsum.photos/350/270",
  "https://picsum.photos/350/270",
  "https://picsum.photos/350/270",
  "https://picsum.photos/350/270",
  "https://picsum.photos/350/270",
  "https://picsum.photos/350/270",
  "https://picsum.photos/350/270",
];

const Profile = () => {
  const user = useSelector(selectUser);

  return (
    <>
      <AppBar />
      <div className="bg-appDark-600 text-white py-12 flex justify-center items-center flex-col">
        <img
          src="https://i.pravatar.cc/100"
          alt="profile"
          style={{ borderRadius: "50%" }}
        />
        <div className="mt-4 flex flex-col justify-center items-center">
          <p className="text-center text-2xl text-appYellow-900 font-bold">
            {user.name}
          </p>
          <p className="text-center mt-1 text-sm">{user.email}</p>
          <button
            className="bg-white mt-3 py-2 px-3 font-bold text-sm uppercase text-appDark-700"
            onClick={logoutUser}
          >
            Logout
          </button>
        </div>
      </div>

      <div className="bg-appDark-50 py-8">
        <div className="flex flex-wrap mx-auto max-w-7xl justify-center">
          {images.map((image) => (
            <a
              href={image}
              key={image}
              target="_blank"
              rel="noreferrer"
              className="block w-full sm:w-1/2 md:w-4/12 lg:w-3/12 p-4"
            >
              <img src={image} alt="gallery" className="w-full h-auto" />
            </a>
          ))}
        </div>
      </div>
    </>
  );
};

export default Profile;
