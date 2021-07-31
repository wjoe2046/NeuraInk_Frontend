import React, { useState } from "react";
import AppBar from "components/appBar";
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
  const [activeTab, setActiveTab] = useState(tabs[0]);

  const switchTab = (tab) => {
    setActiveTab(tab);
  };

  return (
    <>
      {/* AbbBar */}
      <AppBar />

      {/* SubNav */}
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
