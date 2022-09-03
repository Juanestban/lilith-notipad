import { useEffect, ReactNode } from "react";
import { useRouter } from "next/router";

interface WrapperProps {
  children: ReactNode;
}

export const Wrapper = ({ children }: WrapperProps) => {
  const { pathname, ...navigate } = useRouter();

  useEffect(() => {
    pathname === "/" && navigate.push("/home");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.href]);

  return <>{children}</>;
};
