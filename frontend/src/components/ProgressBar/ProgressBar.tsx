import React from "react";

interface ProgressStepperProps {
  stepCount: number;
}

const ProgressBar: React.FC<ProgressStepperProps> = ({ stepCount }) => {
  const steps = ["Order Placed", "In progress", "Shipped", "Delivered"];

  return (
    <div className="w-full flex justify-center mb-4">
      <ol className="items-center sm:flex">
        {steps.map((label: any, index: number) => (
          <li key={index} className="relative mb-6 sm:sb-0">
            <div className="flex items-center">
              <div
                className={`z-10 flex items-center justify-center w-6 h-6 rounded-full ring-0 ring-white shrink-0
                                    ${
                                      stepCount >= index
                                        ? "bg-gray-500"
                                        : "bg-gray-200"
                                    } `}
              />
                {index !== steps.length - 1 && (
                  <div
                    className={`hidden sm:flex w-full h-0.5 ${
                      stepCount >= index + 1 ? "bg-gray-500" : "bg-gray-200"
                    }`}
                  />
                )}
              </div>
            <div className="mt-3 sm:pe-8">
              <h3 className="text-sm font-semibold text-gray-900">{label}</h3>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default ProgressBar;
