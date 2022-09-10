import React from "react";
import toast from "react-hot-toast";
import { GiConfirmed } from "react-icons/gi";

export const infoChanged = (message) => {
  toast.custom(
    <div className="px-5 py-3 mt-3 text-sm font-medium text-blue-500 bg-blue-50 shadow rounded flex justify-center items-center opacity-90">
      <GiConfirmed className="text-xl mr-2 my-auto" />
      <p className="text-center">{message}</p>
    </div>
  );
};
