import "./App.css";
import { Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import i18n from "./services/i18n";
import NavHandler from "./components/nav/NavHandler";
import ModalAuth from "./components/auth/ModalAuth";
import ModalSearch from "./pages/search/components/ModalSearch";
import CustomToasts from "./components/toasts/CustomToast";
import RequireAuth from "./components/routes/RequireAuth";
import Home from "./pages/Home";
import Search from "./pages/search/Search";
import Detail from "./pages/details/Detail";
import Top from "./pages/Top";
import Discover from "./pages/discover/Discover";
import ResetPw from "./pages/ResetPw";
import Profile from "./pages/profile/Profile";
import NotFound from "./pages/NotFound";
import Watchlist from "./pages/watchlist/Watchlist";
import WatchlistContent from "./pages/watchlist/WatchlistContent";
import ProfileSettings from "./pages/profile/ProfileSettings";

function App() {
  const [showSearch, setShowSearch] = useState(false);
  const [showBurger, setShowBurger] = useState(false);
  const [showAuth, setShowAuth] = useState(false);

  //--- Use User's Language Preference from Local Storage ---//
  useEffect(() => {
    const currentLng = localStorage.getItem("lng");
    if (currentLng) i18n.changeLanguage(currentLng);
  }, []);

  return (
    <>
      <NavHandler
        setShowSearch={setShowSearch}
        showBurger={showBurger}
        setShowBurger={setShowBurger}
        setShowAuth={setShowAuth}
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/top" element={<Top />} />
        <Route path="/discover" element={<Discover />} />
        <Route path="/details/:type/:id" element={<Detail />} />
        <Route path="/reset-password/:token" element={<ResetPw />} />
        <Route element={<RequireAuth />}>
          <Route path="/watchlist" element={<Watchlist />} />
          <Route path="/watchlist/:id" element={<WatchlistContent />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile/settings" element={<ProfileSettings />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
      {showSearch && (
        <ModalSearch
          setShowSearch={setShowSearch}
          setShowBurger={setShowBurger}
        />
      )}
      {showAuth && <ModalAuth showAuth={showAuth} setShowAuth={setShowAuth} />}
      <CustomToasts />
    </>
  );
}

export default App;
