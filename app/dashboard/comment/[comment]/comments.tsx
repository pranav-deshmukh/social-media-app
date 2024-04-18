import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface CardProps{
    userName:string,
    text:string,
    createdAt:string,
}

const CommentsComponent = ({userName, text, createdAt}:CardProps) => {
  return (
    <div>
      <Card className="p-3 w-[100%]">
          <CardTitle className="text-md text-gray-400 flex items-baseline gap-3">{userName}<p className="text-[10px]">{createdAt}</p></CardTitle>
          <CardDescription className="text-sm text-black ml-5">{text}</CardDescription>
      </Card>
    </div>
  );
};

export default CommentsComponent;
