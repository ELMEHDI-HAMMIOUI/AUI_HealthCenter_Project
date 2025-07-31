import React, { useState } from 'react';
import { Plus, Search, Filter, Edit, Trash2, AlertTriangle } from 'lucide-react';
import Modal from '../components/Modal';
import MedicineForm from '../components/MedicineForm';

interface Medicine {
  id: string;
  nom: string;
  dosage: string;
  forme: string;
  stockActuel: number;
  stockMinimal: number;
  dateExpiration: string;
  prixUnitaire: number;
  numeroLot: string;
  fournisseur: string;
}

const Medicines = () => {
  const [medicines, setMedicines] = useState<Medicine[]>([
    {
      id: '1',
      nom: 'Paracetamol',
      dosage: '500mg',
      forme: 'Tablet',
      stockActuel: 150,
      stockMinimal: 50,
      dateExpiration: '2025-12-31',
      prixUnitaire: 2.50,
      numeroLot: 'LOT001',
      fournisseur: 'PharmaCorp'
    },
    {
      id: '2',
      nom: 'Ibuprofen',
      dosage: '400mg',
      forme: 'Tablet',
      stockActuel: 25,
      stockMinimal: 30,
      dateExpiration: '2025-06-15',
      prixUnitaire: 3.00,
      numeroLot: 'LOT002',
      fournisseur: 'MediSupply'
    },
    {
      id: '3',
      nom: 'Amoxicillin',
      dosage: '250mg',
      forme: 'Capsule',
      stockActuel: 80,
      stockMinimal: 40,
      dateExpiration: '2025-03-20',
      prixUnitaire: 5.50,
      numeroLot: 'LOT003',
      fournisseur: 'PharmaCorp'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMedicine, setEditingMedicine] = useState<Medicine | null>(null);

  const filteredMedicines = medicines.filter(medicine =>
    medicine.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
    medicine.dosage.toLowerCase().includes(searchTerm.toLowerCase()) ||
    medicine.fournisseur.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddMedicine = (medicineData: Omit<Medicine, 'id'>) => {
    const newMedicine: Medicine = {
      ...medicineData,
      id: Date.now().toString()
    };
    setMedicines([...medicines, newMedicine]);
    setIsModalOpen(false);
  };

  const handleEditMedicine = (medicineData: Omit<Medicine, 'id'>) => {
    if (editingMedicine) {
      setMedicines(medicines.map(med => 
        med.id === editingMedicine.id ? { ...medicineData, id: editingMedicine.id } : med
      ));
      setEditingMedicine(null);
      setIsModalOpen(false);
    }
  };

  const handleDeleteMedicine = (id: string) => {
    if (confirm('Are you sure you want to delete this medicine?')) {
      setMedicines(medicines.filter(med => med.id !== id));
    }
  };

  const openEditModal = (medicine: Medicine) => {
    setEditingMedicine(medicine);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingMedicine(null);
  };

  const isLowStock = (medicine: Medicine) => medicine.stockActuel <= medicine.stockMinimal;
  const isExpiringSoon = (medicine: Medicine) => {
    const expiryDate = new Date(medicine.dateExpiration);
    const today = new Date();
    const daysUntilExpiry = Math.ceil((expiryDate.getTime() - today.getTime()) / (1000 * 3600 * 24));
    return daysUntilExpiry <= 90;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Medicine Inventory</h1>
          <p className="text-gray-600">Manage medicine stock levels and information</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
        >
          <Plus className="w-5 h-5" />
          <span>Add Medicine</span>
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center space-x-4">
            <div className="relative flex-1">
              <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search medicines..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
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
                  Medicine Details
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Stock Level
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Expiry Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Supplier
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredMedicines.map((medicine) => (
                <tr key={medicine.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{medicine.nom}</div>
                        <div className="text-sm text-gray-500">{medicine.dosage} - {medicine.forme}</div>
                        <div className="text-xs text-gray-400">Lot: {medicine.numeroLot}</div>
                      </div>
                      {(isLowStock(medicine) || isExpiringSoon(medicine)) && (
                        <AlertTriangle className="w-5 h-5 text-yellow-500 ml-2" />
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{medicine.stockActuel} units</div>
                    <div className={`text-xs ${isLowStock(medicine) ? 'text-red-600' : 'text-gray-500'}`}>
                      Min: {medicine.stockMinimal}
                    </div>
                    {isLowStock(medicine) && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                        Low Stock
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{medicine.dateExpiration}</div>
                    {isExpiringSoon(medicine) && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                        Expiring Soon
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{medicine.prixUnitaire} MAD</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{medicine.fournisseur}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => openEditModal(medicine)}
                        className="text-green-600 hover:text-green-900 transition-colors"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteMedicine(medicine.id)}
                        className="text-red-600 hover:text-red-900 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={editingMedicine ? 'Edit Medicine' : 'Add New Medicine'}
      >
        <MedicineForm
          initialData={editingMedicine}
          onSubmit={editingMedicine ? handleEditMedicine : handleAddMedicine}
          onCancel={closeModal}
        />
      </Modal>
    </div>
  );
};

export default Medicines;