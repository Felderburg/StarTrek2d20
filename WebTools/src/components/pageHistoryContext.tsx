import React, { createContext, useContext } from 'react';
import { PageIdentity } from '../pages/pageIdentity';

export type PageHistoryContextType = {
  activePage: PageIdentity;
  canGoBack?: boolean;
  onBack?: () => void;
};

const PageHistoryContext = createContext<PageHistoryContextType>({
  activePage: PageIdentity.Home,
  canGoBack: false,
  onBack: undefined,
});

interface PageHistoryProperties {
  activePage: PageIdentity;
  canGoBack: boolean;
  onBack?: () => void;
  children: React.ReactNode;
}

export const PageHistoryProvider: React.FC<PageHistoryProperties> = ({
  children,
  activePage,
  canGoBack,
  onBack,
}) => {
  return (
    <PageHistoryContext.Provider
      value={{
        activePage,
        canGoBack,
        onBack,
      }}
    >
      {children}
    </PageHistoryContext.Provider>
  );
};

export const usePageHistory = () => useContext(PageHistoryContext);
