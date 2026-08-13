import React, { useState } from 'react';
import { Card, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Modal } from '../components/ui/Modal';
import { ClipboardList, Plus } from 'lucide-react';

// Mock data for demo purposes
const MOCK_ASSIGNMENTS = [
  { id: 1, asset: 'M1 Abrams Tank', base: 'GER', qty: 4, status: 'Active', date: '5/18/2026' },
  { id: 2, asset: 'Humvee', base: 'POS', qty: 10, status: 'Active', date: '5/17/2026' },
  { id: 3, asset: '5.56mm NATO', base: 'FRA', qty: 5000, status: 'Expended', date: '5/15/2026' },
  { id: 4, asset: 'Black Hawk Helicopter', base: 'GER', qty: 1, status: 'Active', date: '5/14/2026' },
];

export const Assignments = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [assignments, setAssignments] = useState(MOCK_ASSIGNMENTS);

  // Form State
  const [assetName, setAssetName] = useState('');
  const [base, setBase] = useState('GER');
  const [qty, setQty] = useState('');
  
  const handleRecordAssignment = (e: React.FormEvent) => {
    e.preventDefault();
    const newAssignment = {
      id: assignments.length + 1,
      asset: assetName,
      base: base,
      qty: parseInt(qty) || 1,
      status: 'Active',
      date: new Date().toLocaleDateString()
    };
    setAssignments([newAssignment, ...assignments]);
    setIsModalOpen(false);
    setAssetName('');
    setQty('');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-foreground">Assignments</h2>
          <p className="text-muted-foreground mt-1 font-medium">Manage active asset assignments and expenditures.</p>
        </div>
        <Button onClick={() => setIsModalOpen(true)} className="flex items-center space-x-2">
          <Plus className="w-4 h-4" />
          <span>New Assignment</span>
        </Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-muted-foreground uppercase bg-muted/50 border-b border-border">
                <tr>
                  <th className="px-6 py-4 font-medium">Asset</th>
                  <th className="px-6 py-4 font-medium">Assigned To</th>
                  <th className="px-6 py-4 font-medium">Qty</th>
                  <th className="px-6 py-4 font-medium">Status</th>
                  <th className="px-6 py-4 font-medium">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {assignments.map((asg) => (
                  <tr key={asg.id} className="hover:bg-muted/30 transition-colors">
                    <td className="px-6 py-4 font-medium text-foreground flex items-center space-x-3">
                      <ClipboardList className="w-4 h-4 text-primary" />
                      <span>{asg.asset}</span>
                    </td>
                    <td className="px-6 py-4 text-muted-foreground">{asg.base}</td>
                    <td className="px-6 py-4 text-foreground font-semibold">{asg.qty.toLocaleString()}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${
                        asg.status === 'Active' 
                          ? 'bg-primary/10 text-primary border-primary/20' 
                          : 'bg-destructive/10 text-destructive border-destructive/20'
                      }`}>
                        {asg.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-muted-foreground">{asg.date}</td>
                  </tr>
                ))}
                {assignments.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-6 py-8 text-center text-muted-foreground">
                      No assignments found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Record New Assignment">
        <form onSubmit={handleRecordAssignment} className="space-y-4">
          <Input 
            label="Asset Name" 
            placeholder="e.g. M1 Abrams" 
            value={assetName}
            onChange={(e) => setAssetName(e.target.value)}
            required 
          />
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-2 block text-sm font-medium text-foreground">Base</label>
              <select 
                className="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring transition-all duration-200"
                value={base}
                onChange={(e) => setBase(e.target.value)}
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
          
          <Input label="Description (Optional)" placeholder="Purpose of assignment" />
          
          <Button type="submit" className="w-full mt-6">Confirm Assignment</Button>
        </form>
      </Modal>
    </div>
  );
};
