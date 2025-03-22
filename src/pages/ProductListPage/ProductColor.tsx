import { useState } from 'react'

const ProductColor = ({ colors }: { colors: string[] }) => {
  const [selectedColors, setSelectedColors] = useState<string[]>([]);

  const toggleColor = (color: string) => {
    setSelectedColors(prev =>
      prev.includes(color) ? prev.filter(c => c !== color) : [...prev, color]
    );
  };

  return (
    <div className='flex items-center gap-2'>
      {colors?.map((color: string, index) => (
        <div
          key={index}
          className='w-6 h-6 rounded-full m-1 cursor-pointer border-2'
          style={{
            background: color.toLowerCase(),
            border: selectedColors.includes(color) ? '2px solid #e50c3e' : '1px solid black'
          }}
          onClick={() => toggleColor(color)}
        ></div>
      ))}
    </div>
  );
};

export default ProductColor;
