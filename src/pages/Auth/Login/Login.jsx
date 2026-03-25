import { Button, Input } from "@heroui/react";
import { Link, useNavigate } from "react-router-dom";
import { loginSchema } from "../../../lib/schema/authSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { loginUser } from "../../../services/authServices";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { authContext } from "../../../context/AuthContext";

export default function Login() {
  const { setToken } = useContext(authContext);
  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [showPassword, setshowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    // reset,
  } = useForm({
    resolver: zodResolver(loginSchema),
    mode: "all",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(formData) {
    console.log(formData);
    try {
      setErrorMsg("");
      setSuccessMsg("");
      const response = await loginUser(formData);
      console.log(response);
      localStorage.setItem("userToken", response?.data?.token);
      localStorage.setItem("userId", response?.data?.user?._id);
      setToken(response?.data?.token);
      if (response.message == "success") {
        navigate("/");
        // setSuccessMsg("Account Logged In Successfully");
        toast.success("Logged In Successfully", {
          position: "top-center",
        });
      }
    } catch (error) {
      console.log(error);
      setErrorMsg(error.response.data.message);
      toast.error(error.response.data.message, {
        position: "top-center",
      });
    }
    // reset();
  }
  return (
    <>
      <div className="max-w-3xl w-full space-y-5">
        <h1 className="text-4xl font-bold">Sign in Now 🚀</h1>
        <p className="text-2xl">Sign in into your account.</p>
        <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
          <Input
            {...register("email")}
            label="Email"
            type="email"
            errorMessage={errors.email?.message}
            isInvalid={Boolean(errors.email)}
          />
          <Input
            {...register("password")}
            label="Password"
            type={`${showPassword ? "text" : "password"}`}
            errorMessage={errors.password?.message}
            isInvalid={Boolean(errors.password)}
            endContent={
              showPassword ? (
                <FaRegEyeSlash
                  className="text-2xl cursor-pointer"
                  onClick={() => {
                    setshowPassword(false);
                  }}
                />
              ) : (
                <FaRegEye
                  className="text-2xl cursor-pointer"
                  onClick={() => {
                    setshowPassword(true);
                  }}
                />
              )
            }
          />
          <div className="flex justify-between items-center">
            <Button isLoading={isSubmitting} type="submit" color="primary">
              Submit
            </Button>
            <p>
              Dont have an account?
              <Link to="/register" className="font-bold ms-1">
                Register Now
              </Link>
            </p>
          </div>
          {errorMsg && (
            <p className="bg-red-500 text-white p-2 rounded-2xl text-xl inline-block">
              {errorMsg}
            </p>
          )}
          {successMsg && (
            <p className="bg-green-500 text-white p-2 rounded-2xl text-xl inline-block">
              {successMsg}
            </p>
          )}
        </form>
      </div>
    </>
  );
}
