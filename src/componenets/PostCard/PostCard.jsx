import CardHeader from "../Card/CardHeader";
import CardBody from "../Card/CardBody";
import CardFooter from "../Card/CardFooter";
import { useEffect, useState } from "react";

export default function PostCard({ post, getPosts }) {
  const [postComments, setPostComments] = useState([]);
  useEffect(() => {
    setPostComments(post.comments || []);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <div className="container bg-white rounded-2xl border border-gray-200 shadow-md">
        <CardHeader post={post} getPosts={getPosts} />
        <CardBody post={post} postComments={postComments} />
        <CardFooter
          post={post}
          postComments={postComments}
          setPostComments={setPostComments}
          getPosts={getPosts}
          // onCommentAdded={(newComment) =>
          //   onCommentAdded?.(post._id || post.id, newComment)
          // }
        />
      </div>
    </>
  );
}
