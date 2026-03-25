import React, { useEffect, useState } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody } from "@heroui/react";
import { getPostDetails } from "../../services/postsServices";
import { getPostComments } from "../../services/commentsServices";
import CardHeader from "../Card/CardHeader";
import CardBody from "../Card/CardBody";
import CardFooter from "../Card/CardFooter";
import PostSkeleton from "../PostSkeleton/PostSkeleton";

export default function PostDetails({
  isOpen,
  onOpenChange,
  postId,
  postComments,
  setPostComments,
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [post, setPost] = useState("");
  async function getDetails() {
    setPost("");
    setPostComments([]);
    setIsLoading(true);
    try {
      const postResponse = await getPostDetails(postId);
      const commentsResponse = await getPostComments(postId);
      setPost(postResponse?.data?.post || postResponse?.post || null);
      setPostComments(commentsResponse || []); 
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }
  useEffect(() => {
    if (isOpen && postId) {
      getDetails();
    }
  }, [isOpen, postId]);

  return (
    <div className="flex flex-col gap-2">
      <Modal
        isOpen={isOpen}
        scrollBehavior={"inside"}
        onOpenChange={onOpenChange}
        className="max-w-5xl"
      >
        <ModalContent>
          <>
            <ModalHeader className="flex flex-col gap-1">
              Post Details
            </ModalHeader>
            <ModalBody>
              {isLoading ? (
                <PostSkeleton />
              ) : (
                <>
                  {post && (
                    <>
                      <CardHeader post={post} />
                      <CardBody
                        post={post}
                        postDetails
                        postComments={postComments}
                      />
                      <CardFooter
                        post={post}
                        postDetails
                        postComments={postComments}
                        setPostComments={setPostComments}
                      />
                    </>
                  )}
                </>
              )}
            </ModalBody>
          </>
        </ModalContent>
      </Modal>
    </div>
  );
}
