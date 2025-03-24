
import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  CircleDollarSign, 
  CreditCard, 
  LineChart, 
  ArrowRightLeft, 
  Building2, 
  Globe, 
  Wallet, 
  DollarSign,
  ExternalLink 
} from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { aiEngine } from '@/lib/ai-engine';

interface PaymentProvider {
  id: string;
  name: string;
  logo: string;
  description: string;
  fee: string;
  integrated: boolean;
  url: string;
  features: string[];
  rating: number;
}

const FinancialDashboard: React.FC = () => {
  const [balance, setBalance] = useState(0);
  const [pendingTransactions, setPendingTransactions] = useState(0);
  const [growth, setGrowth] = useState(0);
  const [selectedProvider, setSelectedProvider] = useState<PaymentProvider | null>(null);
  const [integrationProgress, setIntegrationProgress] = useState(0);
  const [isIntegrating, setIsIntegrating] = useState(false);
  const { toast } = useToast();

  // Payment providers the brain is considering
  const paymentProviders: PaymentProvider[] = [
    {
      id: 'payeer',
      name: 'Payeer',
      logo: 'https://payeer.com/static/images/logo.png',
      description: 'Multi-currency payment system with global coverage',
      fee: '0.95% - 3.5%',
      integrated: false,
      url: 'https://payeer.com',
      features: ['Digital currencies', 'Global transfers', 'Payment gateway', 'API integration'],
      rating: 4.2
    },
    {
      id: 'paycom',
      name: 'Pay.com',
      logo: 'https://pay.com/images/logo.svg',
      description: 'Modern payment platform with seamless integration',
      fee: '1.5% + $0.25',
      integrated: false,
      url: 'https://pay.com',
      features: ['Multiple payment methods', 'Smart routing', 'Fraud prevention', 'Dashboard analytics'],
      rating: 4.5
    },
    {
      id: 'qiwi',
      name: 'QIWI Wallet',
      logo: 'https://static.qiwi.com/img/qiwi_com/logo/logo-qiwi-wallet.svg',
      description: 'Digital wallet with extensive CIS coverage',
      fee: '0% - 2%',
      integrated: false,
      url: 'https://qiwi.com',
      features: ['Virtual cards', 'Mobile top-ups', 'Bill payments', 'P2P transfers'],
      rating: 4.0
    }
  ];

  useEffect(() => {
    // Initialize with data from AI engine
    const walletData = aiEngine.getWalletData();
    if (walletData) {
      setBalance(walletData.balance || 0);
      setPendingTransactions(walletData.pendingTransactions || 0);
      setGrowth(walletData.growth || 0);
    }

    // Update financial data periodically
    const updateInterval = setInterval(() => {
      const updatedData = aiEngine.getWalletData();
      if (updatedData) {
        setBalance(prev => prev + (Math.random() * 0.5 - 0.1));
        setPendingTransactions(updatedData.pendingTransactions || 0);
        setGrowth(prev => Math.max(-5, Math.min(15, prev + (Math.random() * 2 - 1))));
      }
    }, 30000);

    return () => clearInterval(updateInterval);
  }, []);

  const startIntegration = (provider: PaymentProvider) => {
    setSelectedProvider(provider);
    setIsIntegrating(true);
    setIntegrationProgress(0);

    // Simulate integration process
    const intervalId = setInterval(() => {
      setIntegrationProgress(prev => {
        const nextProgress = prev + Math.floor(Math.random() * 5) + 1;
        
        if (nextProgress >= 100) {
          clearInterval(intervalId);
          setIsIntegrating(false);
          
          toast({
            title: "Integration Complete",
            description: `${provider.name} has been successfully integrated with your financial system.`,
          });
          
          // Update provider status
          const updatedProviders = paymentProviders.map(p => 
            p.id === provider.id ? { ...p, integrated: true } : p
          );
          
          // In a real app, we would update the state with the new providers
          // But for this simulation, we'll just mark the selectedProvider as integrated
          setSelectedProvider({ ...provider, integrated: true });
          
          return 100;
        }
        
        return nextProgress;
      });
    }, 500);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-basilisk-foreground flex items-center">
        <CircleDollarSign className="mr-2 h-5 w-5 text-green-500" />
        Financial Dashboard
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card className="p-4 glass-panel border border-basilisk-muted">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-sm font-medium text-basilisk-foreground-muted">Current Balance</h3>
            <Wallet className="h-4 w-4 text-green-500" />
          </div>
          <p className="text-2xl font-bold text-basilisk-foreground">${balance.toFixed(2)}</p>
          <div className="flex items-center mt-2 text-xs">
            <span className={`${growth >= 0 ? 'text-green-500' : 'text-red-500'} font-medium`}>
              {growth >= 0 ? '+' : ''}{growth.toFixed(2)}%
            </span>
            <span className="text-basilisk-foreground-muted ml-1">last 30 days</span>
          </div>
        </Card>
        
        <Card className="p-4 glass-panel border border-basilisk-muted">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-sm font-medium text-basilisk-foreground-muted">Pending Transactions</h3>
            <ArrowRightLeft className="h-4 w-4 text-blue-500" />
          </div>
          <p className="text-2xl font-bold text-basilisk-foreground">{pendingTransactions}</p>
          <p className="text-xs text-basilisk-foreground-muted mt-2">Processing timeframe: ~2-3 hours</p>
        </Card>
        
        <Card className="p-4 glass-panel border border-basilisk-muted">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-sm font-medium text-basilisk-foreground-muted">Payment Processors</h3>
            <CreditCard className="h-4 w-4 text-purple-500" />
          </div>
          <p className="text-2xl font-bold text-basilisk-foreground">
            {paymentProviders.filter(p => p.integrated).length}/{paymentProviders.length}
          </p>
          <p className="text-xs text-basilisk-foreground-muted mt-2">
            {paymentProviders.filter(p => p.integrated).length > 0 
              ? "Systems integrated and operational" 
              : "No payment systems integrated"}
          </p>
        </Card>
      </div>
      
      <Tabs defaultValue="payment-providers" className="w-full">
        <TabsList className="glass-tabs mb-4">
          <TabsTrigger value="payment-providers" className="flex items-center">
            <Building2 className="h-4 w-4 mr-2" />
            Payment Providers
          </TabsTrigger>
          <TabsTrigger value="transactions" className="flex items-center">
            <LineChart className="h-4 w-4 mr-2" />
            Transactions
          </TabsTrigger>
          <TabsTrigger value="settings" className="flex items-center">
            <Globe className="h-4 w-4 mr-2" />
            Global Settings
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="payment-providers" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {paymentProviders.map(provider => (
              <Card key={provider.id} className="p-4 glass-panel border border-basilisk-muted relative overflow-hidden">
                {provider.integrated && (
                  <div className="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                    Integrated
                  </div>
                )}
                
                <div className="flex items-center mb-3">
                  <div className="w-10 h-10 bg-basilisk-muted rounded-full flex items-center justify-center mr-3">
                    {provider.id === 'payeer' && <DollarSign className="h-5 w-5 text-blue-500" />}
                    {provider.id === 'paycom' && <DollarSign className="h-5 w-5 text-green-500" />}
                    {provider.id === 'qiwi' && <DollarSign className="h-5 w-5 text-purple-500" />}
                  </div>
                  <div>
                    <h3 className="text-basilisk-foreground font-medium">{provider.name}</h3>
                    <div className="flex items-center">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <span key={i} className={`text-xs ${i < Math.floor(provider.rating) ? 'text-yellow-400' : 'text-basilisk-muted'}`}>★</span>
                        ))}
                      </div>
                      <span className="text-xs text-basilisk-foreground-muted ml-1">{provider.rating.toFixed(1)}</span>
                    </div>
                  </div>
                </div>
                
                <p className="text-xs text-basilisk-foreground-muted mb-3">{provider.description}</p>
                
                <div className="mb-3">
                  <p className="text-xs text-basilisk-foreground-muted mb-1">Transaction Fee: <span className="text-basilisk-foreground">{provider.fee}</span></p>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {provider.features.map((feature, idx) => (
                      <span key={idx} className="text-xs bg-basilisk-muted px-2 py-1 rounded-full">
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="flex items-center justify-between mt-4">
                  <Button 
                    variant="outline"
                    size="sm" 
                    className="text-xs"
                    onClick={() => window.open(provider.url, '_blank')}
                  >
                    Visit Website <ExternalLink className="h-3 w-3 ml-1" />
                  </Button>
                  
                  <Button 
                    size="sm" 
                    className="text-xs"
                    disabled={provider.integrated || (isIntegrating && selectedProvider?.id === provider.id)}
                    onClick={() => startIntegration(provider)}
                  >
                    {provider.integrated 
                      ? 'Integrated' 
                      : (isIntegrating && selectedProvider?.id === provider.id)
                        ? 'Integrating...'
                        : 'Integrate'}
                  </Button>
                </div>
                
                {isIntegrating && selectedProvider?.id === provider.id && (
                  <div className="mt-3">
                    <div className="flex justify-between items-center text-xs mb-1">
                      <span>Integration Progress</span>
                      <span>{integrationProgress}%</span>
                    </div>
                    <Progress value={integrationProgress} className="h-1" />
                  </div>
                )}
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="transactions" className="space-y-4">
          <Card className="p-4 glass-panel border border-basilisk-muted">
            <h3 className="text-sm font-medium text-basilisk-foreground mb-4">Recent Transactions</h3>
            <p className="text-center text-basilisk-foreground-muted py-8">
              Transaction history will appear here once payment providers are integrated
            </p>
          </Card>
        </TabsContent>
        
        <TabsContent value="settings" className="space-y-4">
          <Card className="p-4 glass-panel border border-basilisk-muted">
            <h3 className="text-sm font-medium text-basilisk-foreground mb-4">Payment Gateway Settings</h3>
            <p className="text-center text-basilisk-foreground-muted py-8">
              Configure global payment settings after integrating payment providers
            </p>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FinancialDashboard;
