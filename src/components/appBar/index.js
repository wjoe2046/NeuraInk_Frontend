import React from "react";
import { useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { CloudUploadIcon } from "@heroicons/react/solid";
import { MailIcon, GlobeIcon, SearchIcon } from "@heroicons/react/outline";
import { selectUser } from "components/auth/slice";
import avatarPlaceholder from "assets/images/avatar_placeholder.png";

const AppBar = () => {
  const user = useSelector(selectUser);
  const history = useHistory();

  return (
    <div className="bg-appDark-700 text-white">
      <div className="max-w-7xl h-15 px-4 mx-auto flex items-center">
        <div>
          <Link
            to="/"
            className="block text-white text-2xl font-semibold uppercase"
          >
            neuralnk
          </Link>
        </div>

        <div className="ml-auto">
          <Link
            to="/generate"
            type="button"
            className="bg-appYellow-900 py-1 px-3 rounded-md text-sm text-semibold text-white border-1 border-appYellow-900 flex items-center"
          >
            <CloudUploadIcon className="h-4 w-4 mr-1" />
            Generate
          </Link>
        </div>

        <button
          className="ml-4 flex items-center cursor-pointer p-2 hover:bg-appDark-600 rounded-md"
          onClick={() => history.push("/profile")}
        >
          <img
            src={avatarPlaceholder}
            alt="avatar placeholder"
            className="block mr-2"
            style={{ borderRadius: "50%" }}
          />

          <p className="text-sm">{user?.name}</p>
        </button>

        <button className="ml-4 p-2 hover:bg-appDark-600 rounded-md">
          <SearchIcon className="w-6 h-6" />
        </button>

        <button className="ml-4 p-2 hover:bg-appDark-600 rounded-md">
          <MailIcon className="w-6 h-6" />
        </button>

        <button className="ml-4 p-2 hover:bg-appDark-600 rounded-md">
          <GlobeIcon className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};

export default AppBar;
