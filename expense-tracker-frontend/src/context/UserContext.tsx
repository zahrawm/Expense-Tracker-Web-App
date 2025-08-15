import { createContext, useState } from "react";

interface UserContextType {
  user: any;
  updateUser: (userData: any) => void;
  clearUser: () => void;
}

export const UserContext = createContext<UserContextType | undefined>(undefined);

const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState(null);

  const updateUser = (userData:any) => {
    setUser(userData);
  };

  const clearUser = () => {
    setUser(null);
  };

  return(
    <UserContext.Provider
     value={{ user, updateUser, clearUser }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;