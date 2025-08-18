import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import { API_PATHS } from "../utils/apiPaths";


interface User {
  id: string;
  name: string;
  email: string;
  
}

export const useAuthContext = () => {
  const { user, updateUser, clearUser } = useContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) return;
    
    let isMounted = true;
    
    const fetchUserInfo = async (): Promise<void> => {
      try {
        const response = await axiosInstance.get<User>(API_PATHS.AUTH.GET_USER_INFO);
        
        if (isMounted && response.data) {
          updateUser(response.data);
        }
      } catch (error) {
        console.error("Error fetching user:", error);
        if (isMounted) {
          clearUser();
          navigate("/login");
        }
      }
    };

    fetchUserInfo();

    return () => {
      isMounted = false;
    };
  }, [user, updateUser, clearUser, navigate]);

  return { user, updateUser, clearUser };
};

