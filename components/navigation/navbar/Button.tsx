const Button = ({ text, onClick, color }: { text: string; onClick: () => void; color?: string }) => {
  const bgColor = color === "red" ? "bg-red-500 hover:bg-red-600" 
                : color === "blue" ? "bg-blue-500 hover:bg-blue-600" 
                : "bg-gray-400 hover:bg-gray-500"; // Default if no color is specified

  return (
    <button
      onClick={onClick}
      className={`h-12 w-28 rounded-lg px-5 font-bold text-white ${bgColor}`}
    >
      {text}
    </button>
  );
};

export default Button;
