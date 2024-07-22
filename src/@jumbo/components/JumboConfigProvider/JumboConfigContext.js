'use client';
import Link from 'next/link';
import React from 'react';

const defaultContextValue = {
  LinkComponent: Link,
};

const JumboConfigContext = React.createContext(defaultContextValue);

export { JumboConfigContext };
