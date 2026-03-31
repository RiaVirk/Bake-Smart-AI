"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function ProductionPage() {
  const [entries, setEntries] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [formData, setFormData] = useState({
    productId: "",
    quantity: "",
    date: new Date().toISOString().split("T")[0],
  });
  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchProducts();
    fetchEntries();
  }, []);

  const fetchProducts = async () => {
    const res = await fetch("/api/products");
    const data = await res.json();
    setProducts(data);
  };

  const fetchEntries = async () => {
    setLoading(true);
    const res = await fetch("/api/production");
    const data = await res.json();
    setEntries(Array.isArray(data) ? data : []);
    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch("/api/production", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setFormData({ productId: "", quantity: "", date: new Date().toISOString().split("T")[0] });
        fetchEntries();
      }
    } catch (err) {}
    setSubmitting(false);
  };

  const totalToday = entries
    .filter(e => e.date?.slice(0, 10) === new Date().toISOString().slice(0, 10))
    .reduce((sum, e) => sum + e.quantity, 0);

  return (
    <div className="min-h-full bg-[#f7f7f8]">
      <div className="flex items-center justify-between px-8 py-4 bg-white border-b border-gray-100">
        <div>
          <h1 className="text-xl font-semibold text-gray-900">Production</h1>
          <p className="text-sm text-gray-400 mt-0.5">Log daily baked quantities</p>
        </div>
        <div className="text-sm text-gray-400">{new Date().toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}</div>
      </div>

      <div className="px-8 py-6 space-y-6">
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: "Total Batches", value: entries.length, icon: "🏭" },
            { label: "Produced Today", value: totalToday, icon: "🍞" },
            { label: "Products", value: products.length, icon: "📋" },
          ].map(({ label, value, icon }) => (
            <div key={label} className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-gray-400 uppercase tracking-wide">{label}</span>
                <span>{icon}</span>
              </div>
              <div className="text-2xl font-bold text-gray-900">{value}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-6">
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
            <h2 className="text-sm font-semibold text-gray-700 mb-4">Log Production</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label className="text-xs text-gray-500 mb-1 block">Product</Label>
                <select
                  value={formData.productId}
                  onChange={(e) => setFormData({ ...formData, productId: e.target.value })}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900"
                  required
                >
                  <option value="">— Select product —</option>
                  {products.map((p) => (
                    <option key={p.id} value={p.id}>{p.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <Label className="text-xs text-gray-500 mb-1 block">Quantity Baked</Label>
                <Input type="number" placeholder="e.g. 200" value={formData.quantity}
                  onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                  className="text-sm" required />
              </div>
              <div>
                <Label className="text-xs text-gray-500 mb-1 block">Date</Label>
                <Input type="date" value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="text-sm" />
              </div>
              <Button type="submit" className="w-full bg-[#0f1117] hover:bg-[#1e2130] text-white text-sm" disabled={submitting}>
                {submitting ? "Saving..." : "Log Production"}
              </Button>
            </form>
          </div>

          <div className="col-span-2 bg-white rounded-xl border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
              <h2 className="text-sm font-semibold text-gray-700">Production Log</h2>
              <span className="text-xs text-gray-400">{entries.length} entries</span>
            </div>
            {loading ? (
              <div className="py-16 text-center text-sm text-gray-400">Loading...</div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-xs">Date</TableHead>
                    <TableHead className="text-xs">Product</TableHead>
                    <TableHead className="text-xs text-right">Quantity</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {entries.map((entry: any) => (
                    <TableRow key={entry.id}>
                      <TableCell className="text-sm text-gray-500">{new Date(entry.date).toLocaleDateString("en-GB")}</TableCell>
                      <TableCell className="text-sm font-medium text-gray-900">{entry.product?.name}</TableCell>
                      <TableCell className="text-sm text-right font-mono text-gray-700">{entry.quantity}</TableCell>
                    </TableRow>
                  ))}
                  {entries.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={3} className="text-center py-12 text-sm text-gray-400">No production logged yet</TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}