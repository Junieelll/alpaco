import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation();

  // Layout effect runs before paint, so the new page is already at the top
  // when its whileInView observers take their first measurement. A regular
  // useEffect runs too late: the new page is briefly rendered at the old
  // scroll position and every reveal near the bottom fires off-screen.
  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname]);

  return null;
}
