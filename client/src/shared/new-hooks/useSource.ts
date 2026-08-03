import { useContext } from "react";
import { SOURCE_CONTEXT } from "../contexts/SourceContext";

export const useSource = () => {
  const Context = useContext(SOURCE_CONTEXT);
  if (!Context) throw new Error("Source context is undefined");
  return Context;
};
