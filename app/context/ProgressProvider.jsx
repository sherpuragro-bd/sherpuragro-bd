"use client";

import { ProgressProvider } from "@bprogress/next/app";

const ReProgressProviders = ({ children }) => {
  return (
    <ProgressProvider
      height="3px"
      options={{ showSpinner: false }}
      color="#0ebb7e"
    >
      {children}
    </ProgressProvider>
  );
};

export default ReProgressProviders;
