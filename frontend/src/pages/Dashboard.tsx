import React, { useState } from 'react';
import { Card, CardContent } from '../components/ui/Card';
import { Package, ArrowRightLeft, ClipboardList, AlertTriangle, TrendingUp, TrendingDown, Filter } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

// Mock Data
const BASES = ['GER', 'POS', 'FRA'];
const CATEGORIES = ['Vehicle', 'Weapon', 'Ammunition'];

const NET_MOVEMENTS = [
  { base: 'GER', in: 4, out: 23424, assigned: 0, net: -23420 },
  { base: 'POS', in: 23423, out: 6, assigned: 0, net: 23417 },
  { base: 'FRA', in: 5, out: 0, assigned: 3, net: 2 },
];

const MOCK_ASSETS = [
  { id: 1, asset: 'M1 Abrams Tank', category: 'Vehicle', base: 'GER', qty: 12, status: 'Available' },
  { id: 2, asset: 'Bradley IFV', category: 'Vehicle', base: 'POS', qty: 15, status: 'Available' },
  { id: 3, asset: 'Humvee', category: 'Vehicle', base: 'GER', qty: 30, status: 'Available' },
  { id: 4, asset: '5.56mm NATO', category: 'Ammunition', base: 'FRA', qty: 5000, status: 'Available' },
];

export const Dashboard = () => {
  const { user } = useAuth();
  const [filterBase, setFilterBase] = useState('');
  const [filterCategory, setFilterCategory] = useState('');

  const filteredAssets = MOCK_ASSETS.filter(a => {
    if (filterBase && a.base !== filterBase) return false;
    if (filterCategory && a.category !== filterCategory) return false;
    return true;
  });

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-foreground">Command Dashboard</h2>
        <p className="text-muted-foreground mt-1 font-medium">Welcome back, <strong className="text-foreground">{user?.username}</strong>. Overview of all military assets.</p>
      </div>

      {/* Top Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="glass-panel border-primary/20">
          <CardContent className="p-6 flex items-center space-x-4">
            <div className="p-3 bg-primary/10 text-primary rounded-lg">
              <Package size={24} />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">23,424,200</p>
              <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wider">Total Asset Units</p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="glass-panel border-blue-500/20">
          <CardContent className="p-6 flex items-center space-x-4">
            <div className="p-3 bg-blue-500/10 text-blue-400 rounded-lg">
              <ArrowRightLeft size={24} />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">6</p>
              <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wider">Transfers</p>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-panel border-amber-500/20">
          <CardContent className="p-6 flex items-center space-x-4">
            <div className="p-3 bg-amber-500/10 text-amber-500 rounded-lg">
              <ClipboardList size={24} />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">0</p>
              <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wider">Assignments</p>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-panel border-destructive/20">
          <CardContent className="p-6 flex items-center space-x-4">
            <div className="p-3 bg-destructive/10 text-destructive rounded-lg">
              <AlertTriangle size={24} />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">1</p>
              <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wider">Expenditures</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filter Bar */}
      <div className="flex items-center space-x-4">
        <Filter className="w-5 h-5 text-muted-foreground" />
        <select 
          className="h-10 rounded-md border border-input bg-card px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          value={filterBase}
          onChange={(e) => setFilterBase(e.target.value)}
        >
          <option value="" className="bg-background">All Bases</option>
          {BASES.map(b => <option key={b} value={b} className="bg-background">{b}</option>)}
        </select>
        <select 
          className="h-10 rounded-md border border-input bg-card px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
        >
          <option value="" className="bg-background">All Categories</option>
          {CATEGORIES.map(c => <option key={c} value={c} className="bg-background">{c}</option>)}
        </select>
      </div>

      {/* Net Movement Cards */}
      <div>
        <h3 className="text-lg font-semibold text-foreground">Net Movement by Base</h3>
        <p className="text-sm text-muted-foreground mb-4">Click a base card to see detailed breakdown</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {NET_MOVEMENTS.map(m => (
            <Card key={m.base} className="glass-panel hover:border-primary/50 transition-colors cursor-pointer">
              <CardContent className="p-6">
                <h4 className="font-bold text-foreground mb-4">{m.base}</h4>
                <div className="space-y-2 text-sm font-medium">
                  <div className="flex items-center text-primary">
                    <TrendingUp className="w-4 h-4 mr-2" />
                    <span>+{m.in.toLocaleString()} in</span>
                  </div>
                  <div className="flex items-center text-destructive">
                    <TrendingDown className="w-4 h-4 mr-2" />
                    <span>-{m.out.toLocaleString()} out</span>
                  </div>
                  <div className="flex items-center text-amber-500">
                    <ClipboardList className="w-4 h-4 mr-2" />
                    <span>-{m.assigned.toLocaleString()} assigned</span>
                  </div>
                </div>
                <div className={`mt-6 pt-4 border-t border-border font-bold ${m.net >= 0 ? 'text-primary' : 'text-destructive'}`}>
                  Net: {m.net > 0 ? '+' : ''}{m.net.toLocaleString()}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Asset Inventory Table */}
      <div>
        <h3 className="text-lg font-semibold text-foreground">Asset Inventory</h3>
        <p className="text-sm text-muted-foreground mb-4">{filteredAssets.length} assets found</p>
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
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {filteredAssets.map((asset) => (
                    <tr key={asset.id} className="hover:bg-muted/30 transition-colors">
                      <td className="px-6 py-4 font-medium text-foreground flex items-center space-x-3">
                        <Package className="w-4 h-4 text-primary" />
                        <span>{asset.asset}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 text-xs font-semibold rounded-md ${
                          asset.category === 'Vehicle' ? 'bg-primary/20 text-primary' : 
                          asset.category === 'Weapon' ? 'bg-destructive/20 text-destructive' :
                          'bg-amber-500/20 text-amber-500'
                        }`}>
                          {asset.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-muted-foreground">{asset.base}</td>
                      <td className="px-6 py-4 text-foreground font-semibold">{asset.qty.toLocaleString()}</td>
                      <td className="px-6 py-4">
                        <span className="px-2.5 py-1 rounded-full text-xs font-medium border bg-primary/10 text-primary border-primary/20">
                          {asset.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                  {filteredAssets.length === 0 && (
                    <tr>
                      <td colSpan={5} className="px-6 py-8 text-center text-muted-foreground">
                        No assets found with current filters.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
