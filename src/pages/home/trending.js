import React from "react";

const data = [
  {
    id: 0,
    featuredImage: "https://picsum.photos/500/400",
    image1: "https://picsum.photos/250/200",
    image2: "https://picsum.photos/250/200",

    published: "21 hours ago",

    user: {
      avatar: "https://i.pravatar.cc/60",
      name: "Jon Doe",
    },
  },

  {
    id: 1,
    featuredImage: "https://picsum.photos/500/400",
    image1: "https://picsum.photos/250/200",
    image2: "https://picsum.photos/250/200",

    published: "21 hours ago",

    user: {
      avatar: "https://i.pravatar.cc/60",
      name: "Jon Doe",
    },
  },

  {
    id: 2,
    featuredImage: "https://picsum.photos/500/400",
    image1: "https://picsum.photos/250/200",
    image2: "https://picsum.photos/250/200",

    published: "21 hours ago",

    user: {
      avatar: "https://i.pravatar.cc/60",
      name: "Jon Doe",
    },
  },

  {
    id: 3,
    featuredImage: "https://picsum.photos/500/400",
    image1: "https://picsum.photos/250/200",
    image2: "https://picsum.photos/250/200",

    published: "21 hours ago",

    user: {
      avatar: "https://i.pravatar.cc/60",
      name: "Jon Doe",
    },
  },
];

const Trending = () => {
  return (
    <div className="mx-auto max-w-2.5xl">
      {data.map((item) => (
        <div key={item.id} className="mb-8 last:mb-0">
          <div className="h-100 bg-appDark-50 overflow-hidden">
            <div className="h-full flex w-full">
              <div
                className="w-2/6 h-full flex flex-col"
                style={{ marginRight: 1 }}
              >
                <div className="w-full h-52">
                  <img src={item.image1} alt="alt" className="w-full h-full" />
                </div>
                <div className="w-full h-52">
                  <img src={item.image2} alt="alt" className="w-full h-full" />
                </div>
              </div>
              <div className="w-4/6 h-full">
                <div className="h-full w-full">
                  <img
                    src={item.featuredImage}
                    alt="alt"
                    className="w-full h-full"
                  />
                </div>
              </div>
            </div>
          </div>
          {/* User info */}
          <div className="p-6 bg-appDark-50 border-b border-gray-300">
            <div className="h-full flex items-center">
              <img
                src={item.user.avatar}
                alt="user profile"
                className="ring-4 ring-gray-300"
                style={{ borderRadius: "50%" }}
              />

              <div className="ml-6">
                <p className="text-3xl font-bold text-appYellow-900">
                  {item.user.name}
                </p>
                <p className="text-base mt-1 text-appDark-500">
                  {item.published}
                </p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Trending;
