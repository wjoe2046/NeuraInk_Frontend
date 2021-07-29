import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { CloudUploadIcon } from "@heroicons/react/solid";
import { MailIcon, GlobeIcon, SearchIcon } from "@heroicons/react/outline";
import { selectUser } from "components/auth/slice";
import avatarPlaceholder from "assets/images/avatar_placeholder.png";
import Trending from "./trending";
import Feed from "./feed";
import Best from "./best";
import Latest from "./latest";
import styles from "./style.module.css";
import clsx from "clsx";

const tabs = [
  {
    id: 0,
    name: "Trending",
  },

  {
    id: 1,
    name: "Feed",
  },

  {
    id: 2,
    name: "Latest",
  },

  {
    id: 3,
    name: "Best",
  },
];

const Home = () => {
  const user = useSelector(selectUser);

  const [activeTab, setActiveTab] = useState(tabs[0]);

  const switchTab = (tab) => {
    setActiveTab(tab);
  };

  return (
    <>
      {/* Banner */}
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

          <button className="ml-4 flex items-center cursor-pointer p-2 hover:bg-appDark-600 rounded-md">
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

      {/* Navbar */}
      <div className="bg-white h-12 shadow">
        <ul className="px-4 mx-auto max-w-7xl flex items-center h-full">
          {tabs.map((tab) => (
            <li key={tab.id}>
              <button
                onClick={() => switchTab(tab)}
                className={clsx(
                  "mr-1 block py-3 px-4 text-base font-semibold hover:text-appYellow-900 border-b-2 border-transparent hover:border-appYellow-900 text-appDark-500",
                  {
                    [styles.activeLink]: tab.id === activeTab.id,
                  }
                )}
              >
                {tab.name}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Main */}
      <div className="bg-appDark-100 py-8">
        {activeTab.id === 0 && <Trending />}
        {activeTab.id === 1 && <Feed />}
        {activeTab.id === 2 && <Latest />}
        {activeTab.id === 3 && <Best />}
      </div>
    </>
  );
};

export default Home;
