import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  useDisclosure,
} from "@heroui/react";
import { useContext } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { userContext } from "../../context/userContext";
import CreatePostDetails from "../CreatePost/CreatePostDetails";

export default function CardHeader({ post, getPosts }) {
  const { userData } = useContext(userContext);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <div className="flex justify-between p-4">
        <div className="flex gap-4 items-center">
          <img
            src={post.user.photo}
            alt={post.user.name}
            className="object-cover w-12 h-12"
          />
          <div>
            <h3 className="font-bold text-black">{post.user.name}</h3>
            <p className="text-gray-600">
              {new Date(post.createdAt).toLocaleString()}
            </p>
          </div>
        </div>

        {userData._id == post.user._id ? (
          <Dropdown placement="bottom-end">
            <DropdownTrigger className="cursor-pointer">
              <BsThreeDotsVertical className="w-5 h-5" />
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" variant="flat">
              <DropdownItem key="edit" onClick={onOpen}>
                Edit
              </DropdownItem>
              <DropdownItem key="delete" color="danger">
                Delete
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        ) : (
          ""
        )}
      </div>
      <CreatePostDetails
        post={post}
        callback={getPosts}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      />
    </>
  );
}
