const Button = ({ text, onClick, color, className = '', }: { text: string; onClick: () => void; color?: string; className?: string; }) => {
  const bgColor = color === "red" ? "bg-red-500 hover:bg-red-600 text-white sm:h-12 sm:w-28 h-10 w-16" 
                : color === "blue" ? "bg-blue-500 hover:bg-blue-600 text-white sm:h-12 sm:w-28 h-10 w-16" 
                : color === "none" ? "bg-transparent hover:bg-transparent h-8" 
                : "bg-gray-400 hover:bg-gray-500 text-white sm:h-12 sm:w-28 h-10 w-16"; // Default if no color is specified

  return (
    <button
      onClick={onClick}
      className={`rounded-lg text-sm sm:text-base sm:px-5 font-bold ${bgColor} ${className}`}
    >
      {text}
    </button>
  );
};

export default Button;
