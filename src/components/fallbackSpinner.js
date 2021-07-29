import React from "react";
import Loader from "react-loader-spinner";

const FallBackSpinner = () => {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <Loader type="Puff" color="#e68a00" height={100} width={100} />
    </div>
  );
};

export default FallBackSpinner;
