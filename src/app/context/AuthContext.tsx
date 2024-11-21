// src/context/AuthContext.tsx

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface AuthContextType {
  hasRegisteredEmail: boolean;
  registerEmail: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [hasRegisteredEmail, setHasRegisteredEmail] = useState<boolean>(false);

  const registerEmail = () => setHasRegisteredEmail(true);

  return (
    <AuthContext.Provider value={{ hasRegisteredEmail, registerEmail }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
