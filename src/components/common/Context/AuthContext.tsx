import React, {
  useState,
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useContext,
} from "react";
import { getme } from "./../../../apis/user/getme";

type Context = {
  isLogedIn: boolean | undefined;
  currentUser: { _id: string; name: string; email: string };
  handleLogout: () => void;
  setIsLogedIn: Dispatch<SetStateAction<boolean | undefined>>;
};
export const AuthContext: React.Context<Context> = createContext<Context>({
  isLogedIn: false,
  currentUser: { _id: "", name: "", email: "" },
  handleLogout: () => undefined,
  setIsLogedIn: () => undefined,
});

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLogedIn, setIsLogedIn] = useState<boolean | undefined>(undefined);
  const [currentUser, setCurrentUser] = useState({
    _id: "",
    name: "",
    email: "",
  });

  const handleLogout = () => {
    setIsLogedIn(false);
  };

  const checkLoginStatus = async () => {
    const response = await getme();

    if (response.data.status === "success") {
      setCurrentUser(response.data.data.data);
      setIsLogedIn(true);
    } else {
      setCurrentUser({ _id: "", name: "", email: "" });
      setIsLogedIn(false);
    }
  };

  useEffect(() => {
    if (isLogedIn !== false) checkLoginStatus();
  }, [isLogedIn]);

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        isLogedIn,
        handleLogout,
        setIsLogedIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
