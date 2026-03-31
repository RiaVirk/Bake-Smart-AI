"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function SalesPage() {
  const [sales, setSales] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [formData, setFormData] = useState({
    productId: "",
    quantity: "",
    date: new Date().toISOString().split("T")[0],
  });
  const [loading, setLoading] = useState(false);

  // Load products and existing sales
  useEffect(() => {
    fetchProducts();
    fetchSales();
  }, []);

  const fetchProducts = async () => {
    const res = await fetch("/api/products");
    const data = await res.json();
    setProducts(data);
  };

  const fetchSales = async () => {
    setLoading(true);
    const res = await fetch("/api/sales");
    const data = await res.json();
    setSales(data);
    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.productId || !formData.quantity) return;

    setLoading(true);
    try {
      const res = await fetch("/api/sales", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        alert("✅ Verkauf gespeichert!");
        setFormData({
          productId: "",
          quantity: "",
          date: new Date().toISOString().split("T")[0],
        });
        fetchSales(); // refresh table
      } else {
        const error = await res.json();
        alert(error.error || "Fehler beim Speichern");
      }
    } catch (err) {
      alert("Fehler – bitte nochmal versuchen");
    }
    setLoading(false);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <h1 className="text-3xl font-bold">📊 Verkauf erfassen</h1>

      {/* Form */}
      <Card>
        <CardHeader>
          <CardTitle>Neuen Verkauf eintragen</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label>Produkt</Label>
              <select
                value={formData.productId}
                onChange={(e) => setFormData({ ...formData, productId: e.target.value })}
                className="w-full border border-gray-300 rounded-lg p-3"
                required
              >
                <option value="">— Produkt wählen —</option>
                {products.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <Label>Menge</Label>
              <Input
                type="number"
                placeholder="z. B. 120"
                value={formData.quantity}
                onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                required
              />
            </div>

            <div>
              <Label>Datum</Label>
              <Input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              />
            </div>

            <div className="md:col-span-3">
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Speichern..." : "Verkauf speichern"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* History Table */}
      <Card>
        <CardHeader>
          <CardTitle>Letzte Verkäufe</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <p className="text-center py-8">Lade Verkäufe...</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Datum</TableHead>
                  <TableHead>Produkt</TableHead>
                  <TableHead className="text-right">Menge</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sales.map((sale: any) => (
                  <TableRow key={sale.id}>
                    <TableCell>{new Date(sale.date).toLocaleDateString("de-DE")}</TableCell>
                    <TableCell className="font-medium">{sale.product?.name}</TableCell>
                    <TableCell className="text-right font-mono">{sale.quantity}</TableCell>
                  </TableRow>
                ))}
                {sales.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={3} className="text-center py-8 text-gray-400">
                      Noch keine Verkäufe eingetragen
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}