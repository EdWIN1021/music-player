"use client";

import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";

interface SubmitButtonProps {
  children: React.ReactNode;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({ children }) => {
  const { pending } = useFormStatus();

  return (
    <Button className="rounded-full" type="submit" disabled={pending}>
      {children}
    </Button>
  );
};

export default SubmitButton;
