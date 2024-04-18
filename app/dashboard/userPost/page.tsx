"use client";
import { Button } from "@/components/ui/button";
import EmojiPicker from "emoji-picker-react";
import axios from "axios";
import { useEffect, useState, ChangeEvent } from "react";

interface UserProps {
  status: string;
  userId: string;
  email: string;
  name: string;
  friendRequests: string;
}

const UserPost = () => {
  const [user, setUser] = useState<UserProps | null>(null);
  const [content, setContent] = useState("");

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
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    };
    fetchData();
  }, []);

  const handleContentChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(event.target.value);
  };

  const handleEmojiClick = (event: any, emojiObject: any) => {
    setContent((prevContent) => prevContent + emojiObject.emoji);
  };

  const makeAPost = async () => {
    const jwt = localStorage.getItem("jwt");
    try {
      await axios.post(
        "http://localhost:3000/api/v1/post",
        {
          content,
          userId: user?.userId,
        },
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
    } catch (error) {
      console.error("Failed to post content:", error);
    }
  };
  const today = new Date();
  const date = today.getDate();
  const month = today.getMonth() + 1;
  const year = today.getFullYear();

  return (
    <div className="w-full h-full bg-slate-300 flex flex-col justify-center items-center">
      <div className="flex flex-col gap-2 justify-center items-center">
        <div className="w-full h-10 bg-slate-400 rounded-md text-xl text-white flex items-center justify-start gap-10 font-semibold">
          <span className="ml-5">{user?.name}</span>
          <span>{`${month}/${date}/${year}`}</span>
        </div>
        {/* <EmojiPicker onEmojiClick={handleEmojiClick} /> */}
        <textarea
          cols={80}
          rows={13}
          className="p-4 text-gray-500 border-gray-400 rounded-sm resize-none outline-none"
          placeholder="What do you want to talk about !"
          onChange={handleContentChange}
        ></textarea>
        <Button className="text-xl w-40 h-12" onClick={makeAPost}>
          Post
        </Button>
      </div>
    </div>
  );
};

export default UserPost;
