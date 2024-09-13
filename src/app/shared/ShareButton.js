"use client";

import { useState } from "react";

const ShareButton = ({ id }) => {
  const [copiedId, setCopiedId] = useState(null);

  const handleShareClick = () => {
    navigator.clipboard.writeText(
      `https://stiridirect.ro/shared-article/${id}`
    );
    setCopiedId(id);

    setTimeout(() => {
      setCopiedId(null);
    }, 2000);
  };

  return (
    <span
      className={`flex mb-1 ml-auto p-0.4 pl-[5px] rounded-md ${
        copiedId === id ? "bg-green-200" : "bg-slate-200"
      }`}
      onClick={handleShareClick}
    >
      <p className="font-medium text-[12px] pt-[2px] pr-1">
        {copiedId === id ? "Copied" : "Share link"}
      </p>
      <svg
        className="w-6 h-6 text-gray-800 dark:text-white pt-[1px]"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        width="29"
        height="29"
        fill="none"
        viewBox="0 0 29 29"
      >
        <path
          stroke="black"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="m15.141 6 5.518 4.95a1.05 1.05 0 0 1 0 1.549l-5.612 5.088m-6.154-3.214v1.615a.95.95 0 0 0 1.525.845l5.108-4.251a1.1 1.1 0 0 0 0-1.646l-5.108-4.251a.95.95 0 0 0-1.525.846v1.7c-3.312 0-6 2.979-6 6.654v1.329a.7.7 0 0 0 1.344.353 5.174 5.174 0 0 1 4.652-3.191l.004-.003Z"
        />
      </svg>
    </span>
  );
};

export default ShareButton;
