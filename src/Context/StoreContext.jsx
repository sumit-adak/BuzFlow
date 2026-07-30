import { useState, useEffect } from "react";
import { StoreContext } from "./StoreContext.js";

export { StoreContext };

const INITIAL_CUSTOMERS = [
  {
    id: "CUST-101",
    name: "Eleanor Vance",
    email: "eleanor.vance@example.com",
    phone: "+91 98765 43210",
    business: "Apex Design Studio",
    status: "VIP",
    totalSpent: 342500.00,
    ordersCount: 18,
    lastOrderDate: "2026-07-28",
    outstandingBalance: 0.00,
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
    tags: ["Retail", "High Volume"],
  },
  {
    id: "CUST-102",
    name: "Marcus Holloway",
    email: "marcus@dedsec-tech.io",
    phone: "+91 98765 12345",
    business: "Holloway Logistics",
    status: "Active",
    totalSpent: 128900.50,
    ordersCount: 12,
    lastOrderDate: "2026-07-26",
    outstandingBalance: 1400.00,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    tags: ["Logistics", "Pending Due"],
  },
  {
    id: "CUST-103",
    name: "Sophia Chen",
    email: "sophia.c@artisanbakery.com",
    phone: "+91 98765 67890",
    business: "Artisan Bakery & Cafe",
    status: "Active",
    totalSpent: 451200.00,
    ordersCount: 34,
    lastOrderDate: "2026-07-29",
    outstandingBalance: 0.00,
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    tags: ["Food & Bev", "Recurring"],
  },
  {
    id: "CUST-104",
    name: "David Miller",
    email: "david@milleriport.com",
    phone: "+91 98765 11223",
    business: "Miller Imports",
    status: "Inactive",
    totalSpent: 65000.00,
    ordersCount: 3,
    lastOrderDate: "2026-06-12",
    outstandingBalance: 13200.00,
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
    tags: ["Wholesale"],
  },
  {
    id: "CUST-105",
    name: "Aria Thorne",
    email: "aria@bloomflorist.co",
    phone: "+91 98765 99887",
    business: "Bloom Boutique Florals",
    status: "VIP",
    totalSpent: 564200.00,
    ordersCount: 29,
    lastOrderDate: "2026-07-27",
    outstandingBalance: 0.00,
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80",
    tags: ["Florist", "Local VIP"],
  },
];

const INITIAL_PRODUCTS = [
  { id: "PROD-01", name: "Artisanal Espresso Blend", category: "Beverages", price: 499.00, sku: "ESP-001", inStock: 45, image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=300&auto=format&fit=crop&q=80" },
  { id: "PROD-02", name: "Organic Honey Jar (500g)", category: "Grocery", price: 350.00, sku: "HNY-500", inStock: 28, image: "https://images.unsplash.com/photo-1587049352847-4a222e784d38?w=300&auto=format&fit=crop&q=80" },
  { id: "PROD-03", name: "Butter Croissant Box (6pcs)", category: "Bakery", price: 299.00, sku: "CRS-006", inStock: 12, image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=300&auto=format&fit=crop&q=80" },
  { id: "PROD-04", name: "Handcrafted Ceramic Mug", category: "Merchandise", price: 599.00, sku: "MUG-002", inStock: 60, image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=300&auto=format&fit=crop&q=80" },
  { id: "PROD-05", name: "Nitro Cold Brew Can (4-pack)", category: "Beverages", price: 399.00, sku: "CLD-004", inStock: 34, image: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=300&auto=format&fit=crop&q=80" },
  { id: "PROD-06", name: "Matcha Green Tea Powder (100g)", category: "Grocery", price: 650.00, sku: "MTC-100", inStock: 19, image: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=300&auto=format&fit=crop&q=80" },
  { id: "PROD-07", name: "Gourmet Avocado Toast Kit", category: "Bakery", price: 249.00, sku: "AVO-001", inStock: 15, image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=300&auto=format&fit=crop&q=80" },
  { id: "PROD-08", name: "French Press Coffee Maker", category: "Merchandise", price: 1299.00, sku: "FPR-001", inStock: 22, image: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=300&auto=format&fit=crop&q=80" },
];

const INITIAL_TASKS = [
  { id: "TSK-01", title: "Restock Organic Honey & Coffee Beans", category: "Inventory", status: "todo", priority: "High", dueDate: "2026-07-30", assignee: "Marcus H." },
  { id: "TSK-02", title: "Send monthly GST invoice to Apex Design", category: "Billing", status: "in_progress", priority: "High", dueDate: "2026-07-29", assignee: "Eleanor V." },
  { id: "TSK-03", title: "Update POS seasonal discount codes", category: "Marketing", status: "review", priority: "Medium", dueDate: "2026-08-01", assignee: "Sophia C." },
  { id: "TSK-04", title: "Review Q3 financial performance report", category: "Finance", status: "completed", priority: "Low", dueDate: "2026-07-27", assignee: "Self" },
  { id: "TSK-05", title: "Verify GST tax compliance documentation", category: "Legal", status: "todo", priority: "Medium", dueDate: "2026-08-05", assignee: "David M." },
];

const INITIAL_AI_CHATS = [
  { sender: "ai", text: "Namaste Alex! I am your **BizFlow AI Business Assistant**. How can I help optimize your sales, inventory, or billing performance today?", time: "09:00 AM" },
];

const StoreContextProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("bizflow_theme") || "dark";
  });

  useEffect(() => {
    localStorage.setItem("bizflow_theme", theme);
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
      document.body.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
      document.body.classList.remove("dark");
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const setThemeMode = (mode) => {
    if (mode === "dark" || mode === "light") {
      setTheme(mode);
    }
  };

  const [user, setUser] = useState({
    name: "Alex Morgan",
    email: "alex.morgan@bizflow.io",
    role: "Owner & CEO",
    businessName: "BizFlow Merchant Hub",
    currency: "₹",
    timezone: "IST (UTC+5:30)",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    isLoggedIn: true,
  });

  const [customers, setCustomers] = useState(INITIAL_CUSTOMERS);
  const [products] = useState(INITIAL_PRODUCTS);
  const [tasks, setTasks] = useState(INITIAL_TASKS);
  const [aiChats, setAiChats] = useState(INITIAL_AI_CHATS);

  // POS Cart State
  const [cart, setCart] = useState([
    { ...INITIAL_PRODUCTS[0], quantity: 2 },
    { ...INITIAL_PRODUCTS[2], quantity: 1 },
  ]);
  const [selectedCustomer, setSelectedCustomer] = useState(INITIAL_CUSTOMERS[0]);
  const [discountPercent, setDiscountPercent] = useState(5);
  const [taxPercent, setTaxPercent] = useState(18);

  // Notifications
  const [notifications, setNotifications] = useState([
    { id: 1, title: "New Order #ORD-9842", desc: "₹1,297.00 completed via POS", time: "10 mins ago", unread: true },
    { id: 2, title: "Low Stock Alert", desc: "Butter Croissant Box (12 left)", time: "1 hour ago", unread: true },
    { id: 3, title: "Payment Received", desc: "Eleanor Vance paid ₹3,42,500", time: "3 hours ago", unread: false },
  ]);

  // Transactions History
  const [recentSales, setRecentSales] = useState([
    { id: "INV-2026-089", customer: "Sophia Chen", amount: 1245.00, status: "Paid", method: "Credit Card", date: "2026-07-29 14:22" },
    { id: "INV-2026-088", customer: "Eleanor Vance", amount: 4800.00, status: "Paid", method: "Bank Transfer", date: "2026-07-29 11:05" },
    { id: "INV-2026-087", customer: "Marcus Holloway", amount: 1400.00, status: "Pending", method: "UPI / QR", date: "2026-07-28 17:40" },
    { id: "INV-2026-086", customer: "Aria Thorne", amount: 3102.00, status: "Paid", method: "Cash", date: "2026-07-28 09:15" },
    { id: "INV-2026-085", customer: "Walk-in Customer", amount: 420.00, status: "Paid", method: "Card", date: "2026-07-27 16:30" },
  ]);

  // Cart Handlers
  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const updateCartQty = (productId, qty) => {
    if (qty <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.id === productId ? { ...item, quantity: qty } : item))
    );
  };

  const removeFromCart = (productId) => {
    setCart((prev) => prev.filter((item) => item.id !== productId));
  };

  const clearCart = () => {
    setCart([]);
  };

  const completeCheckout = (paymentMethod = "UPI / QR") => {
    const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const discountAmount = (subtotal * discountPercent) / 100;
    const taxAmount = ((subtotal - discountAmount) * taxPercent) / 100;
    const finalTotal = subtotal - discountAmount + taxAmount;

    const newSale = {
      id: `INV-2026-${Math.floor(100 + Math.random() * 900)}`,
      customer: selectedCustomer ? selectedCustomer.name : "Walk-in Customer",
      amount: parseFloat(finalTotal.toFixed(2)),
      status: "Paid",
      method: paymentMethod,
      date: new Date().toISOString().replace('T', ' ').substring(0, 16),
    };

    setRecentSales([newSale, ...recentSales]);
    clearCart();
    return newSale;
  };

  // Task Handlers
  const addTask = (newTask) => {
    const taskObj = {
      id: `TSK-0${tasks.length + 1}`,
      title: newTask.title,
      category: newTask.category || "General",
      status: newTask.status || "todo",
      priority: newTask.priority || "Medium",
      dueDate: newTask.dueDate || "2026-08-01",
      assignee: newTask.assignee || "Self",
    };
    setTasks([taskObj, ...tasks]);
  };

  const updateTaskStatus = (taskId, newStatus) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, status: newStatus } : t))
    );
  };

  const deleteTask = (taskId) => {
    setTasks((prev) => prev.filter((t) => t.id !== taskId));
  };

  // Customer Handlers
  const addCustomer = (customerData) => {
    const newCust = {
      id: `CUST-${100 + customers.length + 1}`,
      name: customerData.name,
      email: customerData.email,
      phone: customerData.phone || "+91 98765 00000",
      business: customerData.business || "Independent Retailer",
      status: "Active",
      totalSpent: 0,
      ordersCount: 0,
      lastOrderDate: "Just now",
      outstandingBalance: 0,
      avatar: `https://images.unsplash.com/photo-${1534528741775 + customers.length}?w=150&auto=format&fit=crop&q=80`,
      tags: customerData.tags ? customerData.tags.split(',') : ["New Customer"],
    };
    setCustomers([newCust, ...customers]);
  };

  // AI Chat Handlers
  const sendAiMessage = (userPrompt) => {
    const userMsg = { sender: "user", text: userPrompt, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
    setAiChats((prev) => [...prev, userMsg]);

    setTimeout(() => {
      let reply = "I analyzed your store telemetry. Your sales velocity is up **+18.4%** this week, with Coffee Beans leading profit margins.";
      const lower = userPrompt.toLowerCase();
      if (lower.includes("revenue") || lower.includes("sales") || lower.includes("financial")) {
        reply = "Your month-to-date gross revenue is **₹4,28,500.00**, representing an **+18.4% increase** over June 2026. Top grossing customer is Aria Thorne (₹5,64,200 spent).";
      } else if (lower.includes("customer") || lower.includes("crm") || lower.includes("due")) {
        reply = "You have **528 active business accounts**, with an average order value of ₹7,650. 2 accounts currently have pending dues (₹14,600.00 total).";
      } else if (lower.includes("inventory") || lower.includes("stock") || lower.includes("reorder")) {
        reply = "Attention: **Butter Croissant Box** and **Matcha Powder** are reaching safety threshold. Reordering 25 units will ensure 100% stock readiness.";
      }

      const aiMsg = { sender: "ai", text: reply, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
      setAiChats((prev) => [...prev, aiMsg]);
    }, 600);
  };

  const markAllNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
  };

  const contextValue = {
    theme,
    toggleTheme,
    setThemeMode,
    user,
    setUser,
    customers,
    addCustomer,
    products,
    tasks,
    addTask,
    updateTaskStatus,
    deleteTask,
    aiChats,
    sendAiMessage,
    cart,
    addToCart,
    updateCartQty,
    removeFromCart,
    clearCart,
    selectedCustomer,
    setSelectedCustomer,
    discountPercent,
    setDiscountPercent,
    taxPercent,
    setTaxPercent,
    completeCheckout,
    recentSales,
    notifications,
    markAllNotificationsRead,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;