import React from "react";
import clsx from "clsx";

const Input = ({ id, label, error, errorMessage, ...inputProps }) => {
  return (
    <div className="mb-3">
      <label htmlFor={id} className="text-sm mb-1 block">
        {label}
      </label>
      <input
        id={id}
        className={clsx(
          "w-full block border text-sm text-appDark-700 outline-none focus:shadow-md focus:border-appYellow-700 py-2 px-3",
          {
            "border-red-600": error,
            "border-appDark-700": !error,
          }
        )}
        {...inputProps}
      />
      {error && <p className="text-xs text-red-600 mt-1">{errorMessage}</p>}
    </div>
  );
};

export default Input;
