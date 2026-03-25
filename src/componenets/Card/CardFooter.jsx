import React, { useContext, useState } from "react";
import { FiSend } from "react-icons/fi";
import { MdKeyboardArrowDown } from "react-icons/md";
import { RxFace } from "react-icons/rx";
import PostDetails from "../PostDetails/PostDetails";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  useDisclosure,
} from "@heroui/react";
import { createComment } from "../../services/commentsServices";
import { userContext } from "../../context/userContext";
import { BsThreeDotsVertical } from "react-icons/bs";

export default function CardFooter({
  post,
  postDetails,
  postComments,
  setPostComments,
  getPosts,
}) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [commentMsg, setCommentMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { userData } = useContext(userContext);

  async function addComment(comment) {
    setIsLoading(true);
    try {
      const newComment = await createComment(post._id, {
        content: comment,
      });
      setPostComments((prev) => [newComment, ...(prev || [])]);
      setCommentMsg("");
      getPosts?.();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }
  function sendComment(e) {
    console.log(e.target.value);
    setCommentMsg(e.target.value);
  }
  const rFirstComment = postComments?.[0] || post?.topComment || null;
  const firstComment = rFirstComment?.comment || rFirstComment || null;

  // console.log("firstComment", firstComment);

  return (
    <>
      <div className="flex items-center gap-3 p-5">
        <input
          onChange={(e) => sendComment(e)}
          value={commentMsg}
          type="text"
          placeholder="Write your comment"
          className="bg-gray-100 rounded-full px-4 py-3 flex-1 focus:outline-none text-gray-700"
        />
        <Button
          isLoading={isLoading}
          onPress={() => addComment(commentMsg)}
          className=" text-white bg-blue-500 hover:text-blue-700 hover:bg-blue-300 disabled:cursor-not-allowed"
          disabled={commentMsg ? false : true}
        >
          <FiSend className="h-5 w-5" />
        </Button>
        <button className="text-gray-500 hover:text-blue-700">
          <RxFace className="h-5 w-5" />
        </button>
      </div>

      {postDetails ? (
        <div>
          {postComments?.length != 0 && (
            <>
              {postComments?.map((comment) => (
                <div key={comment._id}>
                  <>
                    <div className="flex items-center justify-between">
                      <div className="flex gap-3 items-start p-4">
                        <img
                          src={
                            comment?.commentCreator?.photo ||
                            "https://cdn-icons-png.flaticon.com/512/9131/9131529.png"
                          }
                          alt={comment?.commentCreator?.name || "user"}
                          className="object-cover w-10 h-10"
                        />
                        <div>
                          <h4 className="font-bold text-gray-800">
                            {comment.commentCreator?.name || ""}
                          </h4>
                          <p className="text-gray-600">{comment.content}</p>
                        </div>
                      </div>
                      <div className="me-3">
                        {userData._id == post.user._id &&
                        userData._id ==
                          postComments?.[0].commentCreator?._id ? (
                          <Dropdown placement="bottom-end">
                            <DropdownTrigger className="cursor-pointer">
                              <BsThreeDotsVertical className="w-5 h-5" />
                            </DropdownTrigger>
                            <DropdownMenu
                              aria-label="Profile Actions"
                              variant="flat"
                            >
                              <DropdownItem key="edit">Edit</DropdownItem>
                              <DropdownItem key="delete" color="danger">
                                Delete
                              </DropdownItem>
                            </DropdownMenu>
                          </Dropdown>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                  </>
                </div>
              ))}
            </>
          )}
        </div>
      ) : (
        <div>
          {firstComment && (
            <>
              <div className="flex items-center justify-between">
                <div className="flex gap-3 items-start p-4">
                  <img
                    src={
                      firstComment?.commentCreator?.photo ||
                      "https://cdn-icons-png.flaticon.com/512/9131/9131529.png"
                    }
                    alt={firstComment?.commentCreator?.name || "user"}
                    className="object-cover w-10 h-10"
                  />
                  <div>
                    <h4 className="font-bold text-gray-800">
                      {firstComment?.commentCreator?.name || ""}
                    </h4>
                    <p className="text-gray-600">{firstComment?.content}</p>
                  </div>
                </div>
                <div className="me-3">
                  {userData._id == post.user._id &&
                  userData._id == firstComment?.comment?.commentCreator?._id ? (
                    <Dropdown placement="bottom-end">
                      <DropdownTrigger className="cursor-pointer">
                        <BsThreeDotsVertical className="w-5 h-5" />
                      </DropdownTrigger>
                      <DropdownMenu aria-label="Profile Actions" variant="flat">
                        <DropdownItem key="edit">Edit</DropdownItem>
                        <DropdownItem key="delete" color="danger">
                          Delete
                        </DropdownItem>
                      </DropdownMenu>
                    </Dropdown>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </>
          )}
          <button
            onClick={onOpen}
            className="cursor-pointer flex items-center text-gray-500 mx-auto gap-2 hover:text-gray-700 py-4"
          >
            View all comments
            <MdKeyboardArrowDown className="h-5 w-5" />
          </button>
          <PostDetails
            setPostComments={setPostComments}
            postComments={postComments}
            postId={post._id}
            isOpen={isOpen}
            onOpenChange={onOpenChange}
          />
        </div>
      )}
    </>
  );
}
