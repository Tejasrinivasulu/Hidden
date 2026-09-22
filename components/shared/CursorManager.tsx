"use client";

import { usePathname } from "next/navigation";
import CustomCursor from "./CustomCursor";
import { useEffect } from "react";

export default function CursorManager() {
  const pathname = usePathname();
  const isLanding = pathname === "/";

  useEffect(() => {
    if (isLanding) {
      document.body.classList.add("cursor-none");
    } else {
      document.body.classList.remove("cursor-none");
    }
    
    // Cleanup in case of unmount (though it's in root layout)
    return () => {
      document.body.classList.remove("cursor-none");
    };
  }, [isLanding]);

  if (!isLanding) return null;
  
  return <CustomCursor />;
}
