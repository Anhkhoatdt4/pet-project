import { useCallback, useEffect, useState } from "react";

export const sizeSelector =["S","M","L","XL","XXL"]

const SizeFilter = ({
  sizes,
  hiddenTitle = false,
  multi = true,
  onChange = () => {}
}: {
  sizes: string[];
  hiddenTitle?: boolean;
  multi: boolean;
  onChange : (selectedSizes: string[]) => void;
}) => {
  const [appliedSizes, setAppliedSizes] = useState<string[]>([]);
  const onclickDiv = useCallback((size: string) => {
    setAppliedSizes((prev) => {
      let newSizes: string[];
      if (multi) {
        if (prev.includes(size)) {
          newSizes = prev.filter((item) => item !== size);
        } else {
          newSizes = [...prev, size];
        }
      } else {
        newSizes = prev.includes(size) ? [] : [size];
      }
      return newSizes;
    });
  }, [multi]);

  useEffect(() => {
    onChange(appliedSizes);
  }, [appliedSizes, onChange]);

  return (
    <div className="flex flex-col mb-4 ml-1">
      {!hiddenTitle && <p className="text-[16px] text-black mt-5 mb-5">Size</p>}
      <div className="flex flex-wrap px-2">
        {sizes?.map((size) => {
          return (
            <div className="flex flex-col mr-3">
              <div
                className="border text-[14px] text-center rounded-xl w-[40px] font-medium h-7 mr-4 mb-4 cursor-pointer p-1
                     hover:scale-110 hover:bg-slate-400 bg-white border-gray-500"
                onClick={() => onclickDiv(size)}
                style={{
                  background: appliedSizes.includes(size) ? "#000" : "white",
                  color: appliedSizes.includes(size) ? "white" : "black",
                }}
              >
                {" "}
                {size}{" "}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SizeFilter;
