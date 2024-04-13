import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const date = new Date();

interface PostProps{
  userName:string,
  content:string,
  createdAt:string,
}

const Post = ({userName, content, createdAt}:PostProps) => {
  return (
    <div className="w-[80%]">
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>{userName}</CardTitle>
          <CardDescription className="">{createdAt}</CardDescription>
        </CardHeader>
        <CardContent>
          <p>{content}</p>
        </CardContent>
        <CardFooter>
          <p>Comments</p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Post;
