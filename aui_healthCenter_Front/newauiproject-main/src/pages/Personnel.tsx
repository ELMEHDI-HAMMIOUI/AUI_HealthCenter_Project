import React, { useState } from 'react';
import { Plus, Search, Filter, Edit, Trash2, User, Mail, Phone } from 'lucide-react';
import Modal from '../components/Modal';
import PersonnelForm from '../components/PersonnelForm';

interface Personnel {
  id: string;
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
  poste: string;
  dateEmbauche: string;
  salaire: number;
  status: 'ACTIVE' | 'INACTIVE';
  role: 'ADMIN' | 'PHARMACIST' | 'STAFF';
}

const Personnel = () => {
  const [personnel, setPersonnel] = useState<Personnel[]>([
    {
      id: '1',
      nom: 'Alaoui',
      prenom: 'Fatima',
      email: 'fatima.alaoui@aui.ma',
      telephone: '+212 6 12 34 56 78',
      poste: 'Head Pharmacist',
      dateEmbauche: '2022-01-15',
      salaire: 15000,
      status: 'ACTIVE',
      role: 'ADMIN'
    },
    {
      id: '2',
      nom: 'Bennani',
      prenom: 'Ahmed',
      email: 'ahmed.bennani@aui.ma',
      telephone: '+212 6 98 76 54 32',
      poste: 'Pharmacist',
      dateEmbauche: '2022-06-20',
      salaire: 12000,
      status: 'ACTIVE',
      role: 'PHARMACIST'
    },
    {
      id: '3',
      nom: 'Amrani',
      prenom: 'Youssef',
      email: 'youssef.amrani@aui.ma',
      telephone: '+212 6 55 44 33 22',
      poste: 'Health Assistant',
      dateEmbauche: '2023-03-10',
      salaire: 8000,
      status: 'ACTIVE',
      role: 'STAFF'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'ACTIVE' | 'INACTIVE'>('ALL');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPersonnel, setEditingPersonnel] = useState<Personnel | null>(null);

  const filteredPersonnel = personnel.filter(person => {
    const matchesSearch = `${person.prenom} ${person.nom}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         person.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         person.poste.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'ALL' || person.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleAddPersonnel = (personnelData: Omit<Personnel, 'id'>) => {
    const newPersonnel: Personnel = {
      ...personnelData,
      id: Date.now().toString()
    };
    setPersonnel([...personnel, newPersonnel]);
    setIsModalOpen(false);
  };

  const handleEditPersonnel = (personnelData: Omit<Personnel, 'id'>) => {
    if (editingPersonnel) {
      setPersonnel(personnel.map(person => 
        person.id === editingPersonnel.id ? { ...personnelData, id: editingPersonnel.id } : person
      ));
      setEditingPersonnel(null);
      setIsModalOpen(false);
    }
  };

  const handleDeletePersonnel = (id: string) => {
    if (confirm('Are you sure you want to delete this personnel record?')) {
      setPersonnel(personnel.filter(person => person.id !== id));
    }
  };

  const openEditModal = (person: Personnel) => {
    setEditingPersonnel(person);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingPersonnel(null);
  };

  const getStatusBadge = (status: string) => {
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
        status === 'ACTIVE' 
          ? 'bg-green-100 text-green-800' 
          : 'bg-red-100 text-red-800'
      }`}>
        {status}
      </span>
    );
  };

  const getRoleBadge = (role: string) => {
    const colors = {
      ADMIN: 'bg-purple-100 text-purple-800',
      PHARMACIST: 'bg-blue-100 text-blue-800',
      STAFF: 'bg-gray-100 text-gray-800'
    };
    
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${colors[role as keyof typeof colors]}`}>
        {role}
      </span>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Personnel Management</h1>
          <p className="text-gray-600">Manage health center staff and their information</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
        >
          <Plus className="w-5 h-5" />
          <span>Add Personnel</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Staff</p>
              <p className="text-2xl font-bold text-blue-600 mt-2">{personnel.length}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <User className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Staff</p>
              <p className="text-2xl font-bold text-green-600 mt-2">
                {personnel.filter(p => p.status === 'ACTIVE').length}
              </p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <User className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Departments</p>
              <p className="text-2xl font-bold text-purple-600 mt-2">3</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <User className="w-6 h-6 text-purple-600" />
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
                placeholder="Search personnel..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as typeof statusFilter)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="ALL">All Status</option>
              <option value="ACTIVE">Active</option>
              <option value="INACTIVE">Inactive</option>
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
                  Personnel
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Position
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contact
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredPersonnel.map((person) => (
                <tr key={person.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                        <User className="w-5 h-5 text-green-600" />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {person.prenom} {person.nom}
                        </div>
                        <div className="text-sm text-gray-500">
                          Joined {new Date(person.dateEmbauche).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{person.poste}</div>
                    <div className="text-sm text-gray-500">{person.salaire.toLocaleString()} MAD</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2 text-sm text-gray-600 mb-1">
                      <Mail className="w-4 h-4" />
                      <span>{person.email}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <Phone className="w-4 h-4" />
                      <span>{person.telephone}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getRoleBadge(person.role)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(person.status)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => openEditModal(person)}
                        className="text-green-600 hover:text-green-900 transition-colors"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeletePersonnel(person.id)}
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
        title={editingPersonnel ? 'Edit Personnel' : 'Add New Personnel'}
      >
        <PersonnelForm
          initialData={editingPersonnel}
          onSubmit={editingPersonnel ? handleEditPersonnel : handleAddPersonnel}
          onCancel={closeModal}
        />
      </Modal>
    </div>
  );
};

export default Personnel;