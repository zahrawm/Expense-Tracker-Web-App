
export const validateEmail = (email: string): boolean => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};


export const getInitials = (name: string): string => {
  if (!name) return "";
  
  const words = name.split(" ");
  let initials = "";
  
  for (let i = 0; i < Math.min(words.length, 2); i++) {
    if (words[i] && words[i][0]) {
      initials += words[i][0];
    }
  }
  
  return initials.toUpperCase();
};


export const addThousandSeparator = (num: number | string | null | undefined): string => {
  if (num == null || isNaN(Number(num))) return String(num || "");
  
  const [integerPart, decimalPart] = num.toString().split(".");
  const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  
  return decimalPart ? `${formattedInteger}.${decimalPart}` : formattedInteger;
};