import { useEffect, useState } from "react";

function getWindowDimensions() {
  return { width: window.innerWidth, height: window.innerHeight };
}

function useWindowResize() {
  const [screenSize, setScreenSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    function handleResize() {
      setScreenSize(getWindowDimensions());
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return screenSize;
}

export default useWindowResize;
