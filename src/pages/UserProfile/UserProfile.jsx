import {
  Card,
  CardBody,
  CardHeader,
  Input,
  Button,
  Chip,
  Avatar,
  Divider,
} from "@heroui/react";

import {
  HiOutlineMail,
  HiOutlineUser,
  HiOutlineCalendar,
} from "react-icons/hi";
import { MdOutlineLock } from "react-icons/md";
import { IoMaleSharp, IoFemaleSharp } from "react-icons/io5";
import { useContext, useState } from "react";
import { userContext } from "../../context/userContext";

export default function ProfilePage() {
  const [gender, setGender] = useState("Male");
  // const [currentPassword, setCurrentPassword] = useState("");
  // const [newPassword, setNewPassword] = useState("");

  const { userData } = useContext(userContext);

  const GenderIcon = gender == "Male" ? IoMaleSharp : IoFemaleSharp;

  // function onUpdatePassword(e) {
  //   e.preventDefault();
  //   console.log({ currentPassword, newPassword });
  // }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-5xl px-4 py-8">
        <Card className="overflow-visible">
          <CardBody className="p-0">
            <div className="h-32 w-full rounded-t-2xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500" />

            <div className="relative px-6 pb-6">
              <div className="absolute -top-10 left-6">
                {userData.photo && (
                  <Avatar
                    src={userData.photo}
                    name={userData.name}
                    className="h-20 w-20 ring-4 ring-white"
                  />
                )}
              </div>

              <div className="pt-12 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <div className="text-xl font-semibold text-gray-900">
                    {userData.name}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <HiOutlineMail className="text-base text-blue-500 " />
                    <span>{userData.email}</span>
                  </div>
                </div>

                <Chip
                  variant="flat"
                  className="w-fit"
                  startContent={<GenderIcon className="text-base" />}
                >
                  {userData.gender}
                </Chip>
              </div>
            </div>
          </CardBody>
        </Card>

        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
          <Card>
            <CardHeader className="flex items-center gap-2">
              <HiOutlineUser className="text-lg text-blue-600" />
              <div>
                <div className="font-semibold">Profile Information</div>
                <div className="text-xs text-gray-500">
                  Your personal details
                </div>
              </div>
            </CardHeader>
            <Divider />
            <CardBody className="space-y-4">
              <InfoRow
                icon={<HiOutlineUser className="text-lg text-blue-500" />}
                label="Name"
                value={userData.name}
              />
              <InfoRow
                icon={<HiOutlineMail className="text-lg text-green-500" />}
                label="Email Address"
                value={userData.email}
              />
              <InfoRow
                icon={<HiOutlineCalendar className="text-lg text-purple-500" />}
                label="Date of Birth"
                value={userData.dateOfBirth}
              />

              <div className="flex items-center justify-between rounded-xl bg-gray-100 px-4 py-3">
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-red-500">
                    <GenderIcon className="text-lg" />
                  </span>
                  <div>
                    <div className="text-xs text-gray-500">Gender</div>
                    <div className="font-medium text-gray-900">
                      {userData.gender}
                    </div>
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>

          <Card>
            <CardHeader className="flex items-center gap-2">
              <MdOutlineLock className="text-lg text-pink-600" />
              <div>
                <div className="font-semibold">Change Password</div>
                <div className="text-xs text-gray-500">
                  Update your security credentials
                </div>
              </div>
            </CardHeader>
            <Divider />
            <CardBody>
              <form className="space-y-4">
                <Input
                  label="Current Password"
                  placeholder="Enter your current password"
                  type="password"
                  // value={currentPassword}
                  // onValueChange={setCurrentPassword}
                  startContent={
                    <MdOutlineLock className="text-lg text-gray-400" />
                  }
                />

                <Input
                  label="New Password"
                  placeholder="Enter your new password"
                  type="password"
                  // value={newPassword}
                  // onValueChange={setNewPassword}
                  startContent={
                    <MdOutlineLock className="text-lg text-gray-400" />
                  }
                />

                <Button
                  type="submit"
                  className="w-full font-bold"
                  color="primary"
                >
                  Update Password
                </Button>
              </form>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
}

function InfoRow({ icon, label, value }) {
  return (
    <div className="flex items-center justify-between rounded-xl bg-gray-100 px-4 py-3">
      <div className="flex items-center gap-3">
        <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white text-gray-700">
          {icon}
        </span>
        <div>
          <div className="text-xs text-gray-500">{label}</div>
          <div className="font-medium text-gray-900">{value}</div>
        </div>
      </div>
    </div>
  );
}
