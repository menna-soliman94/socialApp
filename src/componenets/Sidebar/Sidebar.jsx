import React from "react";
import { RiHome2Fill } from "react-icons/ri";
import { FaUserFriends } from "react-icons/fa";
import { MdGroups } from "react-icons/md";
import { FaStore } from "react-icons/fa";
import musicImg from "../../assets/images/pexels-wendywei-1190298.jpg";
import techImg from "../../assets/images/pexels-fauxels-3182832.jpg";
import travelImg from "../../assets/images/pexels-pixabay-414171.jpg";
import bookImg from "../../assets/images/pexels-fauxels-3184418.jpg";
import { NavLink } from "react-router-dom";
import { FaRegBookmark } from "react-icons/fa";
import { IoFlag } from "react-icons/io5";

const sidebarOptions = [
  {
    label: "Home",
    icon: <RiHome2Fill className="text-blue-500" size={20} />,
    bgColor: "bg-blue-100",
    path: "/home",
  },
  {
    label: "Friends",
    icon: <FaUserFriends className="text-green-500" size={20} />,
    bgColor: "bg-green-100",
    path: "/friends",
  },
  {
    label: "Groups",
    icon: <MdGroups className="text-orange-500" size={20} />,
    bgColor: "bg-orange-100",
    path: "/groups",
  },
  {
    label: "Marketplace",
    icon: <FaStore className="text-purple-500" size={20} />,
    bgColor: "bg-purple-100",
    path: "/marketplace",
  },
  {
    label: "Saved",
    icon: <FaRegBookmark className="text-red-500" size={20} />,
    bgColor: "bg-red-100",
    path: "/saved",
  },
  {
    label: "Pages",
    icon: <IoFlag className="text-blue-500" size={20} />,
    bgColor: "bg-blue-100",
    path: "/pages",
  },
  {
    label: "Favorites",
    icon: <RiHome2Fill className="text-gray-500" size={20} />,
    bgColor: "bg-gray-100",
    path: "/favorites",
  },
];

const myGroups = [
  {
    groupImg: musicImg,
    groupName: "Music Lovers",
  },
  {
    groupImg: techImg,
    groupName: "Tech Innovators",
  },
  {
    groupImg: travelImg,
    groupName: "Travel Explorers",
  },
  {
    groupImg: bookImg,
    groupName: "Book Club",
  },
];

export default function Sidebar() {
  return (
    <>
      <div className="flex flex-col gap-3 mt-2">
        {sidebarOptions.map((option) => (
          <NavLink
            className="flex items-center gap-3 my-2"
            key={option.label}
            to={option.path}
          >
            <div className={`${option.bgColor} p-2 rounded-full`}>
              {option.icon}
            </div>
            <span className="font-medium">{option.label}</span>
          </NavLink>
        ))}
        <div className="mt-4 space-y-3">
          <h1 className="font-bold text-2xl">My Groups</h1>
          {myGroups.map((group) => (
            <div key={group.groupName} className="flex items-center gap-2 my-5">
              <img
                src={group.groupImg}
                alt={group.groupName}
                className="w-8 h-8 rounded-full"
              />
              <span className="font-medium">{group.groupName}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
