import React, { createContext} from 'react'


export const DataContext = createContext();
export const { Provider } = DataContext

export const DataProvider = ({children}) => {

return (
      <Provider>
          {children}
      </Provider>
    
  )
}
