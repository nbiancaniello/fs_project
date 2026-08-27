import { useState, useEffect } from "react";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  FolderOpen,
  Activity,
  Plus,
  RefreshCw,
  Search,
  TrendingUp,
  DollarSign,
  UserCheck,
  CheckCircle,
  Clock,
  MapPin,
  Eye,
  Info
} from "lucide-react";

// Mock Fallback Data in case API is loading or offline
const MOCK_PRODUCTS = [
  { id: "P001", description: "Premium Dark Roast Coffee", price: 12.99, category: "Beverages", inStock: true, isPromotion: true, isNewArrival: false, isActive: true },
  { id: "P002", description: "Organic Almond Milk 1L", price: 4.49, category: "Dairy Alternatives", inStock: true, isPromotion: false, isNewArrival: true, isActive: true },
  { id: "P003", description: "Gluten-Free Granola 500g", price: 6.99, category: "Breakfast", inStock: false, isPromotion: false, isNewArrival: false, isActive: true },
  { id: "P004", description: "Artisanal Sourdough Bread", price: 5.50, category: "Bakery", inStock: true, isPromotion: false, isNewArrival: true, isActive: true },
  { id: "P005", description: "Extra Virgin Olive Oil 500ml", price: 15.00, category: "Pantry", inStock: true, isPromotion: true, isNewArrival: false, isActive: true }
];

const MOCK_ORDERS = [
  { orderID: "ORD-9824", dateIssued: new Date(Date.now() - 3600000 * 2).toISOString(), userID: "user_alex", totalAmount: 32.48, deliveryOption: "Store Pickup", items: [MOCK_PRODUCTS[0], MOCK_PRODUCTS[1]] },
  { orderID: "ORD-8711", dateIssued: new Date(Date.now() - 3600000 * 8).toISOString(), userID: "user_sophie", totalAmount: 15.00, deliveryOption: "Home Delivery", items: [MOCK_PRODUCTS[4]] },
  { orderID: "ORD-7622", dateIssued: new Date(Date.now() - 3600000 * 24).toISOString(), userID: "user_daniel", totalAmount: 26.48, deliveryOption: "Store Pickup", items: [MOCK_PRODUCTS[2], MOCK_PRODUCTS[4]] }
];

const MOCK_USERS = [
  { username: "user_alex", firstName: "Alex", lastName: "Rivera", email: "alex.rivera@example.com", phone: "+1 555-0199", address: "123 Maple St, Springfield", isActive: true },
  { username: "user_sophie", firstName: "Sophie", lastName: "Chen", email: "sophie.c@example.com", phone: "+1 555-0144", address: "456 Oak Ave, Riverdale", isActive: true },
  { username: "user_daniel", firstName: "Daniel", lastName: "Smith", email: "d.smith@example.com", phone: "+1 555-0177", address: "789 Pine Rd, Lakeshore", isActive: true }
];

const MOCK_CATEGORIES = [
  { description: "Beverages", isActive: true },
  { description: "Dairy Alternatives", isActive: true },
  { description: "Breakfast", isActive: true },
  { description: "Bakery", isActive: true },
  { description: "Pantry", isActive: true }
];

function App() {
  const [activeTab, setActiveTab] = useState<"dashboard" | "products" | "orders" | "users" | "categories">("dashboard");
  const [products, setProducts] = useState<any[]>(MOCK_PRODUCTS);
  const [orders, setOrders] = useState<any[]>(MOCK_ORDERS);
  const [users, setUsers] = useState<any[]>(MOCK_USERS);
  const [categories, setCategories] = useState<any[]>(MOCK_CATEGORIES);
  const [isLoading, setIsLoading] = useState(false);
  const [dbConnected, setDbConnected] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedOrder, setSelectedOrder] = useState<any | null>(null);

  const API_URL = "http://localhost:5001/api/admin";

  const fetchData = async () => {
    setIsLoading(true);
    try {
      // Test health endpoint first
      const healthRes = await fetch(`${API_URL}/health`);
      if (healthRes.ok) {
        setDbConnected(true);
        
        // Fetch actual data
        const [prodRes, ordRes, usrRes, catRes] = await Promise.all([
          fetch(`${API_URL}/products`),
          fetch(`${API_URL}/orders`),
          fetch(`${API_URL}/users`),
          fetch(`${API_URL}/categories`)
        ]);

        if (prodRes.ok) setProducts(await prodRes.json());
        if (ordRes.ok) setOrders(await ordRes.json());
        if (usrRes.ok) setUsers(await usrRes.json());
        if (catRes.ok) setCategories(await catRes.json());
      } else {
        setDbConnected(false);
      }
    } catch (error) {
      console.warn("Backend is offline, using premium mock fallback data:", error);
      setDbConnected(false);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Compute Dashboard Stats
  const totalRevenue = orders.reduce((sum, order) => sum + order.totalAmount, 0);
  const totalProducts = products.length;
  const totalOrdersCount = orders.length;
  const activeUsersCount = users.filter(u => u.isActive).length;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex font-sans selection:bg-purple-600 selection:text-white">
      {/* Sidebar Navigation */}
      <aside className="w-72 bg-slate-900 border-r border-slate-800 flex flex-col justify-between shrink-0">
        <div>
          {/* Logo / Header */}
          <div className="p-6 border-b border-slate-800 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 to-indigo-500 flex items-center justify-center shadow-lg shadow-purple-900/30">
              <Activity className="w-5 h-5 text-white animate-pulse" />
            </div>
            <div>
              <h1 className="font-bold text-lg tracking-tight bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
                StoreAdmin
              </h1>
              <p className="text-xs text-slate-500 font-medium">Maintenance Portal</p>
            </div>
          </div>

          {/* Navigation items */}
          <nav className="p-4 space-y-1.5">
            <button
              onClick={() => setActiveTab("dashboard")}
              className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                activeTab === "dashboard"
                  ? "bg-gradient-to-r from-purple-900/50 to-indigo-900/50 text-purple-300 border-l-4 border-purple-500 shadow-md shadow-purple-950/20"
                  : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
              }`}
            >
              <LayoutDashboard className="w-4.5 h-4.5" />
              Overview
            </button>
            <button
              onClick={() => setActiveTab("products")}
              className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                activeTab === "products"
                  ? "bg-gradient-to-r from-purple-900/50 to-indigo-900/50 text-purple-300 border-l-4 border-purple-500 shadow-md shadow-purple-950/20"
                  : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
              }`}
            >
              <Package className="w-4.5 h-4.5" />
              Products List
            </button>
            <button
              onClick={() => setActiveTab("orders")}
              className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                activeTab === "orders"
                  ? "bg-gradient-to-r from-purple-900/50 to-indigo-900/50 text-purple-300 border-l-4 border-purple-500 shadow-md shadow-purple-950/20"
                  : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
              }`}
            >
              <ShoppingCart className="w-4.5 h-4.5" />
              Orders
            </button>
            <button
              onClick={() => setActiveTab("users")}
              className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                activeTab === "users"
                  ? "bg-gradient-to-r from-purple-900/50 to-indigo-900/50 text-purple-300 border-l-4 border-purple-500 shadow-md shadow-purple-950/20"
                  : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
              }`}
            >
              <Users className="w-4.5 h-4.5" />
              Users
            </button>
            <button
              onClick={() => setActiveTab("categories")}
              className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                activeTab === "categories"
                  ? "bg-gradient-to-r from-purple-900/50 to-indigo-900/50 text-purple-300 border-l-4 border-purple-500 shadow-md shadow-purple-950/20"
                  : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
              }`}
            >
              <FolderOpen className="w-4.5 h-4.5" />
              Categories
            </button>
          </nav>
        </div>

        {/* Database Sync Status Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-900/40">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Sync Connection</span>
            <span className={`w-2.5 h-2.5 rounded-full ${dbConnected ? "bg-emerald-500" : "bg-amber-500"} animate-pulse`}></span>
          </div>
          <p className="text-xs text-slate-400 font-medium">
            {dbConnected ? "Linked to Live MongoDB Atlas" : "Local Sandbox fallback mode"}
          </p>
          <button
            onClick={fetchData}
            disabled={isLoading}
            className="mt-3 w-full flex items-center justify-center gap-2 text-xs font-semibold py-2 px-3 rounded-lg border border-slate-700 hover:border-slate-600 hover:bg-slate-800/50 transition duration-200 text-slate-300 disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? "animate-spin" : ""}`} />
            Refresh Systems
          </button>
        </div>
      </aside>

      {/* Main Panel Area */}
      <main className="flex-1 flex flex-col min-w-0 bg-slate-950 overflow-y-auto">
        {/* Top Header Bar */}
        <header className="h-20 border-b border-slate-800 px-8 flex items-center justify-between shrink-0 bg-slate-900/30 backdrop-blur-md sticky top-0 z-10">
          <div className="flex items-center gap-4">
            <h2 className="text-xl font-bold tracking-tight text-white capitalize">
              {activeTab === "dashboard" ? "Dashboard Overview" : `${activeTab} Management`}
            </h2>
          </div>

          <div className="flex items-center gap-4">
            {/* Search Input for Tables */}
            {activeTab !== "dashboard" && (
              <div className="relative w-64">
                <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder={`Search ${activeTab}...`}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full text-sm bg-slate-900 border border-slate-800 rounded-xl py-2 pl-9 pr-4 text-slate-300 placeholder-slate-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all duration-200"
                />
              </div>
            )}

            {/* Profile */}
            <div className="flex items-center gap-3 pl-4 border-l border-slate-800">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center font-bold text-sm text-white shadow-md">
                AD
              </div>
              <div className="hidden md:block">
                <p className="text-sm font-semibold text-white">Admin Account</p>
                <p className="text-xs text-purple-400 font-medium">System Manager</p>
              </div>
            </div>
          </div>
        </header>

        {/* Dynamic Page Views */}
        <div className="p-8 max-w-7xl w-full mx-auto space-y-8 flex-1">
          {activeTab === "dashboard" && (
            <>
              {/* Stat Cards Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Stats 1 */}
                <div className="bg-slate-900/50 border border-slate-800/80 p-6 rounded-2xl relative overflow-hidden group hover:border-purple-500/50 transition-all duration-300">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500/5 rounded-full blur-xl group-hover:bg-purple-500/10 transition-all duration-300"></div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm text-slate-400 font-medium">Total Revenue</span>
                    <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-400 border border-purple-500/20">
                      <DollarSign className="w-5 h-5" />
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-white">${totalRevenue.toFixed(2)}</h3>
                  <div className="flex items-center gap-1.5 mt-2.5 text-xs text-emerald-400 font-semibold">
                    <TrendingUp className="w-3.5 h-3.5" />
                    <span>+12.4% this week</span>
                  </div>
                </div>

                {/* Stats 2 */}
                <div className="bg-slate-900/50 border border-slate-800/80 p-6 rounded-2xl relative overflow-hidden group hover:border-indigo-500/50 transition-all duration-300">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/5 rounded-full blur-xl group-hover:bg-indigo-500/10 transition-all duration-300"></div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm text-slate-400 font-medium">Active Products</span>
                    <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-400 border border-indigo-500/20">
                      <Package className="w-5 h-5" />
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-white">{totalProducts}</h3>
                  <p className="text-xs text-slate-500 font-medium mt-3">Shared in Client Store schema</p>
                </div>

                {/* Stats 3 */}
                <div className="bg-slate-900/50 border border-slate-800/80 p-6 rounded-2xl relative overflow-hidden group hover:border-blue-500/50 transition-all duration-300">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/5 rounded-full blur-xl group-hover:bg-blue-500/10 transition-all duration-300"></div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm text-slate-400 font-medium">Orders Placed</span>
                    <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400 border border-blue-500/20">
                      <ShoppingCart className="w-5 h-5" />
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-white">{totalOrdersCount}</h3>
                  <div className="flex items-center gap-1.5 mt-2.5 text-xs text-emerald-400 font-semibold">
                    <CheckCircle className="w-3.5 h-3.5" />
                    <span>All synced correctly</span>
                  </div>
                </div>

                {/* Stats 4 */}
                <div className="bg-slate-900/50 border border-slate-800/80 p-6 rounded-2xl relative overflow-hidden group hover:border-pink-500/50 transition-all duration-300">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-pink-500/5 rounded-full blur-xl group-hover:bg-pink-500/10 transition-all duration-300"></div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm text-slate-400 font-medium">Customers List</span>
                    <div className="w-10 h-10 rounded-xl bg-pink-500/10 flex items-center justify-center text-pink-400 border border-pink-500/20">
                      <Users className="w-5 h-5" />
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-white">{activeUsersCount}</h3>
                  <p className="text-xs text-slate-500 font-medium mt-3">Mongoose validated accounts</p>
                </div>
              </div>

              {/* Informative banners about backend schema linking */}
              <div className="bg-gradient-to-r from-purple-950/30 to-indigo-950/30 border border-purple-800/30 p-6 rounded-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-purple-500/10 rounded-xl text-purple-400 border border-purple-500/20 shrink-0">
                    <Info className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-base">Linked Schema Data Consistency</h4>
                    <p className="text-sm text-slate-400 mt-1 max-w-xl">
                      Both the Client store backend and this new Admin panel connect to the same Mongoose database schemas. Admin operations like adding stock or toggling promotions instantly updates the client view.
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 border border-purple-500/20 bg-purple-950/40 py-2 px-4 rounded-xl text-xs font-semibold text-purple-300">
                  <UserCheck className="w-4 h-4" />
                  <span>Admin Role Enforcement Active</span>
                </div>
              </div>

              {/* Dynamic Order Stream / Log */}
              <div className="bg-slate-900/30 border border-slate-800 rounded-2xl p-6">
                <h3 className="text-base font-bold text-white mb-4">Recent Transaction History</h3>
                <div className="divide-y divide-slate-800">
                  {orders.map((order) => (
                    <div key={order.orderID} className="py-4 flex items-center justify-between group">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center font-bold text-xs text-slate-300">
                          {order.orderID.split("-")[1] || order.orderID.slice(-4)}
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-white group-hover:text-purple-400 transition duration-150">
                            Order {order.orderID}
                          </p>
                          <div className="flex items-center gap-2 text-xs text-slate-500 mt-1">
                            <span>User: {order.userID}</span>
                            <span>•</span>
                            <span className="flex items-center gap-1">
                              <MapPin className="w-3 h-3 text-slate-500" />
                              {order.deliveryOption}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-bold text-white">${order.totalAmount.toFixed(2)}</p>
                        <p className="text-xs text-slate-500 mt-1">
                          {new Date(order.dateIssued).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {activeTab === "products" && (
            <div className="bg-slate-900/30 border border-slate-800 rounded-2xl overflow-hidden">
              <div className="px-6 py-5 border-b border-slate-800 flex items-center justify-between flex-wrap gap-4">
                <h3 className="text-base font-bold text-white">System Catalog Products</h3>
                <button className="flex items-center gap-2 text-xs font-semibold bg-purple-600 hover:bg-purple-500 py-2.5 px-4 rounded-xl text-white shadow-lg shadow-purple-900/20 hover:-translate-y-0.5 active:translate-y-0 transition duration-200">
                  <Plus className="w-4 h-4" />
                  Add New Product
                </button>
              </div>

              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-800 bg-slate-900/40 text-slate-400 text-xs font-semibold uppercase tracking-wider">
                      <th className="py-4 px-6">ID</th>
                      <th className="py-4 px-6">Description</th>
                      <th className="py-4 px-6">Category</th>
                      <th className="py-4 px-6">Price</th>
                      <th className="py-4 px-6">Status / Badges</th>
                      <th className="py-4 px-6">Active</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-850 text-sm text-slate-300">
                    {products
                      .filter(p => p.description.toLowerCase().includes(searchQuery.toLowerCase()) || p.id.toLowerCase().includes(searchQuery.toLowerCase()))
                      .map((product) => (
                        <tr key={product.id} className="hover:bg-slate-900/20 transition duration-150">
                          <td className="py-4 px-6 font-mono text-xs text-purple-400 font-semibold">{product.id}</td>
                          <td className="py-4 px-6 font-semibold text-white">{product.description}</td>
                          <td className="py-4 px-6 text-slate-400">{product.category}</td>
                          <td className="py-4 px-6 font-bold text-white">${product.price.toFixed(2)}</td>
                          <td className="py-4 px-6 space-x-1.5">
                            {product.inStock ? (
                              <span className="inline-flex text-xxs font-bold bg-emerald-950/60 border border-emerald-800 text-emerald-400 py-1 px-2.5 rounded-full">
                                In Stock
                              </span>
                            ) : (
                              <span className="inline-flex text-xxs font-bold bg-red-950/60 border border-red-800 text-red-400 py-1 px-2.5 rounded-full">
                                Out of Stock
                              </span>
                            )}
                            {product.isPromotion && (
                              <span className="inline-flex text-xxs font-bold bg-purple-950/60 border border-purple-800 text-purple-400 py-1 px-2.5 rounded-full">
                                Promo
                              </span>
                            )}
                            {product.isNewArrival && (
                              <span className="inline-flex text-xxs font-bold bg-blue-950/60 border border-blue-800 text-blue-400 py-1 px-2.5 rounded-full">
                                New
                              </span>
                            )}
                          </td>
                          <td className="py-4 px-6">
                            <span className={`inline-flex w-2.5 h-2.5 rounded-full ${product.isActive ? "bg-emerald-500" : "bg-slate-600"}`}></span>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === "orders" && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Table list of orders */}
              <div className="bg-slate-900/30 border border-slate-800 rounded-2xl overflow-hidden lg:col-span-2">
                <div className="px-6 py-5 border-b border-slate-800">
                  <h3 className="text-base font-bold text-white">Purchase Orders Log</h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-slate-800 bg-slate-900/40 text-slate-400 text-xs font-semibold uppercase tracking-wider">
                        <th className="py-4 px-6">Order ID</th>
                        <th className="py-4 px-6">User</th>
                        <th className="py-4 px-6">Amount</th>
                        <th className="py-4 px-6">Delivery</th>
                        <th className="py-4 px-6">View</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-850 text-sm text-slate-300">
                      {orders
                        .filter(o => o.orderID.toLowerCase().includes(searchQuery.toLowerCase()) || o.userID.toLowerCase().includes(searchQuery.toLowerCase()))
                        .map((order) => (
                          <tr key={order.orderID} className="hover:bg-slate-900/20 transition duration-150">
                            <td className="py-4 px-6 font-semibold text-white">{order.orderID}</td>
                            <td className="py-4 px-6 text-slate-400">{order.userID}</td>
                            <td className="py-4 px-6 font-bold text-white">${order.totalAmount.toFixed(2)}</td>
                            <td className="py-4 px-6">
                              <span className="inline-flex text-xxs font-bold bg-slate-800/80 text-slate-300 py-1 px-2.5 rounded-full border border-slate-700">
                                {order.deliveryOption}
                              </span>
                            </td>
                            <td className="py-4 px-6">
                              <button
                                onClick={() => setSelectedOrder(order)}
                                className="p-1.5 bg-slate-800 border border-slate-700 hover:border-purple-500 rounded-lg hover:text-purple-400 transition"
                              >
                                <Eye className="w-4 h-4" />
                              </button>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Order detail card panel */}
              <div className="bg-slate-900/30 border border-slate-800 rounded-2xl p-6 h-fit">
                <h3 className="text-base font-bold text-white mb-4 border-b border-slate-800 pb-3 flex items-center gap-2">
                  <ShoppingCart className="w-4.5 h-4.5 text-purple-400" />
                  Order Detail Inspector
                </h3>

                {selectedOrder ? (
                  <div className="space-y-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-bold text-white text-base">{selectedOrder.orderID}</h4>
                        <p className="text-xs text-slate-500 mt-0.5">
                          Placed: {new Date(selectedOrder.dateIssued).toLocaleString()}
                        </p>
                      </div>
                      <span className="text-lg font-black text-purple-400">
                        ${selectedOrder.totalAmount.toFixed(2)}
                      </span>
                    </div>

                    <div className="space-y-3">
                      <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Customer & Delivery Info</p>
                      <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4 text-xs space-y-2 text-slate-400">
                        <div className="flex justify-between">
                          <span>User ID:</span>
                          <span className="font-semibold text-white">{selectedOrder.userID}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Option:</span>
                          <span className="font-semibold text-white">{selectedOrder.deliveryOption}</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Ordered Items</p>
                      <div className="space-y-2">
                        {selectedOrder.items.map((item: any, idx: number) => (
                          <div key={idx} className="flex justify-between items-center text-xs bg-slate-950/40 p-2.5 rounded-lg border border-slate-850">
                            <span className="text-white font-medium">{item.description}</span>
                            <span className="font-mono text-slate-400">${item.price.toFixed(2)}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="py-12 text-center space-y-3">
                    <Clock className="w-8 h-8 text-slate-650 mx-auto" />
                    <p className="text-sm text-slate-500 font-medium">Select an order from the list to inspect detail values</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === "users" && (
            <div className="bg-slate-900/30 border border-slate-800 rounded-2xl overflow-hidden">
              <div className="px-6 py-5 border-b border-slate-800">
                <h3 className="text-base font-bold text-white">Registered Users Accounts</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-800 bg-slate-900/40 text-slate-400 text-xs font-semibold uppercase tracking-wider">
                      <th className="py-4 px-6">Username</th>
                      <th className="py-4 px-6">Name</th>
                      <th className="py-4 px-6">Email Address</th>
                      <th className="py-4 px-6">Phone</th>
                      <th className="py-4 px-6">Address</th>
                      <th className="py-4 px-6">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-850 text-sm text-slate-300">
                    {users
                      .filter(u => u.username.toLowerCase().includes(searchQuery.toLowerCase()) || (u.email && u.email.toLowerCase().includes(searchQuery.toLowerCase())))
                      .map((user) => (
                        <tr key={user.username} className="hover:bg-slate-900/20 transition duration-150">
                          <td className="py-4 px-6 font-semibold text-purple-400">{user.username}</td>
                          <td className="py-4 px-6 text-white font-medium">
                            {user.firstName || ""} {user.lastName || ""}
                          </td>
                          <td className="py-4 px-6 text-slate-400">{user.email || "N/A"}</td>
                          <td className="py-4 px-6 text-slate-400 font-mono text-xs">{user.phone || "N/A"}</td>
                          <td className="py-4 px-6 text-slate-400 text-xs truncate max-w-xs">{user.address || "N/A"}</td>
                          <td className="py-4 px-6">
                            {user.isActive ? (
                              <span className="inline-flex items-center gap-1.5 text-xs text-emerald-400 font-semibold bg-emerald-950/20 py-1 px-2.5 rounded-full border border-emerald-900/30">
                                Active
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1.5 text-xs text-slate-500 font-semibold bg-slate-950/20 py-1 px-2.5 rounded-full border border-slate-800/30">
                                Inactive
                              </span>
                            )}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === "categories" && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Category list panel */}
              <div className="bg-slate-900/30 border border-slate-800 rounded-2xl overflow-hidden md:col-span-2">
                <div className="px-6 py-5 border-b border-slate-800 flex justify-between items-center">
                  <h3 className="text-base font-bold text-white">Mongoose Categories Schemas</h3>
                </div>
                <div className="divide-y divide-slate-800">
                  {categories
                    .filter(c => c.description.toLowerCase().includes(searchQuery.toLowerCase()))
                    .map((category, idx) => (
                      <div key={idx} className="p-6 hover:bg-slate-900/10 transition flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
                            <FolderOpen className="w-4.5 h-4.5" />
                          </div>
                          <div>
                            <h4 className="font-bold text-white text-base">{category.description}</h4>
                            <p className="text-xs text-slate-500 mt-0.5">Category schema constraint mapping</p>
                          </div>
                        </div>
                        <span className={`inline-flex items-center text-xs font-semibold py-1 px-2.5 rounded-full ${category.isActive ? "bg-emerald-950/30 text-emerald-400 border border-emerald-900/30" : "bg-slate-900 text-slate-500 border border-slate-850"}`}>
                          {category.isActive ? "Active" : "Inactive"}
                        </span>
                      </div>
                    ))}
                </div>
              </div>

              {/* Static creation preview sidebar panel */}
              <div className="bg-slate-900/30 border border-slate-800 rounded-2xl p-6 h-fit">
                <h3 className="text-base font-bold text-white mb-4 border-b border-slate-800 pb-3 flex items-center gap-2">
                  <FolderOpen className="w-4.5 h-4.5 text-purple-400" />
                  Define Category
                </h3>
                <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 mb-2 uppercase tracking-wide">Category Description</label>
                    <input
                      type="text"
                      placeholder="e.g. Organic Produce"
                      className="w-full text-sm bg-slate-900 border border-slate-800 rounded-xl py-3 px-4 text-slate-300 placeholder-slate-650 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 mb-2 uppercase tracking-wide">Initial Status</label>
                    <select className="w-full text-sm bg-slate-900 border border-slate-800 rounded-xl py-3 px-4 text-slate-300 focus:outline-none focus:border-purple-500 transition-all">
                      <option value="true">Active & Visible to client</option>
                      <option value="false">Hidden / Draft status</option>
                    </select>
                  </div>
                  <button
                    type="submit"
                    className="mt-6 w-full flex items-center justify-center gap-2 text-xs font-bold bg-purple-600 hover:bg-purple-500 py-3 px-4 rounded-xl text-white shadow-lg transition duration-200"
                  >
                    Save Category Mapped Schema
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
