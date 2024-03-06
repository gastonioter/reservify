import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Account from "./pages/Account";
import Dashboard from "./pages/Dashboard";
import Users from "./pages/Users";
import Settings from "./pages/Settings";
import Cabins from "./pages/Cabins";
import Bookings from "./pages/Bookings";
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";
import GlobalStyles from "./styles/GlobalStyles";
import AppLayout from "./ui/AppLayout";

function App() {
  return (
    <>
      <GlobalStyles />
      <BrowserRouter>
        <Routes>
          {/* Redirect to login */}

          {/* <Route path="/" element={<Navigate replace to="login" />} />
          <Route path="login" element={<Login />} /> */}

          <Route element={<AppLayout />}>
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="users" element={<Users />} />
            <Route path="account" element={<Account />} />
            <Route path="settings" element={<Settings />} />
            <Route path="cabins" element={<Cabins />} />
            <Route path="bookings" element={<Bookings />} />
          </Route>

          <Route path="*" element={<PageNotFound />} />
          {/* <Route path="checkin/:bookingId" element={} /> */}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
