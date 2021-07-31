import React, { useEffect, useState } from "react";
import { getNotes } from "utils/graphql";
import Loader from "react-loader-spinner";
import styles from "./trendingStyles.module.css";

const Trending = () => {
  const [notes, setNotes] = useState(null);
  const [status, setStatus] = useState("idle");

  useEffect(() => {
    const fethcNotes = async () => {
      setStatus("loading");
      const response = await getNotes();

      if (response.status === "success") {
        setNotes(response.data);
        setStatus("loaded");
      } else {
        setStatus("error");
      }
    };

    fethcNotes();
  }, []);

  let outputJsx = null;

  if (status === "error") {
    outputJsx = (
      <div className={styles.centeredBox}>
        <p className="text-red-600">Something went wrong, please try latter</p>
      </div>
    );
  } else if (status === "loading") {
    outputJsx = (
      <div className={styles.centeredBox}>
        <Loader type="Oval" color="#e68a00" height={50} width={50} />
      </div>
    );
  } else if (status === "loaded") {
    outputJsx = (
      <div className="mx-auto max-w-2.5xl">
        {notes.map((item) => (
          <div key={item.id} className="mb-8 last:mb-0">
            <div className="h-100 bg-appDark-50 overflow-hidden">
              <div className="h-full flex w-full">
                <div
                  className="w-2/6 h-full flex flex-col"
                  style={{ marginRight: 1 }}
                >
                  <div className="w-full h-52">
                    <img src={item.name} alt="alt" className="w-full h-full" />
                  </div>
                  <div className="w-full h-52">
                    <img src={item.name} alt="alt" className="w-full h-full" />
                  </div>
                </div>
                <div className="w-4/6 h-full">
                  <div className="h-full w-full">
                    <img src={item.image} alt="alt" className="w-full h-full" />
                  </div>
                </div>
              </div>
            </div>
            {/* User info */}
            <div className="p-6 bg-appDark-50 border-b border-gray-300">
              <div className="h-full flex items-center">
                <img
                  src="https://i.pravatar.cc/60"
                  alt="user profile"
                  className="ring-4 ring-gray-300"
                  style={{ borderRadius: "50%" }}
                />

                <div className="ml-6">
                  <p className="text-3xl font-bold text-appYellow-900">
                    Jon Doe
                  </p>
                  <p className="text-base mt-1 text-appDark-500">
                    21 hours ago
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
  return <>{outputJsx}</>;
};

export default Trending;
