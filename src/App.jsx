import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Account from "./pages/Account";
import Navigation from "./components/Navigation";
import { useEffect } from "react";
import Spinner from "./components/Spinner";
import { useAuth } from "./store/AuthContext";
import { FastSpringProvider } from "./store/FastSpringContext";

function App() {
  const { user, login, loading, fastspringAccount } = useAuth();
  console.log(fastspringAccount);

  useEffect(() => {
    if (!user) login();
  }, []);

  return (
    <>
      <div id="message"></div>
      {loading && <Spinner />}
      {!loading && (
        <FastSpringProvider>
          <Navigation user={user} />
          <Routes>
            <Route path="/" element={<Account user={user} />} />
            {/* <Route path="/about" element={<About />} /> */}
          </Routes>
        </FastSpringProvider>
      )}
    </>
  );
}

export default App;
