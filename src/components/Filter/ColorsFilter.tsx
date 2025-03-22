import{ useCallback, useState } from 'react'

const colorSelector = {
    "Black": "#252525",
    "White": "#FFFFFF",
    "Purple": "#511389",
    "Gray": "#808080",
    "Blue": "#0000FF",
    "Red": "#FF0000",
    "Orange": "#FFA500",
    "Navy": "#000080",
    "Grey": "#808080",
    "Yellow": "#FFFF00",
    "Pink": "#FFC0CB",
    "Green": "#008000"
  };

const ColorsFilter = ({colors} : {colors: string[]}) => {
    const [appliedColors, setAppliedColors] = useState<string[]>([]);
    const onclickDiv = useCallback((color:string) => {
        setAppliedColors((prev) => {
            if(prev.includes((color))){
                return prev.filter(item => item !== color);
            }
            else {
                return [...prev, color];
            }
        });   
    }, []);

  return (
    <div className='flex flex-col mb-4 ml-1'>
      <p className='text-[16px] text-black mt-5 mb-5'>Colors</p>
      <div className='flex flex-wrap px-2'>
        {colors.map((color) => {
            return (
                <div className='flex flex-col mr-3'>
                    <div className='border rounded-xl w-8 h-8 mr-4 mb-4 cursor-pointer hover:scale-110' 
                    style={{background: `${colorSelector[color as keyof typeof colorSelector]}`}}
                    onClick={() => onclickDiv(color)}
                    />
                    <p 
            className={`text-sm font-medium mb-2 ${appliedColors.includes(color) ? 'text-black' : 'text-gray-400'}`}> {color} </p>
                </div>
            )
        })}
      </div>
    </div>
  )
}

export default ColorsFilter;
