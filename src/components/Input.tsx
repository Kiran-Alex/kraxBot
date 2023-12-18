"use client"
import { useState, ChangeEvent, FC } from "react";

export interface InputProps {
  onData: (data: string ) => void;
}

export const Input: FC<InputProps> = ({ onData }) => {
  const [Indata, setIndata] = useState<string>("");

  const sendDataToParent = () => {
    const data = Indata;
    onData(data);
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setIndata(e.target.value);
  
  }

  return (
    <>
      <div className="border-t-2 border-gray-200 pt-2 space-x-2 flex items-center">
        <input
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 flex-grow  text-black"
          placeholder="Type your message here..."
          onChange={handleChange}
          value={Indata}
        />
        <button className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 bg-black" onClick={()=>{
            sendDataToParent();
            setIndata("")
        }}>
          Send
        </button>
      </div>
    </>
  );
};
