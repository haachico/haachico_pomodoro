import { useEffect, useState } from "react";

export const useDelayUnmount = (
  isMounted: boolean,
  delayTime: number,
  direction: "next" | "prev"
) => {
  const [shouldRender, setShouldRender] = useState<boolean>(false);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    if (isMounted && !shouldRender) {
      setShouldRender(true);
    } else if (!isMounted && shouldRender) {
      timeoutId = setTimeout(() => setShouldRender(false), delayTime);
    }
    return () => clearTimeout(timeoutId);
  }, [isMounted, delayTime, shouldRender]);

  const animationClass = isMounted
    ? direction === "next"
      ? "mountedRight"
      : "mountedLeft"
    : direction === "next"
    ? "unmountedLeft"
    : "unmountedRight";

  return { shouldRender, animationClass };
};
