import { BrowserRouter, Route, Routes } from "react-router-dom";
import Account from "./pages/Account";
import Dashboard from "./pages/Dashboard";
import Users from "./pages/Users";
import Settings from "./pages/Settings";
import Cabins from "./pages/Cabins";
import Bookings from "./pages/Bookings";
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="users" element={<Users />} />
        <Route path="account" element={<Account />} />
        <Route path="settings" element={<Settings />} />
        <Route path="cabins" element={<Cabins />} />
        <Route path="bookings" element={<Bookings />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="login" element={<Login />} />
        <Route path="*" element={<PageNotFound />} />
        
        {/* <Route path="checkin/:bookingId" element={} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
