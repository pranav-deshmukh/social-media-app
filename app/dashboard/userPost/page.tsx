import { Button } from "@/components/ui/button";
import EmojiPicker from "emoji-picker-react";
const UserPost = () => {
    return ( 
        <div className="w-full h-full bg-slate-300 flex flex-col justify-center items-center">
            <div className="flex flex-col gap-2 justify-center items-center">
                <div className="w-full h-10 bg-blue-500 text-lg">name</div>
                {/* <EmojiPicker/> */}
                <textarea name="" id="" cols={80} rows={15} placeholder="What do you want to talk about"></textarea>
                <Button className="bg-green-600 text-xl w-40 h-12 hover:bg-green-400">Post</Button>
            </div>
        </div>
     );
}
 
export default UserPost;