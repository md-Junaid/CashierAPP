import React, { createContext, useState } from 'react';

export const UserContext = createContext();

export function UserProvider({ children }) {
  const [userData, setUserData] = useState(null);
  const [value, setValue] = React.useState(''); // name of the customer
  const [selectedItems, setSelectedItems] = React.useState([]); // items bought by the customer

  return (
    <UserContext.Provider value={{ userData, setUserData, value, setValue }}>
      {children}
    </UserContext.Provider>
  );
}