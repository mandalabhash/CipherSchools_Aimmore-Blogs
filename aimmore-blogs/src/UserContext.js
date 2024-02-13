import React, { createContext, useState } from 'react';

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
  // Set an initial value for userInfo
  const [userInfo, setUserInfo] = useState({
    // Initial properties if needed
  });

  return (
    <UserContext.Provider value={{ userInfo, setUserInfo }}>
      {children}
    </UserContext.Provider>
  );
}
