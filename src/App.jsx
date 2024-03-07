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
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";
//jPvDqODtBCZ15qQ6: db password

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{ margin: "8px" }}
        toastOptions={{
          success: {
            duration: 3000,
          },
          error: {
            duration: 5000,
          },
          style: {
            fontSize: "16px",
            maxWidth: "500px",
            backgroundColor: "var(--color-gray-0)",
            color: "var(--color-gray-700)",
          },
        }}
      />
      <ReactQueryDevtools initialIsOpen={false} />

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
    </QueryClientProvider>
  );
}

export default App;
