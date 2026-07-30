import { useState, useContext } from "react";
import {
  HiOutlineShoppingCart,
  HiOutlineMagnifyingGlass,
  HiOutlinePlus,
  HiOutlineMinus,
  HiOutlineTrash,
  HiOutlineUser,
  HiOutlinePrinter,
  HiOutlineCheck,
  HiOutlineCreditCard,
  HiOutlineBanknotes,
  HiOutlineQrCode,
  HiOutlineXMark,
} from "react-icons/hi2";
import { toast } from "react-toastify";
import { StoreContext } from "../../Context/StoreContext";
import Button from "../../components/Button/Button";

export default function Sales() {
  const {
    products,
    cart,
    addToCart,
    updateCartQty,
    removeFromCart,
    clearCart,
    customers,
    selectedCustomer,
    setSelectedCustomer,
    discountPercent,
    setDiscountPercent,
    taxPercent,
    setTaxPercent,
    completeCheckout,
  } = useContext(StoreContext);

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  const [receiptModalOpen, setReceiptModalOpen] = useState(false);
  const [lastCompletedSale, setLastCompletedSale] = useState(null);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("UPI / QR Code");

  const categories = ["All", "Beverages", "Grocery", "Bakery", "Merchandise"];

  const filteredProducts = products.filter((p) => {
    const matchesCat = selectedCategory === "All" || p.category === selectedCategory;
    const matchesQuery =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.sku.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesQuery;
  });

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discountAmount = (subtotal * discountPercent) / 100;
  const taxableAmount = subtotal - discountAmount;
  const taxAmount = (taxableAmount * taxPercent) / 100;
  const totalAmount = taxableAmount + taxAmount;

  const handlePayClick = () => {
    if (cart.length === 0) {
      toast.warn("Cart is empty! Add products to proceed.");
      return;
    }
    setPaymentModalOpen(true);
  };

  const confirmPayment = () => {
    const saleResult = completeCheckout(selectedPaymentMethod);
    setLastCompletedSale(saleResult);
    setPaymentModalOpen(false);
    setReceiptModalOpen(true);
    toast.success(`Payment of ₹${saleResult.amount.toFixed(2)} completed successfully!`);
  };

  return (
    <div className="space-y-6 pb-12 font-sans">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Smart POS & Digital Billing Terminal
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Fast checkout, inventory barcode lookup, GST tax rules, and digital receipts (₹ INR).
          </p>
        </div>

        {/* Customer Selector Bar */}
        <div className="flex items-center gap-2 bg-white dark:bg-slate-900 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-2xs">
          <HiOutlineUser className="text-slate-400 text-sm" />
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Billing to:</span>
          <select
            value={selectedCustomer?.id || ""}
            onChange={(e) => {
              const found = customers.find((c) => c.id === e.target.value);
              setSelectedCustomer(found || null);
            }}
            className="bg-transparent text-xs font-bold text-blue-600 dark:text-blue-400 focus:outline-none cursor-pointer"
          >
            {customers.map((c) => (
              <option key={c.id} value={c.id} className="dark:bg-slate-900">
                {c.name} ({c.business})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Main Grid: Catalog (Left) + Cart Terminal (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Product Catalog */}
        <div className="lg:col-span-7 space-y-4">
          {/* Category Tabs & Search Bar */}
          <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-3">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl overflow-x-auto">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all shrink-0 cursor-pointer ${
                      selectedCategory === cat
                        ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-2xs"
                        : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="relative">
              <HiOutlineMagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm" />
              <input
                type="text"
                placeholder="Scan item barcode or search products... (e.g. Espresso, Coffee, SKU)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:border-blue-600 transition-all"
              />
            </div>
          </div>

          {/* Product Cards Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {filteredProducts.map((prod) => (
              <div
                key={prod.id}
                onClick={() => addToCart(prod)}
                className="bg-white dark:bg-slate-900 p-3.5 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-2xs hover:shadow-md hover:border-blue-300 dark:hover:border-blue-700 transition-all cursor-pointer flex flex-col justify-between group"
              >
                <div>
                  <div className="relative h-28 rounded-xl overflow-hidden mb-3 bg-slate-100 dark:bg-slate-800">
                    <img
                      src={prod.image}
                      alt={prod.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <span className="absolute top-2 right-2 px-2 py-0.5 text-[10px] font-bold bg-slate-900/80 text-white rounded-md backdrop-blur-xs">
                      Stock: {prod.inStock}
                    </span>
                  </div>

                  <span className="text-[10px] font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
                    {prod.category}
                  </span>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white line-clamp-1 mt-0.5">
                    {prod.name}
                  </h4>
                  <p className="text-[10px] text-slate-400 dark:text-slate-500">SKU: {prod.sku}</p>
                </div>

                <div className="mt-3 flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800">
                  <span className="text-sm font-extrabold text-slate-900 dark:text-white">
                    ₹{prod.price.toFixed(2)}
                  </span>
                  <button className="h-7 w-7 rounded-lg bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 group-hover:bg-blue-600 group-hover:text-white flex items-center justify-center transition-colors">
                    <HiOutlinePlus className="text-sm" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Cart & Billing Terminal */}
        <div className="lg:col-span-5 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs flex flex-col justify-between min-h-[580px] transition-colors">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400">
                  <HiOutlineShoppingCart className="text-lg" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">Checkout Cart</h3>
                  <p className="text-[11px] text-slate-400 dark:text-slate-500">{cart.length} unique items</p>
                </div>
              </div>

              {cart.length > 0 && (
                <button
                  onClick={clearCart}
                  className="text-xs font-semibold text-red-600 dark:text-red-400 hover:underline"
                >
                  Clear Cart
                </button>
              )}
            </div>

            {/* Cart Items List */}
            <div className="mt-4 space-y-3 max-h-72 overflow-y-auto pr-1">
              {cart.length === 0 ? (
                <div className="py-16 text-center text-slate-400 dark:text-slate-500">
                  <HiOutlineShoppingCart className="text-4xl mx-auto mb-2 opacity-40" />
                  <p className="text-xs font-medium">Cart is empty.</p>
                  <p className="text-[11px]">Click items from catalog to add to bill.</p>
                </div>
              ) : (
                cart.map((item) => (
                  <div
                    key={item.id}
                    className="p-3 rounded-xl bg-slate-50/80 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 flex items-center justify-between gap-3"
                  >
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold text-slate-900 dark:text-white truncate">{item.name}</p>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400">
                        ₹{item.price.toFixed(2)} × {item.quantity} ={" "}
                        <strong className="text-slate-900 dark:text-white">
                          ₹{(item.price * item.quantity).toFixed(2)}
                        </strong>
                      </p>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => updateCartQty(item.id, item.quantity - 1)}
                        className="h-6 w-6 rounded bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-200 flex items-center justify-center hover:bg-slate-100"
                      >
                        <HiOutlineMinus className="text-xs" />
                      </button>
                      <span className="text-xs font-bold w-5 text-center text-slate-900 dark:text-white">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateCartQty(item.id, item.quantity + 1)}
                        className="h-6 w-6 rounded bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-200 flex items-center justify-center hover:bg-slate-100"
                      >
                        <HiOutlinePlus className="text-xs" />
                      </button>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="h-6 w-6 rounded text-red-500 hover:bg-red-50 dark:hover:bg-red-950/40 flex items-center justify-center ml-1"
                      >
                        <HiOutlineTrash className="text-xs" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Cart Financial Summary & Checkout Button */}
          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-3 text-xs">
            <div className="flex items-center justify-between text-slate-500 dark:text-slate-400">
              <span>Subtotal:</span>
              <span className="font-semibold text-slate-900 dark:text-white">₹{subtotal.toFixed(2)}</span>
            </div>

            <div className="flex items-center justify-between text-slate-500 dark:text-slate-400">
              <div className="flex items-center gap-1">
                <span>Discount (%):</span>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={discountPercent}
                  onChange={(e) => setDiscountPercent(Number(e.target.value))}
                  className="w-12 px-1 py-0.5 bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded text-center text-xs text-slate-900 dark:text-white font-semibold"
                />
              </div>
              <span className="text-emerald-600 dark:text-emerald-400 font-semibold">-₹{discountAmount.toFixed(2)}</span>
            </div>

            <div className="flex items-center justify-between text-slate-500 dark:text-slate-400">
              <div className="flex items-center gap-1">
                <span>GST Tax (%):</span>
                <input
                  type="number"
                  min="0"
                  max="30"
                  value={taxPercent}
                  onChange={(e) => setTaxPercent(Number(e.target.value))}
                  className="w-12 px-1 py-0.5 bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded text-center text-xs text-slate-900 dark:text-white font-semibold"
                />
              </div>
              <span className="font-semibold text-slate-900 dark:text-white">+₹{taxAmount.toFixed(2)}</span>
            </div>

            <div className="pt-2 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-base font-extrabold text-slate-900 dark:text-white">
              <span>Total Payable:</span>
              <span className="text-blue-600 dark:text-blue-400 text-xl">₹{totalAmount.toFixed(2)}</span>
            </div>

            <Button
              variant="primary"
              size="lg"
              className="w-full mt-2 shadow-md py-3 text-base"
              onClick={handlePayClick}
            >
              Collect Payment (₹{totalAmount.toFixed(2)})
            </Button>
          </div>
        </div>
      </div>

      {/* Payment Selection Modal */}
      {paymentModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-4">
          <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-2xl shadow-2xl p-6 animate-fade-in border border-slate-200 dark:border-slate-800">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">Complete Checkout Payment</h3>
              <button onClick={() => setPaymentModalOpen(false)} className="text-slate-400 hover:text-slate-700">
                <HiOutlineXMark className="text-xl" />
              </button>
            </div>

            <div className="my-6 text-center">
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Amount Due</span>
              <p className="text-3xl font-extrabold text-blue-600 dark:text-blue-400 mt-1">₹{totalAmount.toFixed(2)}</p>
              <p className="text-xs text-slate-400 mt-1">Customer: {selectedCustomer?.name || "Walk-in Customer"}</p>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-2">Select Payment Method</label>
              {[
                { name: "UPI / QR Code", icon: HiOutlineQrCode },
                { name: "Credit Card", icon: HiOutlineCreditCard },
                { name: "Cash", icon: HiOutlineBanknotes },
              ].map((m) => {
                const Icon = m.icon;
                const selected = selectedPaymentMethod === m.name;
                return (
                  <button
                    key={m.name}
                    onClick={() => setSelectedPaymentMethod(m.name)}
                    className={`w-full p-3 rounded-xl border flex items-center justify-between transition-all cursor-pointer ${
                      selected
                        ? "border-blue-600 bg-blue-50/60 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 font-bold"
                        : "border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="text-xl" />
                      <span className="text-xs">{m.name}</span>
                    </div>
                    {selected && <HiOutlineCheck className="text-blue-600 text-lg" />}
                  </button>
                );
              })}
            </div>

            <div className="mt-6 flex gap-2">
              <Button variant="outline" size="md" className="flex-1 dark:bg-slate-800 dark:text-slate-200 dark:border-slate-700" onClick={() => setPaymentModalOpen(false)}>
                Cancel
              </Button>
              <Button variant="primary" size="md" className="flex-1 shadow-md" onClick={confirmPayment}>
                Confirm & Print
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Digital Thermal Receipt Modal */}
      {receiptModalOpen && lastCompletedSale && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-xs p-4">
          <div className="w-full max-w-sm bg-white dark:bg-slate-900 rounded-2xl shadow-2xl p-6 animate-fade-in border border-slate-200 dark:border-slate-800 font-mono text-xs text-slate-900 dark:text-white">
            <div className="text-center pb-4 border-b border-dashed border-slate-300 dark:border-slate-700">
              <h3 className="font-extrabold text-base">BIZFLOW MERCHANT STORE</h3>
              <p className="text-[10px] text-slate-500">Official GST Receipt</p>
              <p className="text-[10px] text-slate-400 mt-1">{lastCompletedSale.date}</p>
              <span className="inline-block mt-2 px-2 py-0.5 bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 text-[10px] font-bold rounded">
                PAID - {lastCompletedSale.method}
              </span>
            </div>

            <div className="py-4 border-b border-dashed border-slate-300 dark:border-slate-700 space-y-1">
              <div className="flex justify-between text-slate-600 dark:text-slate-400">
                <span>Invoice ID:</span>
                <span className="font-bold text-slate-900 dark:text-white">{lastCompletedSale.id}</span>
              </div>
              <div className="flex justify-between text-slate-600 dark:text-slate-400">
                <span>Billed To:</span>
                <span className="font-bold text-slate-900 dark:text-white">{lastCompletedSale.customer}</span>
              </div>
            </div>

            <div className="py-4 border-b border-dashed border-slate-300 dark:border-slate-700 space-y-2">
              <div className="flex justify-between font-bold text-slate-900 dark:text-white text-sm">
                <span>TOTAL AMOUNT PAID</span>
                <span>₹{lastCompletedSale.amount.toFixed(2)}</span>
              </div>
            </div>

            <div className="pt-4 text-center text-[10px] text-slate-400 space-y-3">
              <p>Thank you for shopping with us!</p>
              <div className="flex gap-2 font-sans">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 dark:bg-slate-800 dark:text-slate-200 dark:border-slate-700"
                  onClick={() => setReceiptModalOpen(false)}
                >
                  Close
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  className="flex-1"
                  icon={HiOutlinePrinter}
                  onClick={() => {
                    window.print();
                    setReceiptModalOpen(false);
                  }}
                >
                  Print Receipt
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
