"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { IconEntry, IconSales, IconBread } from "@/components/stat-icons";

export default function SalesPage() {
  const [sales, setSales] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [formData, setFormData] = useState({ productId: "", quantity: "", date: new Date().toISOString().split("T")[0] });
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => { fetchProducts(); fetchSales(); }, []);

  const fetchProducts = async () => { const res = await fetch("/api/products"); setProducts(await res.json()); };
  const fetchSales = async () => {
    setLoading(true);
    const res = await fetch("/api/sales");
    const data = await res.json();
    setSales(Array.isArray(data) ? data : []);
    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    const res = await fetch("/api/sales", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(formData) });
    if (res.ok) { setFormData({ productId: "", quantity: "", date: new Date().toISOString().split("T")[0] }); fetchSales(); }
    setSubmitting(false);
  };

  const totalToday = sales.filter(s => s.date?.slice(0, 10) === new Date().toISOString().slice(0, 10)).reduce((sum, s) => sum + s.quantity, 0);

  const statCards = [
    { label: "Total Entries", value: sales.length, icon: <IconEntry size={18} /> },
    { label: "Sold Today", value: totalToday, icon: <IconSales size={18} /> },
    { label: "Products", value: products.length, icon: <IconBread size={18} /> },
  ];

  return (
    <div className="min-h-full bg-[#f7f7f8]">
      <div className="flex items-center justify-between px-8 py-4 bg-white border-b border-gray-100">
        <div>
          <h1 className="text-xl font-semibold text-gray-900">Sales</h1>
          <p className="text-sm text-gray-400 mt-0.5">Record and track daily sales</p>
        </div>
        <div className="text-sm text-gray-400">{new Date().toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}</div>
      </div>
      <div className="px-8 py-6 space-y-6">
        <div className="grid grid-cols-3 gap-4">
          {statCards.map(({ label, value, icon }) => (
            <div key={label} className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
              <div className="flex items-center justify-between mb-3 text-gray-400">{<span className="text-xs uppercase tracking-wide">{label}</span>}{icon}</div>
              <div className="text-2xl font-bold text-gray-900">{value}</div>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-3 gap-6">
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
            <h2 className="text-sm font-semibold text-gray-700 mb-4">Add New Sale</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div><Label className="text-xs text-gray-500 mb-1 block">Product</Label>
                <select value={formData.productId} onChange={(e) => setFormData({ ...formData, productId: e.target.value })}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900" required>
                  <option value="">— Select product —</option>
                  {products.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
                </select>
              </div>
              <div><Label className="text-xs text-gray-500 mb-1 block">Quantity</Label>
                <Input type="number" placeholder="e.g. 120" value={formData.quantity} onChange={(e) => setFormData({ ...formData, quantity: e.target.value })} className="text-sm" required />
              </div>
              <div><Label className="text-xs text-gray-500 mb-1 block">Date</Label>
                <Input type="date" value={formData.date} onChange={(e) => setFormData({ ...formData, date: e.target.value })} className="text-sm" />
              </div>
              <Button type="submit" className="w-full bg-[#0f1117] hover:bg-[#1e2130] text-white text-sm" disabled={submitting}>
                {submitting ? "Saving..." : "Save Sale"}
              </Button>
            </form>
          </div>
          <div className="col-span-2 bg-white rounded-xl border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
              <h2 className="text-sm font-semibold text-gray-700">Recent Sales</h2>
              <span className="text-xs text-gray-400">{sales.length} entries</span>
            </div>
            {loading ? <div className="py-16 text-center text-sm text-gray-400">Loading...</div> : (
              <Table>
                <TableHeader><TableRow><TableHead className="text-xs">Date</TableHead><TableHead className="text-xs">Product</TableHead><TableHead className="text-xs text-right">Quantity</TableHead></TableRow></TableHeader>
                <TableBody>
                  {sales.map((sale: any) => (
                    <TableRow key={sale.id}>
                      <TableCell className="text-sm text-gray-500">{new Date(sale.date).toLocaleDateString("en-GB")}</TableCell>
                      <TableCell className="text-sm font-medium text-gray-900">{sale.product?.name}</TableCell>
                      <TableCell className="text-sm text-right font-mono text-gray-700">{sale.quantity}</TableCell>
                    </TableRow>
                  ))}
                  {sales.length === 0 && <TableRow><TableCell colSpan={3} className="text-center py-12 text-sm text-gray-400">No sales recorded yet</TableCell></TableRow>}
                </TableBody>
              </Table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}