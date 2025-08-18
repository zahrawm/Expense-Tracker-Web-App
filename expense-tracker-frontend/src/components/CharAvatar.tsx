interface CharAvatarProps {
  fullName: string;
  width?: string;
  height?: string;
}

export const CharAvatar: React.FC<CharAvatarProps> = ({ 
  fullName, 
  width = "w-12", 
  height = "h-12" 
}) => {
 
  const getInitials = (name: string): string => {
    if (!name) return "";
    return name
      .split(" ")
      .map(word => word.charAt(0).toUpperCase())
      .join("")
      .slice(0, 2); 
  };

  return (
    <div className={`${width} ${height} bg-gray-500 rounded-full flex items-center justify-center text-white font-semibold`}>
      {getInitials(fullName)}
    </div>
  );
};