import { useNavigate, type NavigateFunction } from "react-router-dom";
import { useRoutes } from "react-router-dom";
import routes from "./config";

// Extend the Window interface to include our custom property
declare global {
   interface Window {
      REACT_APP_NAVIGATE: NavigateFunction;
   }
}

let navigateResolver: (navigate: ReturnType<typeof useNavigate>) => void;

export const navigatePromise = new Promise<NavigateFunction>((resolve) => {
   navigateResolver = resolve;
});

export function AppRoutes() {
   const element = useRoutes(routes);
   const navigate = useNavigate();
   window.REACT_APP_NAVIGATE = navigate;
   navigateResolver(navigate);
   return element;
}
