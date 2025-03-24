
import React from 'react';
import { ArrowUpRight, ArrowDownRight, Clock, Check } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Transaction } from './types';

interface TransactionsViewProps {
  transactions: Transaction[];
  showAllTransactions: boolean;
  setShowAllTransactions: (show: boolean) => void;
}

export function TransactionsView({ 
  transactions, 
  showAllTransactions, 
  setShowAllTransactions 
}: TransactionsViewProps) {
  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    });
  };

  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">Recent Transactions</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[300px] pr-4">
          {transactions.slice(0, showAllTransactions ? undefined : 5).map((transaction) => (
            <div
              key={transaction.id}
              className="mb-3 flex items-center p-2 rounded-lg hover:bg-muted/50 transition-colors"
            >
              <div className={`mr-3 rounded-full p-2 ${
                transaction.type === 'income' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
              }`}>
                {transaction.type === 'income' ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-medium">{transaction.description}</h4>
                <p className="text-xs text-muted-foreground">{formatDate(transaction.date)}</p>
              </div>
              <div className="text-right">
                <p className={`text-sm font-medium ${
                  transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {transaction.type === 'income' ? '+' : '-'}${transaction.amount}
                </p>
                <Badge variant={
                  transaction.status === 'completed' ? 'default' : 
                  transaction.status === 'pending' ? 'outline' : 'destructive'
                } className="text-xs">
                  {transaction.status === 'completed' ? (
                    <Check className="mr-1 h-3 w-3" />
                  ) : transaction.status === 'pending' ? (
                    <Clock className="mr-1 h-3 w-3" />
                  ) : null}
                  {transaction.status}
                </Badge>
              </div>
            </div>
          ))}
        </ScrollArea>
        <Button 
          variant="outline" 
          size="sm" 
          className="w-full mt-2"
          onClick={() => setShowAllTransactions(!showAllTransactions)}
        >
          {showAllTransactions ? 'Show Less' : 'View All Transactions'}
        </Button>
      </CardContent>
    </Card>
  );
}
