import React, { createContext, useState, useEffect } from 'react';

// 1. Create the Context object
const SessionContext = createContext();

const initialState = {
  passType: '',
  eventId: '',
  billingUser: {},
  order: {},
  orderItems: {},
  attendees: {},
  transaction: {}
};

export function SessionProvider({ children }) {

  const [sessionData, setSessionData] = useState(() => {
    const saved = localStorage.getItem('sessionData');
    if (saved && saved !== 'undefined') {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // Optionally log or clear storage if corrupted
        localStorage.removeItem('sessionData'); // Prevent looping error
        return initialState;
      }
    }
    return initialState;
  });

  useEffect(() => {
    localStorage.setItem('sessionData', JSON.stringify(sessionData));
  }, [sessionData]);

  const updateSection = (sectionName, data) => {
    setSessionData(prev => ({
      ...prev,
      [sectionName]: {
        ...prev[sectionName],
        ...data,
      },
    }));
  };

  return (
    <SessionContext.Provider value={{ sessionData, setSessionData, updateSection }}>
      {children}
    </SessionContext.Provider>
  );
}

export default SessionContext;