import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  Divider,
  Textarea,
  Image,
  ModalFooter,
} from "@heroui/react";
import { useContext, useRef, useState } from "react";
import { IoMdPhotos } from "react-icons/io";
import { createPost, updatePost } from "../../services/postsServices";
import { userContext } from "../../context/userContext";

export default function CreatePostDetails({
  isOpen,
  onOpenChange,
  callback,
  post,
}) {
  const [selectedImg, setSelectedImg] = useState(post?.image || "");
  const [formDataImg, setFormDataImg] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const { userData } = useContext(userContext);

  const fileInput = useRef();
  const textAreaValue = useRef();

  function chooseFile() {
    const file = fileInput.current.files[0];
    console.log(file);
    setSelectedImg(URL.createObjectURL(file));
    setFormDataImg(file);
  }

  function openFileInput() {
    fileInput.current.click();
  }

  async function createNewPost() {
    const formData = new FormData();
    if (textAreaValue.current.value) {
      formData.append("body", textAreaValue.current.value);
    }
    if (formDataImg) {
      formData.append("image", formDataImg);
    }
    setIsLoading(true);
    try {
      if (post) {
        const { data } = await updatePost(formData, post._id);
        console.log(data);
      } else {
        const { data } = await createPost(formData);
        console.log(data);
      }
      callback();
      onOpenChange(false);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <Modal
        onClose={() => {
          setSelectedImg("");
        }}
        scrollBehavior="inside"
        className="max-w-3xl"
        isOpen={isOpen}
        placement="top-center"
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          <>
            {post ? (
              <ModalHeader className="flex justify-center">
                Update Post
              </ModalHeader>
            ) : (
              <ModalHeader className="flex justify-center">
                Create Post
              </ModalHeader>
            )}

            <Divider />
            <ModalBody className="p-5">
              <div className="flex gap-3">
                <Image src={userData.photo} className="w-12.5" />
                <div className="flex flex-col">
                  <span className="font-bold capitalize">{userData.name}</span>
                  <span className="font-medium">Active</span>
                </div>
              </div>
              <Textarea
                defaultValue={post?.body}
                ref={textAreaValue}
                minRows={selectedImg ? "" : 8}
                placeholder={`Whats on your mind , ${userData.name} ?`}
              />
              {selectedImg && <img src={selectedImg} alt="" />}
            </ModalBody>
            <Divider />
            <div className="flex items-center gap-3 p-5">
              <span className="font-bold">Add to your post:</span>
              <IoMdPhotos
                onClick={openFileInput}
                className="text-green-500 text-2xl cursor-pointer"
              />
              <input onChange={chooseFile} ref={fileInput} type="file" hidden />
            </div>
            <Divider />

            <ModalFooter>
              <Button
                isLoading={isLoading}
                onPress={createNewPost}
                color="primary"
                className="font-bold text-medium w-full"
              >
                Post
              </Button>
            </ModalFooter>
          </>
        </ModalContent>
      </Modal>
    </>
  );
}
