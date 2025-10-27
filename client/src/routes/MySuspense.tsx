import React from "react";
import Loader from "@/components/Loader";

const MySuspense = ({ children }: { children: React.ReactNode }) => {
  return <React.Suspense fallback={<Loader />}>{children}</React.Suspense>;
};

export default MySuspense;
