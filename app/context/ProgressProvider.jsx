"use client";

import { ProgressProvider } from "@bprogress/next/app";

const ReProgressProviders = ({ children }) => {
  return (
    <ProgressProvider height="3px" color="#0ebb7e" shallowRouting>
      {children}
    </ProgressProvider>
  );
};

export default ReProgressProviders;
