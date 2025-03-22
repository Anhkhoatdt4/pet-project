import React from "react";
import ArrowIcon from "../common/ArrowIcon";

interface CardProps {
  imagePath: string;
  title: string;
  description?: string;
  actionArrow?: string | boolean;
  width?: string;
  height?: string;
}

const Card: React.FC<CardProps> = ({
  imagePath,
  title,
  description,
  actionArrow,
  width,
  height,
}) => {
  return (
    <div className="flex flex-col p-4 ml-5">
      <img
        src={imagePath}
        alt=""
        className="bg-cover bg-center border rounded hover:scale-110 cursor-pointer transition-all duration-300 ease-in-out"
        style={{ width: `${width || 240}px`, height: `${height || 260}px` }}
      />
      <div className="flex justify-between w-full items-center p-1">
        <div className="flex flex-col p-5 ml-5 m-2">
          <div className="flex items-center">
            <p className="text-[16px] px-1 font-bold">{title}</p>
            {actionArrow && (
              <div className="cursor-pointer px-2">
                <ArrowIcon />
              </div>
            )}
          </div>
          {description && (
              <p className="text-[14px] text-gray-600 px-1 mt-1">
                {description}
              </p>
            )}
        </div>
      </div>
    </div>
  );
};

export default Card;
