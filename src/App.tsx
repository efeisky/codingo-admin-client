import { Routes, Route, useLocation } from "react-router-dom";
import { routes } from "./routes/routes";
import HomePage from "./pages/home/home_page";
import LoginPage from "./pages/login/login_page";
import Default from "./pages/Default";
import { useEffect } from "react";
import { LoginLayout } from "./pages/LoginLayout";
import VerifyLogin from "./pages/verify_login/VerifyLogin";

function App() {
  const location = useLocation();

  const setPageTitle = () => {
    const path = location.pathname;
    switch (path) {
      case '/':
        document.title = routes.default_path.title
        break;

      case '/login':
        document.title = routes.login.title
        break;
        
      case '/login':
        document.title = routes.login.title
        break;

      case '/home':
        document.title = routes.homepage.title
        break;
        
    }
  };

  useEffect(() => {
    setPageTitle();
  }, [location]);

  return (
    <>
      <Routes>
        <Route path={routes.default_path.path} element={<Default />} />
        <Route path={routes.login.path} element={<LoginLayout/>}>
          <Route index={true} element={<LoginPage/>}/>
          <Route path='verify' element={<VerifyLogin/>}/>
        </Route>
        <Route path={routes.homepage.path} element={<HomePage />} />
      </Routes>
    </>
  );
}

export default App;
