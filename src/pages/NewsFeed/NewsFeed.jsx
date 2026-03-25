import React, { useEffect, useState } from "react";
import Sidebar from "../../componenets/Sidebar/Sidebar";
import PostCard from "../../componenets/PostCard/PostCard";
import { getAllPosts } from "../../services/postsServices";
import PostSkeleton from "../../componenets/PostSkeleton/PostSkeleton";
import CreatePost from "../../componenets/CreatePost/CreatePost";

export default function NewsFeed() {
  const [posts, setPosts] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  async function getPosts() {
    try {
      setIsLoading(true);
      const { data } = await getAllPosts();
      setPosts(data.posts);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  function handleCommentAdded(postId, newComment) {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        (post._id || post.id) === postId
          ? {
              ...post,
              commentsCount: (post.commentsCount || 0) + 1,
              topComment: newComment,
            }
          : post,
      ),
    );
  }
  useEffect(() => {
    getPosts();
  }, []);
  return (
    <>
      <main className="bg-gray-100">
        <div className="container p-5">
          <div className="grid grid-cols-4">
            <div className="col-span-1">
              <Sidebar />
            </div>
            <div className="col-span-2 space-y-5 py-4">
              {isLoading ? (
                [0, 1, 2, 3, 4].map((item) => <PostSkeleton key={item} />)
              ) : (
                <>
                  <CreatePost getPosts={getPosts} />
                  {posts &&
                    posts.map((post) => (
                      <PostCard
                        getPosts={getPosts}
                        post={post}
                        key={post._id}
                        onCommentAdded={handleCommentAdded}
                      />
                    ))}
                </>
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
