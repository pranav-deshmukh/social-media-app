"use client";
import { FC, useEffect, useState } from "react";
import axios from "axios";
import Post from "./post";

interface PostsPageProps {}

interface Post {
  _id: string;
  userName: string;
  userId: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface PostsResponse {
  success: boolean;
  data: Post[];
}

const PostsPage: FC<PostsPageProps> = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<PostsResponse>(
          "http://localhost:3000/api/v1/post/getPosts"
        );
        console.log(response);
        if (response.data.success) {
          setPosts(response.data.data);
        }
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="flex items-center justify-center w-full h-full bg-slate-300">
      <div className="w-full h-full overflow-auto">
        <div className="flex flex-col items-center w-full  p-4 ">
          {posts.map((post) => (
            <div
              key={post._id}
              className="mt-6  w-full p-4  flex justify-center"
            >
              <Post
                userName={post.userName}
                content={post.content}
                createdAt={post.createdAt}
                postId={post._id}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PostsPage;
