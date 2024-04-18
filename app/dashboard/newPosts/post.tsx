"use client"
import axios from "axios";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Heart, MessageCircle } from "lucide-react";
import { useState } from "react";
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";

const date = new Date();

interface PostProps {
  userName: string;
  content: string;
  createdAt: string;
  postId: string;
}

const Post = ({ userName, content, createdAt, postId }: PostProps) => {
  const [color, setColor] = useState("");
    const { push } = useRouter();

  const handleClick=(postId:string)=>{
    push(`/dashboard/comment/${postId}`)
  }
  const likePost = async () => {
    try {
      const jwt = localStorage.getItem("jwt");
      const response = await axios.post(
        "http://localhost:3000/api/v1/post/likePost",
        {
          userToken: jwt,
          postId: postId,
        },{
          headers:{
            Authorization:`Bearer ${jwt}`
          }
        }
      );
      console.log(response);
    } catch (error) {
      console.log("Failed to like", error);
    }
  };
  const follow = async()=>{
    try {
      const jwt = localStorage.getItem("jwt");
      const response = await axios.post(
        "http://localhost:3000/api/v1/users/follow",
        {
          token: jwt,
          postId: postId,
        },{
          headers:{
            Authorization:`Bearer ${jwt}`
          }
        }
      );
      console.log(response);
    } catch (error) {
            console.log("Failed to follow", error);

    }
  }
  return (
    <div className="w-[80%]">
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>{userName}</span>
            <Button className="h-8 bg-slate-500 hover:bg-slate-400 transition-colors text-xs font-semibold" onClick={follow}>Follow</Button>
          </CardTitle>
          <CardDescription className="">{createdAt}</CardDescription>
        </CardHeader>
        <CardContent>
          <p>{content}</p>
        </CardContent>
        <CardFooter className="flex justify-end gap-8 items-end">
          <div className="flex gap-2 cursor-pointer text-sm">
            <MessageCircle className="text-[2px]" style={{ width: "18px" }} onClick={()=>handleClick(postId)}/>
          </div>
          <div className="flex gap-2 cursor-pointer text-sm">
            <Heart
              aria-label="Like post"
              className={`text-[2px] ${color}`}
              style={{ width: "18px" }}
              onClick={() => {
                likePost();
                setColor("text-red-500");
              }}
            />
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Post;
