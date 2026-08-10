// components/ResponsiveWrapper.tsx
"use client";
import { useEffect, useState } from "react";

interface ResponsiveWrapperProps {
  children: React.ReactNode;
  desktopOnly?: boolean;
  mobileOnly?: boolean;
}

export default function ResponsiveWrapper({
  children,
  desktopOnly = false,
  mobileOnly = false,
}: ResponsiveWrapperProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  if (desktopOnly && isMobile) return null;
  if (mobileOnly && !isMobile) return null;

  return <>{children}</>;
}   