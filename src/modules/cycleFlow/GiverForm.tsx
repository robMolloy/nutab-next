import React from "react";

export type TGiverFormProps = {
  children: React.ReactNode;
};

export const GiverForm = (p: TGiverFormProps) => {
  return <div>GiverForm & {p.children}</div>;
};
