import React from "react";
import { MdNavigateBefore } from "react-icons/md";

const BackButton: React.FC<{ onClick: () => void }> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="text-white rounded h-16 w-16 flex items-center justify-center"
    >
      <MdNavigateBefore size={32} className="hidden sm:block" />
      <span className="block sm:hidden mt-8 underline">Voltar</span>
    </button>
  );
};

export default BackButton;