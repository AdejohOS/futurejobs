import React from "react";

interface HeaderProps {
  label: string;
}
const Header = ({ label }: HeaderProps) => {
  return (
    <div className="flex flex-col items-center">
      <h2 className="text-sky-600 font-bold text-xl">FutureJobs</h2>
      <p className="text-muted-foreground sm">{label}</p>
    </div>
  );
};

export default Header;
