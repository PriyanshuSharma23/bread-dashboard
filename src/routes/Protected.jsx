import { onAuthStateChanged, getAuth } from "firebase/auth";
import { Outlet, useNavigate } from "react-router-dom";

export const Protected = () => {
  const navigator = useNavigate();
  const auth = getAuth();

  onAuthStateChanged(auth, (user) => {
    if (!user) {
      navigator("/sign-in");
    }
  });

  return <Outlet />;
};
