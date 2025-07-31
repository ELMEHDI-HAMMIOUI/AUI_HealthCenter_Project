import React, { useState } from 'react';
import { Plus, TrendingUp, TrendingDown, Search, Filter, Calendar } from 'lucide-react';
import Modal from '../components/Modal';
import StockTransactionForm from '../components/StockTransactionForm';

interface StockTransaction {
  id: string;
  type: 'ENTRE' | 'SORTIE';
  medicineId: string;
  medicineName: string;
  quantity: number;
  reason: string;
  date: string;
  performedBy: string;
  batchNumber: string;
  supplier?: string;
  notes?: string;
}

const StockManagement = () => {
  const [transactions, setTransactions] = useState<StockTransaction[]>([
    {
      id: '1',
      type: 'ENTRE',
      medicineId: '1',
      medicineName: 'Paracetamol 500mg',
      quantity: 100,
      reason: 'New stock delivery',
      date: '2024-01-20T10:30:00Z',
      performedBy: 'Ahmed Alami',
      batchNumber: 'LOT001',
      supplier: 'PharmaCorp',
      notes: 'Regular monthly delivery'
    },
    {
      id: '2',
      type: 'SORTIE',
      medicineId: '1',
      medicineName: 'Paracetamol 500mg',
      quantity: 10,
      reason: 'Student prescription',
      date: '2024-01-20T14:15:00Z',
      performedBy: 'Dr. Fatima Alaoui',
      batchNumber: 'LOT001',
      notes: 'Prescription for Omar Benali'
    },
    {
      id: '3',
      type: 'ENTRE',
      medicineId: '2',
      medicineName: 'Ibuprofen 400mg',
      quantity: 50,
      reason: 'Emergency stock',
      date: '2024-01-19T09:00:00Z',
      performedBy: 'Ahmed Alami',
      batchNumber: 'LOT002',
      supplier: 'MediSupply'
    }
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<'ALL' | 'ENTRE' | 'SORTIE'>('ALL');

  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearch = transaction.medicineName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaction.reason.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaction.performedBy.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'ALL' || transaction.type === selectedType;
    return matchesSearch && matchesType;
  });

  const handleAddTransaction = (transactionData: Omit<StockTransaction, 'id'>) => {
    const newTransaction: StockTransaction = {
      ...transactionData,
      id: Date.now().toString()
    };
    setTransactions([newTransaction, ...transactions]);
    setIsModalOpen(false);
  };

  const getTotalEntries = () => {
    return transactions
      .filter(t => t.type === 'ENTRE')
      .reduce((sum, t) => sum + t.quantity, 0);
  };

  const getTotalExits = () => {
    return transactions
      .filter(t => t.type === 'SORTIE')
      .reduce((sum, t) => sum + t.quantity, 0);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Stock Management</h1>
          <p className="text-gray-600">Track medicine stock entries and exits</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
        >
          <Plus className="w-5 h-5" />
          <span>Record Transaction</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Entries</p>
              <p className="text-2xl font-bold text-green-600 mt-2">{getTotalEntries()}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Exits</p>
              <p className="text-2xl font-bold text-red-600 mt-2">{getTotalExits()}</p>
            </div>
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
              <TrendingDown className="w-6 h-6 text-red-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Net Change</p>
              <p className={`text-2xl font-bold mt-2 ${
                getTotalEntries() - getTotalExits() >= 0 ? 'text-green-600' : 'text-red-600'
              }`}>
                {getTotalEntries() - getTotalExits() >= 0 ? '+' : ''}{getTotalEntries() - getTotalExits()}
              </p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Calendar className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center space-x-4">
            <div className="relative flex-1">
              <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search transactions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value as 'ALL' | 'ENTRE' | 'SORTIE')}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="ALL">All Transactions</option>
              <option value="ENTRE">Stock Entries</option>
              <option value="SORTIE">Stock Exits</option>
            </select>
            <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <Filter className="w-5 h-5" />
              <span>Filter</span>
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Medicine
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Quantity
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Reason
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Performed By
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredTransactions.map((transaction) => (
                <tr key={transaction.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      transaction.type === 'ENTRE' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {transaction.type === 'ENTRE' ? (
                        <TrendingUp className="w-3 h-3 mr-1" />
                      ) : (
                        <TrendingDown className="w-3 h-3 mr-1" />
                      )}
                      {transaction.type === 'ENTRE' ? 'Entry' : 'Exit'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{transaction.medicineName}</div>
                    <div className="text-sm text-gray-500">Batch: {transaction.batchNumber}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className={`text-sm font-medium ${
                      transaction.type === 'ENTRE' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {transaction.type === 'ENTRE' ? '+' : '-'}{transaction.quantity}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{transaction.reason}</div>
                    {transaction.supplier && (
                      <div className="text-sm text-gray-500">Supplier: {transaction.supplier}</div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {new Date(transaction.date).toLocaleDateString()}
                    </div>
                    <div className="text-sm text-gray-500">
                      {new Date(transaction.date).toLocaleTimeString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{transaction.performedBy}</div>
                    {transaction.notes && (
                      <div className="text-sm text-gray-500">{transaction.notes}</div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Record Stock Transaction"
      >
        <StockTransactionForm
          onSubmit={handleAddTransaction}
          onCancel={() => setIsModalOpen(false)}
        />
      </Modal>
    </div>
  );
};

export default StockManagement;