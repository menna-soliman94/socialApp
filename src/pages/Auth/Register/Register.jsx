import { Button, Input, Select, SelectItem } from "@heroui/react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { registerSchema } from "../../../lib/schema/authSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { useState } from "react";
import { registerUser } from "../../../services/authServices";
import { toast } from "react-toastify";
 
export default function Register() {
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
    resolver: zodResolver(registerSchema),
    mode: "all",
    defaultValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      dateOfBirth: "",
      gender: "",
    },
  });

  async function onSubmit(formData) {
    console.log(formData);
    try {
      setErrorMsg("");
      setSuccessMsg("");
      const data = await registerUser(formData);
      console.log(data);
      console.log("RESPONSE:", data);
      if (data.success) {
        navigate("/login");
        // setSuccessMsg("Account Created Successfully");
        toast.success("Account Created Successfully", {
          position: "top-center",
        });
      }
    } catch (error) {
      console.log(error);
      setErrorMsg(error?.response?.data?.message);
      toast.error(error?.response?.data?.message, {
        position: "top-center",
      });
    }
    // reset();
  }
  return (
    <>
      <div className="max-w-3xl w-full space-y-5">
        <h1 className="text-4xl font-bold">Join Nexify Today 🚀</h1>
        <p className="text-2xl">
          Create your free account and start connecting.
        </p>
        <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
          <Input
            {...register("name", {
              required: "Name is Required",
              minLength: {
                value: 2,
                message: "Name must be at least 2 characters",
              },
              maxLength: {
                value: 10,
                message: "Name must not exceed 10 characters",
              },
            })}
            label="Name"
            type="text"
            errorMessage={errors.name?.message}
            isInvalid={Boolean(errors.name)}
          />
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
          <Input
            {...register("rePassword")}
            label="RePassword"
            type="Password"
            errorMessage={errors.rePassword?.message}
            isInvalid={Boolean(errors.rePassword)}
          />
          <div className="flex justify-between items-center gap-3">
            <Input
              {...register("dateOfBirth")}
              label="Birth Date"
              type="date"
              errorMessage={errors.dateOfBirth?.message}
              isInvalid={Boolean(errors.dateOfBirth)}
            />
            <Select
              {...register("gender")}
              className="max-w-xs"
              label="Select Your Gender"
              errorMessage={errors.gender?.message}
              isInvalid={Boolean(errors.gender)}
            >
              <SelectItem key="male">Male</SelectItem>
              <SelectItem key="female">Female</SelectItem>
            </Select>
          </div>
          <div className="flex justify-between items-center">
            <Button isLoading={isSubmitting} type="submit" color="primary">
              Submit
            </Button>
            <p>
              Already have an account?
              <Link to="/login" className="font-bold ms-1">
                Sign In
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
