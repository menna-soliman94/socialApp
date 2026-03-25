import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Link,
  Image,
  Input,
  useDisclosure,
} from "@heroui/react";
import CreatePostDetails from "./CreatePostDetails";
import { useContext } from "react";
import { userContext } from "../../context/userContext";

export default function CreatePost({ getPosts }) {
  const { userData } = useContext(userContext);

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Card>
        <CardHeader className="flex gap-3 p-5">
          <Image src={userData.photo} className="w-12.5" />
          <Input
            onClick={onOpen}
            isReadOnly
            type="text"
            placeholder={`Whats on your mind , ${userData.name} ?`}
          />
        </CardHeader>
      </Card>
      <CreatePostDetails
        callback={getPosts}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      />
    </>
  );
}
