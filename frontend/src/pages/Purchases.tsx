import React, { useState } from 'react';
import { Card, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Modal } from '../components/ui/Modal';
import { useAuth } from '../context/AuthContext';
import { Package, Plus } from 'lucide-react';

// Mock data for demo purposes
const MOCK_PURCHASES = [
  { id: 1, asset: 'M1 Abrams Tank', category: 'Vehicle', base: 'GER', qty: 12, status: 'Available', desc: 'Main battle tank' },
  { id: 2, asset: 'Bradley IFV', category: 'Vehicle', base: 'POS', qty: 15, status: 'Available', desc: 'Infantry fighting vehicle' },
  { id: 3, asset: 'Black Hawk Helicopter', category: 'Vehicle', base: 'POS', qty: 6, status: 'Available', desc: 'Utility helicopter' },
  { id: 4, asset: 'Humvee', category: 'Vehicle', base: 'GER', qty: 30, status: 'Available', desc: 'Multi-purpose vehicle' },
  { id: 5, asset: 'M240B', category: 'Weapon', base: 'POS', qty: 45, status: 'Available', desc: 'Medium machine gun' },
];

export const Purchases = () => {
  const { user } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [purchases, setPurchases] = useState(MOCK_PURCHASES);

  // Form State
  const [assetName, setAssetName] = useState('');
  const [category, setCategory] = useState('Vehicle');
  const [base, setBase] = useState('GER');
  const [qty, setQty] = useState('');
  const [desc, setDesc] = useState('');

  const handleRecordPurchase = (e: React.FormEvent) => {
    e.preventDefault();
    const newPurchase = {
      id: purchases.length + 1,
      asset: assetName,
      category,
      base,
      qty: parseInt(qty) || 1,
      status: 'Available',
      desc: desc || 'N/A'
    };
    setPurchases([newPurchase, ...purchases]);
    setIsModalOpen(false);
    setAssetName('');
    setQty('');
    setDesc('');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-foreground">Assets & Purchases</h2>
          <p className="text-muted-foreground mt-1 font-medium">Manage inventory and record new purchases.</p>
        </div>
        <Button onClick={() => setIsModalOpen(true)} className="flex items-center space-x-2">
          <Plus className="w-4 h-4" />
          <span>New Purchase</span>
        </Button>
      </div>
      
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-muted-foreground uppercase bg-muted/50 border-b border-border">
                <tr>
                  <th className="px-6 py-4 font-medium">Asset</th>
                  <th className="px-6 py-4 font-medium">Category</th>
                  <th className="px-6 py-4 font-medium">Base</th>
                  <th className="px-6 py-4 font-medium">Quantity</th>
                  <th className="px-6 py-4 font-medium">Status</th>
                  <th className="px-6 py-4 font-medium">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {purchases.map((p) => (
                  <tr key={p.id} className="hover:bg-muted/30 transition-colors">
                    <td className="px-6 py-4 font-medium text-foreground flex items-center space-x-3">
                      <Package className="w-4 h-4 text-primary" />
                      <span>{p.asset}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 text-xs font-semibold rounded-md ${
                        p.category === 'Vehicle' ? 'bg-primary/20 text-primary' : 
                        p.category === 'Weapon' ? 'bg-destructive/20 text-destructive' :
                        'bg-amber-500/20 text-amber-500'
                      }`}>
                        {p.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-muted-foreground">{p.base}</td>
                    <td className="px-6 py-4 text-foreground font-semibold">{p.qty.toLocaleString()}</td>
                    <td className="px-6 py-4">
                      <span className="px-2.5 py-1 rounded-full text-xs font-medium border bg-primary/10 text-primary border-primary/20">
                        {p.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-muted-foreground">{p.desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Record New Purchase">
        <form onSubmit={handleRecordPurchase} className="space-y-4">
          
          <div className="grid grid-cols-2 gap-4">
            <Input 
              label="Asset Name" 
              placeholder="e.g. M1 Abrams" 
              value={assetName}
              onChange={(e) => setAssetName(e.target.value)}
              required 
            />
            
            <div>
              <label className="mb-2 block text-sm font-medium text-foreground">Category</label>
              <select 
                className="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring transition-all duration-200"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
              >
                <option value="Vehicle" className="bg-background">Vehicle</option>
                <option value="Weapon" className="bg-background">Weapon</option>
                <option value="Ammunition" className="bg-background">Ammunition</option>
              </select>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-2 block text-sm font-medium text-foreground">Base</label>
              <select 
                className="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring transition-all duration-200"
                value={base}
                onChange={(e) => setBase(e.target.value)}
                required
                disabled={user?.role !== 'ADMIN'}
              >
                <option value="GER" className="bg-background">GER</option>
                <option value="POS" className="bg-background">POS</option>
                <option value="FRA" className="bg-background">FRA</option>
              </select>
            </div>
            
            <Input 
              label="Quantity" 
              type="number" 
              min="1" 
              value={qty}
              onChange={(e) => setQty(e.target.value)}
              required 
            />
          </div>
          
          <Input 
            label="Description" 
            placeholder="Optional" 
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
          
          <Button type="submit" className="w-full mt-6">Record Purchase</Button>
        </form>
      </Modal>
    </div>
  );
};
