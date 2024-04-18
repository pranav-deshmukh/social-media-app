"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import Post from "../newPosts/post";

interface PostProps {
  _id: string;
  userName: string;
  userId: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
interface FollowsProps{
    userId:string,
    userName:string,
}

interface UserProps {
  status: string;
  userId: string;
  email: string;
  name: string;
  friends: string;
  posts: PostProps[];
  followed:FollowsProps[]
}

const Profile = () => {
  const [user, setUser] = useState<UserProps | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    const fetchData = async () => {
      try {
        const response = await axios.post(
          "http://localhost:3000/api/v1/users/getUser",
          {
            token: jwt,
          }
        );
        setUser(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch user data:", error);
        setError("Failed to fetch data");
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="w-full h-full flex flex-col items-center gap-5 bg-slate-300">
      <h1 className="mt-10">Profile</h1>
      <div className="flex flex-col gap-4 p-6 border-slate-500 border-[2px] [&>*]:border-b-slate-500 [&>*]:border-b-2 rounded-md">
        <div>
          <span className="p-2 pl-4 pr-4 mr-4 bg-gray-400 rounded-md">Name</span>
          <span>{user?.name}</span>
        </div>
        <div>
          <span className="p-2 pl-4 pr-4 mr-4 bg-gray-400 rounded-md">Email</span>
          <span>{user?.email}</span>
        </div>
        <div>
          <span className="p-2 pl-4 pr-4 mr-4 bg-gray-400 rounded-md">Friends</span>
          <span>{user?.friends}</span>
        </div>
        <div>
          <span className="p-2 pl-4 pr-4 mr-4 bg-gray-400 rounded-md">Follows</span>
          <span>{user?.followed?.map((follow)=>(
            <p key={follow.userId}>{follow.userName}</p>
          ))}</span>
        </div>
        
      </div>
      <div className="w-full h-full overflow-auto flex flex-col items-center gap-2">
        <h2>Posts:</h2>
        {user?.posts.map(post => (
                    <div key={post._id} className="mb-4 w-[100%] flex justify-center">
                        <Post content={post.content} createdAt={post.createdAt} postId={post._id} userName={post.userName}/>
                    </div>
                ))} 
      </div>
    </div>
  );
};

export default Profile;
