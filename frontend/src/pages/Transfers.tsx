import React, { useState } from 'react';
import { Card, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Modal } from '../components/ui/Modal';
import { ArrowRightLeft, Plus } from 'lucide-react';

// Mock data for demo purposes
const MOCK_TRANSFERS = [
  { id: 1, asset: 'sdasdasdad', from: 'GER', to: 'POS', qty: 23423, status: 'Completed', date: '5/18/2026' },
  { id: 2, asset: 'Black Hawk Helicopter', from: 'POS', to: 'GER', qty: 2, status: 'Completed', date: '5/18/2026' },
  { id: 3, asset: '40mm Grenade', from: 'POS', to: 'FRA', qty: 3, status: 'Completed', date: '5/13/2026' },
  { id: 4, asset: 'Bradley IFV', from: 'FRA', to: 'GER', qty: 2, status: 'Completed', date: '5/13/2026' },
];

export const Transfers = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [transfers, setTransfers] = useState(MOCK_TRANSFERS);

  // Form State
  const [assetName, setAssetName] = useState('');
  const [fromBase, setFromBase] = useState('GER');
  const [toBase, setToBase] = useState('');
  const [qty, setQty] = useState('');

  const handleExecuteTransfer = (e: React.FormEvent) => {
    e.preventDefault();
    const newTransfer = {
      id: transfers.length + 1,
      asset: assetName,
      from: fromBase,
      to: toBase,
      qty: parseInt(qty) || 1,
      status: 'Completed',
      date: new Date().toLocaleDateString()
    };
    setTransfers([newTransfer, ...transfers]);
    setIsModalOpen(false);
    setAssetName('');
    setToBase('');
    setQty('');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-foreground">Transfers</h2>
          <p className="text-muted-foreground mt-1 font-medium">Transfer assets between military bases.</p>
        </div>
        <Button onClick={() => setIsModalOpen(true)} className="flex items-center space-x-2">
          <Plus className="w-4 h-4" />
          <span>New Transfer</span>
        </Button>
      </div>
      
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-muted-foreground uppercase bg-muted/50 border-b border-border">
                <tr>
                  <th className="px-6 py-4 font-medium">Asset</th>
                  <th className="px-6 py-4 font-medium">From</th>
                  <th className="px-6 py-4 font-medium">To</th>
                  <th className="px-6 py-4 font-medium">Qty</th>
                  <th className="px-6 py-4 font-medium">Status</th>
                  <th className="px-6 py-4 font-medium">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {transfers.map((t) => (
                  <tr key={t.id} className="hover:bg-muted/30 transition-colors">
                    <td className="px-6 py-4 font-medium text-foreground flex items-center space-x-3">
                      <ArrowRightLeft className="w-4 h-4 text-primary" />
                      <span>{t.asset}</span>
                    </td>
                    <td className="px-6 py-4 text-muted-foreground">{t.from}</td>
                    <td className="px-6 py-4 text-muted-foreground">{t.to}</td>
                    <td className="px-6 py-4 text-foreground font-semibold">{t.qty.toLocaleString()}</td>
                    <td className="px-6 py-4">
                      <span className="px-2.5 py-1 rounded-full text-xs font-medium border bg-primary/10 text-primary border-primary/20">
                        {t.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-muted-foreground">{t.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="New Transfer">
        <form onSubmit={handleExecuteTransfer} className="space-y-4">
          
          <div>
            <label className="mb-2 block text-sm font-medium text-foreground">Asset</label>
            <select 
              className="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring transition-all duration-200"
              value={assetName}
              onChange={(e) => setAssetName(e.target.value)}
              required
            >
              <option value="" disabled className="bg-background">Select asset...</option>
              <option value="M1 Abrams Tank" className="bg-background">M1 Abrams Tank</option>
              <option value="Humvee" className="bg-background">Humvee</option>
              <option value="Black Hawk Helicopter" className="bg-background">Black Hawk Helicopter</option>
              <option value="40mm Grenade" className="bg-background">40mm Grenade</option>
              <option value="Bradley IFV" className="bg-background">Bradley IFV</option>
            </select>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <Input 
              label="From Base" 
              value={fromBase}
              onChange={(e) => setFromBase(e.target.value)}
              placeholder="Source base"
              required 
            />
            
            <div>
              <label className="mb-2 block text-sm font-medium text-foreground">To Base</label>
              <select 
                className="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring transition-all duration-200"
                value={toBase}
                onChange={(e) => setToBase(e.target.value)}
                required
              >
                <option value="" disabled className="bg-background">Select destination...</option>
                <option value="GER" className="bg-background">GER</option>
                <option value="POS" className="bg-background">POS</option>
                <option value="FRA" className="bg-background">FRA</option>
              </select>
            </div>
          </div>
          
          <Input 
            label="Quantity" 
            type="number" 
            min="1" 
            value={qty}
            onChange={(e) => setQty(e.target.value)}
            required 
          />
          
          <Button type="submit" className="w-full mt-6">Execute Transfer</Button>
        </form>
      </Modal>
    </div>
  );
};
