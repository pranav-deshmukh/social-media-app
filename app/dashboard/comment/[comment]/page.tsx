"use client"

import { useParams } from 'next/navigation';  // Changed to useRouter for Next.js
import axios from 'axios'
import { useEffect, useState, ChangeEvent } from 'react'
import Post from '../../newPosts/post';
import CommentsComponent from './comments';
import { Button } from '@/components/ui/button';

interface Post {
  _id: string;
  userName: string;
  userId: string;
  content: string;
  likes: string[]; 
  comments: Comment[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface Comment {
  userId: string;
  userName: string;
  text: string;
  createdAt: string;
  _id: string;
}

interface PostData {
  success: boolean;
  data: Post;
}


const Comments = () => {
    const {comment} = useParams<{comment:string}>();
    console.log(comment)
    const [post, setPost] = useState<Post | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [content, setContent] = useState("");


    const PostComment = async()=>{
        const jwt = localStorage.getItem("jwt");
        const response = await axios.post("http://localhost:3000/api/v1/post/comment",{
            token:jwt,
            postId:post?._id,
            text:content
        },{
                headers: {
                    Authorization: `Bearer ${jwt}`
                }
            })
    }

    useEffect(() => {
        if (typeof comment === 'string') {
            const fetchData = async () => {
                try {
                    const response = await axios.post<PostData>(`http://localhost:3000/api/v1/post/getPost/${comment}`);
                    if (response.data.success) {
                        setPost(response.data.data);
                    } else {
                        setError('Failed to fetch data');
                    }
                } catch (error) {
                    console.error('API error:', error);
                    setError('An error occurred while fetching data');
                }
            };
            fetchData();
        }
    }, [comment]);

    if (error) {
        return <div>Error: {error}</div>;
    }
    const handleContentChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setContent(event.target.value);
    };

    return (
        <div className='flex items-center justify-center w-full h-full bg-slate-300'>
            {post ? (
                <div key={post._id} className='flex flex-col items-center w-full p-4 '>
                    <Post userName={post.userName} content={post.content} createdAt={post.createdAt} postId={post._id}/>
                    <h1 className=''>Comment:</h1>
                    <ul className='max-h-[350px] overflow-auto flex flex-col items-center w-full  p-4 '>
                    <textarea name="" id="" className='w-[80%] border-gray-500 border-2 rounded-md  resize-none outline-none p-8' rows={2}  onChange={handleContentChange}></textarea>
                    <Button className='h-8 m-2' onClick={PostComment}>Comment</Button>
                        {post.comments.map(comment => (
                            <li key={comment._id} className='mb-2 w-[80%]'>
                                <CommentsComponent userName={comment.userName} text={comment.text} createdAt={new Date(comment.createdAt).toLocaleString()}/>
                            </li>
                        ))}
                    </ul>
                </div>
            ) : (
                <div>Loading...</div>
            )}
        </div>
    );
}
 
export default Comments;