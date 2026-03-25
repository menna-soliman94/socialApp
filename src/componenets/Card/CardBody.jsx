import React from "react";
import { FaRegComment } from "react-icons/fa";
import { IoIosHeartEmpty } from "react-icons/io";
import { IoShareSocial } from "react-icons/io5";

export default function CardBody({ post, postDetails }) {
  return (
    <>
      <div className="py-3 px-4">
        <p className="text-gray-800">{post.body}</p>
      </div>

      {post.image && (
        <div className="w-full">
          <img
            src={post.image}
            alt={post.body}
            className={`w-full ${!postDetails && "h-80"} object-cover`}
          />
        </div>
      )}

      <div className="flex items-center gap-5 px-5 py-4">
        <button className="flex items-center gap-2 text-gray-600 hover:text-red-500 transition-colors">
          <IoIosHeartEmpty className="text-2xl" />
          <span className="font-medium">1200</span>
        </button>
        <button className="flex items-center gap-2 text-gray-600 hover:text-blue-500 transition-colors">
          <FaRegComment className="text-2xl" />
          <span className="font-medium">{post?.commentsCount || 0}</span>
        </button>
        <button className="flex items-center gap-2 text-gray-600 hover:text-green-500 transition-colors">
          <IoShareSocial className="text-2xl" />
          <span className="font-medium">17</span>
        </button>
      </div>
    </>
  );
}
