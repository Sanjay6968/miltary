import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';

export const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      if (username === 'admin' && password === 'admin') {
        const mockUser = { id: 1, username: 'admin', role: 'ADMIN', baseId: null };
        login('demo_token', mockUser);
        navigate('/');
        return;
      }

      const response = await api.post('/auth/login', { username, password });
      login(response.data.token, response.data.user);
      navigate('/');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to login. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight gradient-text">AssetOps</h1>
        <p className="text-foreground/80 mt-2 font-medium">Military Asset Management System</p>
      </div>

      <Card className="w-full max-w-md">
        <CardHeader className="pb-4 border-b border-border">
          <CardTitle className="text-xl text-foreground">Sign in to your account</CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="p-3 rounded-md bg-destructive/10 text-destructive text-sm font-medium border border-destructive/20">
                {error}
              </div>
            )}
            
            <Input
              label="Username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="e.g. admin_user"
              required
            />
            
            <Input
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />

            <Button type="submit" className="w-full mt-4" isLoading={isLoading}>
              Sign In
            </Button>
          </form>

          <div className="mt-8 pt-6 border-t border-border">
            <p className="text-sm text-center text-muted-foreground font-medium mb-4">Quick Access Demos (No DB Required)</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <Button 
                variant="outline" 
                className="text-xs"
                onClick={() => {
                  login('demo_token', { id: 1, username: 'admin', role: 'ADMIN', baseId: 'All' });
                  navigate('/');
                }}
              >
                Admin
              </Button>
              <Button 
                variant="outline" 
                className="text-xs"
                onClick={() => {
                  login('demo_token', { id: 2, username: 'cmdr_ger', role: 'COMMANDER', baseId: 'GER' });
                  navigate('/');
                }}
              >
                Commander (GER)
              </Button>
              <Button 
                variant="outline" 
                className="text-xs"
                onClick={() => {
                  login('demo_token', { id: 3, username: 'logistics_hq', role: 'LOGISTICS', baseId: 'All' });
                  navigate('/');
                }}
              >
                Logistics
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <p className="mt-8 text-sm text-muted-foreground font-medium tracking-wide uppercase">
        Secure Access Portal. Authorized Personnel Only.
      </p>
    </div>
  );
};
