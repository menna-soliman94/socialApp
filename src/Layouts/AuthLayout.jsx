import React from "react";
import { Outlet } from "react-router-dom";
import AuthBG from "../assets/images/AuthBG-CzQKdv7j.png";

export default function AuthLayout() {
  return (
    <>
      <main>
        <div className="grid grid-cols-3">
          <div className="col-span-1">
            <img src={AuthBG} className="w-full h-full" alt="" />
          </div>
          <div className="col-span-2 flex justify-center items-center">
            <Outlet />
          </div>
        </div>
      </main>
    </>
  );
}
