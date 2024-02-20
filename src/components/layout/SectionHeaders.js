import React from "react";

const SectionHeaders = ({ subHeader, mainHeader }) => {
  return (
    <>
      <h3 className="uppercase text-gray-600 font-semibold  ">{subHeader}</h3>
      <h2 className="text-primary font-bold text-4xl mb-4">{mainHeader}</h2>
    </>
  );
};

export default SectionHeaders;
