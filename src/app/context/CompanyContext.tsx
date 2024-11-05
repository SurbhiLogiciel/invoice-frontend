import React, { createContext, useContext, useState, ReactNode } from 'react';

interface CompanyContextType {
  companyId: string | null;
  setCompanyId: (id: string) => void;
}

const CompanyContext = createContext<CompanyContextType | undefined>(undefined);

interface CompanyProviderProps {
  children: ReactNode;
}

export const CompanyProvider: React.FC<CompanyProviderProps> = ({
  children,
}) => {
  const [companyId, setCompanyId] = useState<string | null>(null);

  return (
    <CompanyContext.Provider value={{ companyId, setCompanyId }}>
      {children}
    </CompanyContext.Provider>
  );
};

export const useCompany = () => {
  const context = useContext(CompanyContext);
  if (!context) {
    throw new Error('useCompany must be used within a CompanyProvider');
  }
  return context;
};
