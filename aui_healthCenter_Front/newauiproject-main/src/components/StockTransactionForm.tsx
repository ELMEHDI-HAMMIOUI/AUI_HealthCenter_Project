import React, { useState } from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface StockTransaction {
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

interface StockTransactionFormProps {
  onSubmit: (data: StockTransaction) => void;
  onCancel: () => void;
}

const StockTransactionForm: React.FC<StockTransactionFormProps> = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState<StockTransaction>({
    type: 'ENTRE',
    medicineId: '',
    medicineName: '',
    quantity: 0,
    reason: '',
    date: new Date().toISOString().split('T')[0],
    performedBy: '',
    batchNumber: '',
    supplier: '',
    notes: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const submitData = { ...formData };
    if (!submitData.supplier) delete submitData.supplier;
    if (!submitData.notes) delete submitData.notes;
    onSubmit(submitData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'quantity' ? Number(value) : value
    }));
  };

  const medicineOptions = [
    { id: '1', name: 'Paracetamol 500mg' },
    { id: '2', name: 'Ibuprofen 400mg' },
    { id: '3', name: 'Amoxicillin 250mg' },
    { id: '4', name: 'Aspirin 325mg' },
    { id: '5', name: 'Omeprazole 20mg' }
  ];

  const entryReasons = [
    'New stock delivery',
    'Emergency stock',
    'Returned stock',
    'Stock adjustment',
    'Donation received'
  ];

  const exitReasons = [
    'Student prescription',
    'Staff prescription',
    'Emergency use',
    'Expired stock disposal',
    'Stock transfer',
    'Damaged stock removal'
  ];

  const reasons = formData.type === 'ENTRE' ? entryReasons : exitReasons;

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Transaction Type
        </label>
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => setFormData(prev => ({ ...prev, type: 'ENTRE' }))}
            className={`p-3 border rounded-lg flex items-center justify-center space-x-2 transition-colors ${
              formData.type === 'ENTRE'
                ? 'border-green-500 bg-green-50 text-green-700'
                : 'border-gray-300 hover:bg-gray-50'
            }`}
          >
            <TrendingUp className="w-5 h-5" />
            <span>Stock Entry</span>
          </button>
          <button
            type="button"
            onClick={() => setFormData(prev => ({ ...prev, type: 'SORTIE' }))}
            className={`p-3 border rounded-lg flex items-center justify-center space-x-2 transition-colors ${
              formData.type === 'SORTIE'
                ? 'border-red-500 bg-red-50 text-red-700'
                : 'border-gray-300 hover:bg-gray-50'
            }`}
          >
            <TrendingDown className="w-5 h-5" />
            <span>Stock Exit</span>
          </button>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Medicine *
        </label>
        <select
          name="medicineId"
          value={formData.medicineId}
          onChange={(e) => {
            const selectedMedicine = medicineOptions.find(med => med.id === e.target.value);
            setFormData(prev => ({
              ...prev,
              medicineId: e.target.value,
              medicineName: selectedMedicine?.name || ''
            }));
          }}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          required
        >
          <option value="">Select a medicine</option>
          {medicineOptions.map((medicine) => (
            <option key={medicine.id} value={medicine.id}>
              {medicine.name}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Quantity *
          </label>
          <input
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            min="1"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Date *
          </label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Reason *
        </label>
        <select
          name="reason"
          value={formData.reason}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          required
        >
          <option value="">Select a reason</option>
          {reasons.map((reason) => (
            <option key={reason} value={reason}>
              {reason}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Performed By *
          </label>
          <input
            type="text"
            name="performedBy"
            value={formData.performedBy}
            onChange={handleChange}
            placeholder="Staff member name"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Batch Number *
          </label>
          <input
            type="text"
            name="batchNumber"
            value={formData.batchNumber}
            onChange={handleChange}
            placeholder="e.g., LOT001"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            required
          />
        </div>
      </div>

      {formData.type === 'ENTRE' && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Supplier
          </label>
          <input
            type="text"
            name="supplier"
            value={formData.supplier}
            onChange={handleChange}
            placeholder="Supplier name (optional)"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Notes
        </label>
        <textarea
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          rows={3}
          placeholder="Additional notes (optional)"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
        />
      </div>

      <div className="flex items-center justify-end space-x-3 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
        >
          Record Transaction
        </button>
      </div>
    </form>
  );
};

export default StockTransactionForm;