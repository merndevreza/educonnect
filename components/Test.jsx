"use client"
import { toast } from "sonner";
import { Button } from "./ui/button";

const Test = () => {
  const handleClick = (mode) => {
    mode ? toast.success("Test success") : toast.error("Test error");
  };
  return (
    <div>
      <Button onClick={() => handleClick(true)}>Test toast</Button>
    </div>
  );
};

export default Test;
