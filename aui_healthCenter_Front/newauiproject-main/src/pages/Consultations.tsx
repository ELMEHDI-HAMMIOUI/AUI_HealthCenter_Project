import React, { useState } from 'react';
import { Plus, Search, Filter, Calendar, User, FileText, Pill, Clock, Eye, Edit, Trash2 } from 'lucide-react';
import Modal from '../components/Modal';
import ConsultationForm from '../components/ConsultationForm';
import { useAuth } from '../context/AuthContext';

interface Patient {
  id: string;
  studentId: string;
  name: string;
  email: string;
  phone: string;
  allergies: string;
  conditions: string;
}

interface Medicine {
  id: string;
  name: string;
  dosage: string;
  form: string;
  stockLevel: number;
}

interface PrescriptionItem {
  medicineId: string;
  medicineName: string;
  dosage: string;
  frequency: string;
  duration: string;
  instructions: string;
}

interface Consultation {
  id: string;
  patientId: string;
  patientName: string;
  patientStudentId: string;
  doctorName: string;
  consultationDate: string;
  consultationTime: string;
  notes: string;
  prescriptionItems: PrescriptionItem[];
  status: 'COMPLETED' | 'PENDING' | 'FOLLOW_UP';
  createdAt: string;
  updatedAt: string;
}

const Consultations = () => {
  const { user } = useAuth();
  const [consultations, setConsultations] = useState<Consultation[]>([
    {
      id: '1',
      patientId: 'P001',
      patientName: 'Omar Benali',
      patientStudentId: 'STU001',
      doctorName: 'Dr. Fatima Alaoui',
      consultationDate: '2024-01-20',
      consultationTime: '10:30',
      notes: 'Patient presented with severe headache and fever. Symptoms started 3 days ago. No signs of complications. Prescribed paracetamol for symptom relief.',
      prescriptionItems: [
        {
          medicineId: '1',
          medicineName: 'Paracetamol 500mg',
          dosage: '500mg',
          frequency: '3 times daily',
          duration: '7 days',
          instructions: 'Take with food. Do not exceed 4g per day.'
        }
      ],
      status: 'COMPLETED',
      createdAt: '2024-01-20T10:30:00Z',
      updatedAt: '2024-01-20T10:45:00Z'
    },
    {
      id: '2',
      patientId: 'P002',
      patientName: 'Sara Amrani',
      patientStudentId: 'STU002',
      doctorName: 'Dr. Ahmed Bennani',
      consultationDate: '2024-01-19',
      consultationTime: '14:15',
      notes: 'Follow-up consultation for back pain. Patient reports improvement with previous treatment. Continue with current medication and add physiotherapy recommendations.',
      prescriptionItems: [
        {
          medicineId: '2',
          medicineName: 'Ibuprofen 400mg',
          dosage: '400mg',
          frequency: '2 times daily',
          duration: '10 days',
          instructions: 'Take after meals. Avoid if stomach upset occurs.'
        }
      ],
      status: 'FOLLOW_UP',
      createdAt: '2024-01-19T14:15:00Z',
      updatedAt: '2024-01-19T14:30:00Z'
    },
    {
      id: '3',
      patientId: 'P003',
      patientName: 'Youssef Idrissi',
      patientStudentId: 'STU003',
      doctorName: 'Dr. Fatima Alaoui',
      consultationDate: '2024-01-18',
      consultationTime: '09:00',
      notes: 'Initial consultation for allergic reaction. Patient allergic to aspirin. Prescribed alternative pain relief. Advised to update medical records.',
      prescriptionItems: [
        {
          medicineId: '1',
          medicineName: 'Paracetamol 500mg',
          dosage: '500mg',
          frequency: 'As needed',
          duration: '5 days',
          instructions: 'Maximum 4 times per day. Safe alternative to aspirin.'
        }
      ],
      status: 'COMPLETED',
      createdAt: '2024-01-18T09:00:00Z',
      updatedAt: '2024-01-18T09:20:00Z'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'COMPLETED' | 'PENDING' | 'FOLLOW_UP'>('ALL');
  const [dateFilter, setDateFilter] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingConsultation, setEditingConsultation] = useState<Consultation | null>(null);
  const [selectedConsultation, setSelectedConsultation] = useState<Consultation | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);

  // Mock data for patients and medicines
  const patients: Patient[] = [
    {
      id: 'P001',
      studentId: 'STU001',
      name: 'Omar Benali',
      email: 'omar.benali@aui.ma',
      phone: '+212 6 12 34 56 78',
      allergies: 'Penicillin',
      conditions: 'None'
    },
    {
      id: 'P002',
      studentId: 'STU002',
      name: 'Sara Amrani',
      email: 'sara.amrani@aui.ma',
      phone: '+212 6 98 76 54 32',
      allergies: 'None',
      conditions: 'Asthma'
    },
    {
      id: 'P003',
      studentId: 'STU003',
      name: 'Youssef Idrissi',
      email: 'youssef.idrissi@aui.ma',
      phone: '+212 6 55 44 33 22',
      allergies: 'Aspirin',
      conditions: 'None'
    }
  ];

  const medicines: Medicine[] = [
    { id: '1', name: 'Paracetamol 500mg', dosage: '500mg', form: 'Tablet', stockLevel: 150 },
    { id: '2', name: 'Ibuprofen 400mg', dosage: '400mg', form: 'Tablet', stockLevel: 75 },
    { id: '3', name: 'Amoxicillin 250mg', dosage: '250mg', form: 'Capsule', stockLevel: 80 },
    { id: '4', name: 'Aspirin 325mg', dosage: '325mg', form: 'Tablet', stockLevel: 120 },
    { id: '5', name: 'Omeprazole 20mg', dosage: '20mg', form: 'Capsule', stockLevel: 60 }
  ];

  const filteredConsultations = consultations.filter(consultation => {
    const matchesSearch = consultation.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         consultation.patientStudentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         consultation.doctorName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'ALL' || consultation.status === statusFilter;
    const matchesDate = !dateFilter || consultation.consultationDate === dateFilter;
    return matchesSearch && matchesStatus && matchesDate;
  });

  const handleAddConsultation = (consultationData: Omit<Consultation, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newConsultation: Consultation = {
      ...consultationData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    setConsultations([newConsultation, ...consultations]);
    setIsModalOpen(false);
  };

  const handleEditConsultation = (consultationData: Omit<Consultation, 'id' | 'createdAt' | 'updatedAt'>) => {
    if (editingConsultation) {
      setConsultations(consultations.map(consultation => 
        consultation.id === editingConsultation.id 
          ? { 
              ...consultationData, 
              id: editingConsultation.id,
              createdAt: editingConsultation.createdAt,
              updatedAt: new Date().toISOString()
            }
          : consultation
      ));
      setEditingConsultation(null);
      setIsModalOpen(false);
    }
  };

  const handleDeleteConsultation = (id: string) => {
    if (confirm('Are you sure you want to delete this consultation?')) {
      setConsultations(consultations.filter(consultation => consultation.id !== id));
    }
  };

  const openEditModal = (consultation: Consultation) => {
    setEditingConsultation(consultation);
    setIsModalOpen(true);
  };

  const openViewModal = (consultation: Consultation) => {
    setSelectedConsultation(consultation);
    setIsViewModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingConsultation(null);
  };

  const closeViewModal = () => {
    setIsViewModalOpen(false);
    setSelectedConsultation(null);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'COMPLETED':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            <FileText className="w-3 h-3 mr-1" />
            Completed
          </span>
        );
      case 'PENDING':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
            <Clock className="w-3 h-3 mr-1" />
            Pending
          </span>
        );
      case 'FOLLOW_UP':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            <Calendar className="w-3 h-3 mr-1" />
            Follow-up
          </span>
        );
      default:
        return null;
    }
  };

  const getStatusCounts = () => {
    const completed = consultations.filter(c => c.status === 'COMPLETED').length;
    const pending = consultations.filter(c => c.status === 'PENDING').length;
    const followUp = consultations.filter(c => c.status === 'FOLLOW_UP').length;
    return { completed, pending, followUp, total: consultations.length };
  };

  const statusCounts = getStatusCounts();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Doctor Consultations</h1>
          <p className="text-gray-600">Manage patient consultations and prescriptions</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
        >
          <Plus className="w-5 h-5" />
          <span>New Consultation</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Consultations</p>
              <p className="text-2xl font-bold text-blue-600 mt-2">{statusCounts.total}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <FileText className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Completed</p>
              <p className="text-2xl font-bold text-green-600 mt-2">{statusCounts.completed}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <FileText className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Pending</p>
              <p className="text-2xl font-bold text-yellow-600 mt-2">{statusCounts.pending}</p>
            </div>
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <Clock className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Follow-up</p>
              <p className="text-2xl font-bold text-purple-600 mt-2">{statusCounts.followUp}</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <Calendar className="w-6 h-6 text-purple-600" />
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
                placeholder="Search by patient name, student ID, or doctor..."
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
              <option value="COMPLETED">Completed</option>
              <option value="PENDING">Pending</option>
              <option value="FOLLOW_UP">Follow-up</option>
            </select>
            <input
              type="date"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
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
                  Patient
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Doctor
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date & Time
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Prescriptions
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
              {filteredConsultations.map((consultation) => (
                <tr key={consultation.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                        <User className="w-5 h-5 text-green-600" />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{consultation.patientName}</div>
                        <div className="text-sm text-gray-500">{consultation.patientStudentId}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{consultation.doctorName}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {new Date(consultation.consultationDate).toLocaleDateString()}
                    </div>
                    <div className="text-sm text-gray-500">{consultation.consultationTime}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-1">
                      <Pill className="w-4 h-4 text-green-600" />
                      <span className="text-sm text-gray-900">
                        {consultation.prescriptionItems.length} item(s)
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(consultation.status)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => openViewModal(consultation)}
                        className="text-blue-600 hover:text-blue-900 transition-colors"
                        title="View Details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => openEditModal(consultation)}
                        className="text-green-600 hover:text-green-900 transition-colors"
                        title="Edit"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteConsultation(consultation.id)}
                        className="text-red-600 hover:text-red-900 transition-colors"
                        title="Delete"
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

        {filteredConsultations.length === 0 && (
          <div className="p-12 text-center">
            <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No consultations found</h3>
            <p className="text-gray-600 mb-4">Try adjusting your search criteria or add a new consultation.</p>
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
            >
              New Consultation
            </button>
          </div>
        )}
      </div>

      {/* Add/Edit Consultation Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={editingConsultation ? 'Edit Consultation' : 'New Consultation'}
      >
        <ConsultationForm
          initialData={editingConsultation}
          patients={patients}
          medicines={medicines}
          currentUser={user}
          onSubmit={editingConsultation ? handleEditConsultation : handleAddConsultation}
          onCancel={closeModal}
        />
      </Modal>

      {/* View Consultation Modal */}
      <Modal
        isOpen={isViewModalOpen}
        onClose={closeViewModal}
        title="Consultation Details"
      >
        {selectedConsultation && (
          <div className="space-y-6">
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Patient Information</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium text-gray-700">Name:</span>
                  <p className="text-gray-900">{selectedConsultation.patientName}</p>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Student ID:</span>
                  <p className="text-gray-900">{selectedConsultation.patientStudentId}</p>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Consultation Details</h3>
              <div className="space-y-3 text-sm">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="font-medium text-gray-700">Doctor:</span>
                    <p className="text-gray-900">{selectedConsultation.doctorName}</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Date & Time:</span>
                    <p className="text-gray-900">
                      {new Date(selectedConsultation.consultationDate).toLocaleDateString()} at {selectedConsultation.consultationTime}
                    </p>
                  </div>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Notes:</span>
                  <p className="text-gray-900 mt-1">{selectedConsultation.notes}</p>
                </div>
              </div>
            </div>

            <div className="bg-green-50 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Prescriptions</h3>
              <div className="space-y-3">
                {selectedConsultation.prescriptionItems.map((item, index) => (
                  <div key={index} className="border border-green-200 rounded-lg p-3 bg-white">
                    <div className="flex items-center space-x-2 mb-2">
                      <Pill className="w-4 h-4 text-green-600" />
                      <span className="font-medium text-gray-900">{item.medicineName}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">Dosage:</span>
                        <span className="ml-2 text-gray-900">{item.dosage}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Frequency:</span>
                        <span className="ml-2 text-gray-900">{item.frequency}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Duration:</span>
                        <span className="ml-2 text-gray-900">{item.duration}</span>
                      </div>
                    </div>
                    {item.instructions && (
                      <div className="mt-2 text-sm">
                        <span className="text-gray-600">Instructions:</span>
                        <p className="text-gray-900 mt-1">{item.instructions}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-end pt-4 border-t border-gray-200">
              <button
                onClick={closeViewModal}
                className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Consultations;