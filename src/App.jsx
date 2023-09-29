// Libreries
import { BrowserRouter, Routes, Route } from "react-router-dom";
// Layouts
import AuthLayout from "./layout/auth/AuthLayout";
import RouteProtected from "./layout/protectedRoutes/RouteProtected";
import UsersLayout from "./layout/protectedRoutes/UsersLayout";
import KitchenLayout from "./layout/protectedRoutes/KitchenLayout";
import CajaLayout from "./layout/protectedRoutes/CajaLayout";

// Pages auth
import Login from "./pages/authPages/Login";
import Register from "./pages/authPages/Register";
import VerifyAccount from "./pages/authPages/VerifyAccount";
import ForgotPassword from "./pages/authPages/ForgotPassword";
import NewPassword from "./pages/authPages/NewPassword";
// Providers
import { AuthProvider } from "./context/AuthProvider";
import { CategoriesProvider } from "./context/CategoriesProvider";
import { TablesProvider } from "./context/TablesProvider";
import { UserProvider } from "./context/UserProvider";
import { OrdersProvider } from "./context/OrdersProvider";
import { MealsProvider } from "./context/MealsProvider";
// Pages admin
import CreateCategories from "./pages/adminPages/CreateCategories";
import AdminOrders from "./pages/adminPages/AdminOrders";
import MenuAdmin from "./pages/adminPages/MenuAdmin";
import CreateMeals from "./pages/adminPages/CreateMeals";
import TablesAdmin from "./pages/adminPages/TablesAdmin";
import CreateTable from "./pages/adminPages/CreateTable";
import UserAdmin from "./pages/adminPages/UserAdmin";
import CreateUser from "./pages/adminPages/CreateUser";
import Main from "./pages/staffPages/Main";
// Pages Staff
import CreateOrder from "./pages/staffPages/CreateOrder";
import Orders from "./pages/staffPages/Orders";
import OrdersKitchen from "./pages/staffPages/OrdersKitchen";
import OrdersCaja from "./pages/staffPages/OrdersCaja";

function App() {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <UserProvider>
            <CategoriesProvider>
              <MealsProvider>
                <TablesProvider>
                  <OrdersProvider>
                    <Routes>
                      {/* Public Routes */}
                      <Route path="/" element={<AuthLayout />}>
                        {/* Login */}
                        <Route index element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        {/* Verify account */}
                        <Route path="/verify/:id" element={<VerifyAccount />} />
                        {/* Forgot password */}
                        <Route
                          path="forgot-password"
                          element={<ForgotPassword />}
                        />
                        <Route
                          path="forgot-password/:token"
                          element={<NewPassword />}
                        />
                      </Route>
                      {/******** Private routes **********/}
                      <Route path="/admin" element={<RouteProtected />}>
                        <Route index element={<AdminOrders />} />
                        {/* Categories */}
                        <Route
                          path="/admin/categories"
                          element={<CreateCategories />}
                        />
                        {/* Menu */}
                        <Route path="/admin/menu" element={<MenuAdmin />} />
                        {/* Meals */}
                        <Route path="/admin/meals" element={<CreateMeals />} />
                        {/* Tables */}
                        <Route path="/admin/tables" element={<TablesAdmin />} />
                        <Route
                          path="/admin/create-tables"
                          element={<CreateTable />}
                        />
                        {/* Users */}
                        <Route path="/admin/users" element={<UserAdmin />} />
                        <Route
                          path="/admin/create-user"
                          element={<CreateUser />}
                        />
                      </Route>
                      {/* Users Staff */}
                      <Route path="/user" element={<UsersLayout />}>
                        <Route index element={<Main />} />
                        {/* Create order */}
                        <Route
                          path="/user/create-order"
                          element={<CreateOrder />}                       
                        />
                         <Route
                          path="/user/orders"
                          element={<Orders/>}/>
                      </Route>

                      {/* Kitchen */}
                      <Route path="/kitchen-orders" element={<KitchenLayout/>}>
                        <Route index element={<OrdersKitchen/>} />
                      </Route>
                      {/* Cocina */}
                      <Route path="/caja-orders" element={<CajaLayout/>}>
                        <Route index element={<OrdersCaja/>} />
                      </Route>
                    </Routes>
                  </OrdersProvider>
                </TablesProvider>
              </MealsProvider>
            </CategoriesProvider>
          </UserProvider>
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
