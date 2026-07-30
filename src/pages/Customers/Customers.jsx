import { useState, useContext } from "react";
import {
  HiOutlineUserPlus,
  HiOutlineMagnifyingGlass,
  HiOutlineBuildingOffice,
  HiOutlineChevronRight,
  HiOutlineXMark,
} from "react-icons/hi2";
import { toast } from "react-toastify";
import { StoreContext } from "../../Context/StoreContext";
import Button from "../../components/Button/Button";

export default function Customers() {
  const { customers, addCustomer } = useContext(StoreContext);
  const [filterTab, setFilterTab] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCust, setSelectedCust] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const [newCust, setNewCust] = useState({
    name: "",
    email: "",
    phone: "",
    business: "",
    tags: "",
  });

  const filteredCustomers = customers.filter((c) => {
    const matchesSearch =
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.business.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;

    if (filterTab === "VIP") return c.status === "VIP";
    if (filterTab === "Active") return c.status === "Active" || c.status === "VIP";
    if (filterTab === "Outstanding") return c.outstandingBalance > 0;
    if (filterTab === "Inactive") return c.status === "Inactive";
    return true;
  });

  const handleAddSubmit = (e) => {
    e.preventDefault();
    if (!newCust.name || !newCust.email) {
      toast.error("Please enter Customer Name and Email.");
      return;
    }
    addCustomer(newCust);
    toast.success(`Customer ${newCust.name} added successfully!`);
    setNewCust({ name: "", email: "", phone: "", business: "", tags: "" });
    setModalOpen(false);
  };

  return (
    <div className="space-y-6 pb-12 font-sans">
      {/* Page Title & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Customer CRM & Accounts
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Manage business relationships, outstanding dues (₹ INR), order histories, and contact info.
          </p>
        </div>

        <Button
          variant="primary"
          size="md"
          icon={HiOutlineUserPlus}
          onClick={() => setModalOpen(true)}
        >
          Add New Customer
        </Button>
      </div>

      {/* Filter Tabs & Search Bar */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4 transition-colors">
        {/* Tabs */}
        <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl w-full md:w-auto overflow-x-auto">
          {["All", "Active", "VIP", "Outstanding", "Inactive"].map((tab) => (
            <button
              key={tab}
              onClick={() => setFilterTab(tab)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all shrink-0 cursor-pointer ${
                filterTab === tab
                  ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-2xs"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              {tab} {tab === "Outstanding" && "⚠️"}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative w-full md:w-72">
          <HiOutlineMagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm" />
          <input
            type="text"
            placeholder="Search by name, email or business..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:border-blue-600 transition-all"
          />
        </div>
      </div>

      {/* Customers SaaS Table / Cards */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs overflow-hidden transition-colors">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-slate-50/80 dark:bg-slate-800/40 border-b border-slate-200/80 dark:border-slate-800 text-slate-500 dark:text-slate-400 font-semibold uppercase text-[10px] tracking-wider">
                <th className="py-3.5 px-4">Customer</th>
                <th className="py-3.5 px-4">Business / Company</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Lifetime Spend</th>
                <th className="py-3.5 px-4 text-right">Outstanding Dues</th>
                <th className="py-3.5 px-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-medium">
              {filteredCustomers.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-400 dark:text-slate-500">
                    No customers match your criteria.
                  </td>
                </tr>
              ) : (
                filteredCustomers.map((cust) => (
                  <tr
                    key={cust.id}
                    className="hover:bg-slate-50/80 dark:hover:bg-slate-800/50 transition-colors group cursor-pointer"
                    onClick={() => setSelectedCust(cust)}
                  >
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={cust.avatar}
                          alt={cust.name}
                          className="h-9 w-9 rounded-full object-cover ring-2 ring-slate-200/60 dark:ring-slate-700"
                        />
                        <div>
                          <p className="font-bold text-slate-900 dark:text-white">{cust.name}</p>
                          <p className="text-[11px] text-slate-500 dark:text-slate-400">{cust.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300">
                        <HiOutlineBuildingOffice className="text-slate-400 text-sm" />
                        <span>{cust.business}</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                          cust.status === "VIP"
                            ? "bg-purple-50 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800"
                            : cust.status === "Active"
                            ? "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800"
                            : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700"
                        }`}
                      >
                        {cust.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right font-bold text-slate-900 dark:text-white">
                      ₹{cust.totalSpent.toFixed(2)}
                      <span className="block text-[10px] font-normal text-slate-400 dark:text-slate-500">
                        {cust.ordersCount} orders
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      {cust.outstandingBalance > 0 ? (
                        <span className="inline-flex items-center px-2 py-0.5 rounded bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 font-bold text-[11px] border border-amber-200 dark:border-amber-800">
                          ₹{cust.outstandingBalance.toFixed(2)} Due
                        </span>
                      ) : (
                        <span className="text-slate-400 dark:text-slate-500 text-[11px]">Clear (₹0.00)</span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedCust(cust);
                        }}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                      >
                        <HiOutlineChevronRight className="text-base" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Customer Profile Detail Drawer */}
      {selectedCust && (
        <div className="fixed inset-0 z-50 flex items-center justify-end bg-slate-900/40 backdrop-blur-xs">
          <div className="w-full max-w-md h-full bg-white dark:bg-slate-900 shadow-2xl p-6 flex flex-col justify-between overflow-y-auto animate-fade-in border-l border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Customer Profile
                </span>
                <button
                  onClick={() => setSelectedCust(null)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  <HiOutlineXMark className="text-xl" />
                </button>
              </div>

              <div className="pt-6 text-center">
                <img
                  src={selectedCust.avatar}
                  alt={selectedCust.name}
                  className="h-20 w-20 rounded-full mx-auto object-cover ring-4 ring-blue-500/20 shadow-sm"
                />
                <h3 className="text-xl font-bold mt-3">{selectedCust.name}</h3>
                <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mt-0.5">{selectedCust.business}</p>
                <span className="inline-block mt-2 px-3 py-0.5 rounded-full text-xs font-bold bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800">
                  {selectedCust.status} Customer
                </span>
              </div>

              <div className="mt-8 space-y-4 text-xs">
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500 dark:text-slate-400">Contact Email:</span>
                    <span className="font-semibold">{selectedCust.email}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500 dark:text-slate-400">Phone Number:</span>
                    <span className="font-semibold">{selectedCust.phone}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500 dark:text-slate-400">Last Active:</span>
                    <span className="font-semibold">{selectedCust.lastOrderDate}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 text-center">
                  <div className="p-4 rounded-xl bg-blue-50/50 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900">
                    <span className="text-[11px] text-blue-600 dark:text-blue-400 font-semibold uppercase">Total Spend</span>
                    <p className="text-lg font-bold mt-1">₹{selectedCust.totalSpent.toFixed(2)}</p>
                  </div>
                  <div className="p-4 rounded-xl bg-amber-50/50 dark:bg-amber-950/30 border border-amber-100 dark:border-amber-900">
                    <span className="text-[11px] text-amber-700 dark:text-amber-400 font-semibold uppercase">Pending Due</span>
                    <p className="text-lg font-bold mt-1">₹{selectedCust.outstandingBalance.toFixed(2)}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-slate-100 dark:border-slate-800 flex gap-2">
              <Button
                variant="outline"
                size="md"
                className="flex-1 dark:bg-slate-800 dark:text-slate-200 dark:border-slate-700"
                onClick={() => setSelectedCust(null)}
              >
                Close
              </Button>
              <Button
                variant="primary"
                size="md"
                className="flex-1"
                onClick={() => {
                  toast.info(`Statement email sent to ${selectedCust.email}`);
                  setSelectedCust(null);
                }}
              >
                Send Statement
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Add Customer Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-4">
          <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-2xl shadow-2xl p-6 animate-fade-in border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
              <h3 className="text-base font-bold">Add New CRM Customer</h3>
              <button onClick={() => setModalOpen(false)} className="text-slate-400 hover:text-slate-700">
                <HiOutlineXMark className="text-xl" />
              </button>
            </div>

            <form onSubmit={handleAddSubmit} className="mt-4 space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Customer Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ramesh Kumar"
                  value={newCust.name}
                  onChange={(e) => setNewCust({ ...newCust, name: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-none focus:border-blue-600"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Email Address *</label>
                <input
                  type="email"
                  required
                  placeholder="ramesh@example.com"
                  value={newCust.email}
                  onChange={(e) => setNewCust({ ...newCust, email: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-none focus:border-blue-600"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Business Name</label>
                <input
                  type="text"
                  placeholder="Kumar Traders"
                  value={newCust.business}
                  onChange={(e) => setNewCust({ ...newCust, business: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-none focus:border-blue-600"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Phone Number</label>
                <input
                  type="text"
                  placeholder="+91 98765 00000"
                  value={newCust.phone}
                  onChange={(e) => setNewCust({ ...newCust, phone: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-none focus:border-blue-600"
                />
              </div>

              <div className="pt-4 flex gap-2">
                <Button variant="outline" size="md" className="flex-1 dark:bg-slate-800 dark:text-slate-200 dark:border-slate-700" onClick={() => setModalOpen(false)}>
                  Cancel
                </Button>
                <Button variant="primary" size="md" type="submit" className="flex-1">
                  Save Customer
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
