import {
  Navbar as HeroNavbar,
  NavbarBrand,
  NavbarContent,
  Input,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
  Badge,
  Skeleton,
} from "@heroui/react";
import nexifyLogo from "../../assets/images/logo-CG_MOuOz.png";
import { IoIosSearch } from "react-icons/io";
import { IoIosNotifications } from "react-icons/io";
import { RiMessage2Fill } from "react-icons/ri";
import { authContext } from "../../context/AuthContext";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { userContext } from "../../context/userContext";

export default function Navbar() {
  const { setToken } = useContext(authContext);
  const { userData, isLoading } = useContext(userContext);

  function logoutUser() {
    localStorage.removeItem("userToken");
    setToken(false);
  }
  return (
    <HeroNavbar isBordered maxWidth="xl">
      <NavbarContent justify="start">
        <NavbarBrand className="mr-4">
          <Link to={"/"} className="flex items-center">
            <img src={nexifyLogo} alt="nexifyLogo" className="w-10 me-1" />
            <p className="hidden sm:block text-2xl font-bold text-inherit">
              Nexify
            </p>
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent>
        <Input
          classNames={{
            base: "max-w-full h-10",
            mainWrapper: "h-full",
            input: "text-small",
            inputWrapper:
              "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
          }}
          placeholder="Type to search..."
          size="sm"
          startContent={<IoIosSearch />}
          type="search"
          radius="full"
        />
      </NavbarContent>
      <NavbarContent as="div" className="items-center" justify="end">
        <NavbarBrand className="rounded-full bg-gray-200 grow-0 p-2">
          <Badge color="danger" content="5">
            <IoIosNotifications className="text-2xl" />
          </Badge>
        </NavbarBrand>
        <NavbarBrand className="rounded-full bg-gray-200 grow-0 p-2">
          <Badge color="danger" content="5">
            <RiMessage2Fill className="text-2xl" />
          </Badge>
        </NavbarBrand>

        <Dropdown placement="bottom-end">
          <DropdownTrigger className="cursor-pointer">
            {isLoading ? (
              <Skeleton />
            ) : (
              <Avatar
                isBordered
                as="button"
                name={userData.name}
                size="sm"
                src={userData.photo}
              />
            )}
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="flat">
            <DropdownItem key="profile" className="h-14 gap-2">
              <p className="font-semibold">Signed in as</p>
              <p className="font-semibold">{userData.email}</p>
            </DropdownItem>
            <DropdownItem key="profile">
              <Link to={"/profile"}>My Profile</Link>
            </DropdownItem>
            <DropdownItem onClick={logoutUser} key="logout" color="danger">
              Log Out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>
    </HeroNavbar>
  );
}
