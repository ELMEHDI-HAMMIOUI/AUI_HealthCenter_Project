import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Search, Filter, Eye, UserPlus, Users } from 'lucide-react';
import { Patient, PatientFormData, PatientType } from '../types/patient';
import PatientForm from '../components/PatientForm';

const Patients: React.FC = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [filteredPatients, setFilteredPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingPatient, setEditingPatient] = useState<Patient | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<PatientType | 'ALL'>('ALL');
  const [filterSex, setFilterSex] = useState<string>('ALL');

  useEffect(() => {
    console.log('Patients component mounted, fetching patients...');
    fetchPatients();
  }, []);

  useEffect(() => {
    filterPatients();
  }, [patients, searchTerm, filterType, filterSex]);

  const fetchPatients = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/patients');
      
      if (response.ok) {
        const rawData = await response.json();
        console.log('Raw API response:', JSON.stringify(rawData, null, 2));
        
        // Map the data to ensure field compatibility and handle potential mismatches
        const mappedData = rawData.map((patient: any, index: number) => {
          console.log(`Mapping patient ${index}:`, patient);
          
          // Log all available fields to debug
          console.log(`Available fields for patient ${index}:`, Object.keys(patient));
          
          // Check for required fields
          if (!patient.nom || !patient.prenom || !patient.cne) {
            console.warn(`Patient ${index} missing required fields:`, patient);
            console.warn(`Field values - nom: "${patient.nom}", prenom: "${patient.prenom}", cne: "${patient.cne}"`);
          }
          
          return {
            id: patient.id,
            nom: patient.nom || '',
            prenom: patient.prenom || '',
            cne: patient.cne || '',
            dateNaissance: patient.dateNaissance || '',
            sexe: patient.sexe || '',
            telephone: patient.telephone || '',
            email: patient.email || '',
            departement: patient.departement || null,
            typePatient: patient.typePatient || null
          };
        });
        
        setPatients(mappedData);
        setError(''); // Clear any previous errors
        console.log('Patients mapped and set successfully:', mappedData);
      } else {
        const errorText = await response.text();
        console.error('HTTP Error:', response.status, errorText);
        throw new Error(`HTTP ${response.status}: ${errorText || 'Failed to fetch patients'}`);
      }
    } catch (error) {
      console.error('Fetch error details:', error);
      
      let errorMessage = 'Erreur lors du chargement des patients';
      
      if (error instanceof TypeError && error.message.includes('fetch')) {
        errorMessage = 'Erreur de connexion au serveur. Vérifiez que le serveur backend est démarré sur http://localhost:8080';
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }
      
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const filterPatients = () => {
    let filtered = [...patients];

    if (searchTerm) {
      filtered = filtered.filter(patient =>
        patient.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
        patient.prenom.toLowerCase().includes(searchTerm.toLowerCase()) ||
        patient.cne.toLowerCase().includes(searchTerm.toLowerCase()) ||
        patient.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        patient.telephone.includes(searchTerm)
      );
    }

    if (filterType !== 'ALL') {
      filtered = filtered.filter(patient => patient.typePatient === filterType);
    }

    if (filterSex !== 'ALL') {
      filtered = filtered.filter(patient => patient.sexe === filterSex);
    }

    setFilteredPatients(filtered);
  };

  const handleCreate = async (data: PatientFormData) => {
    try {
      const response = await fetch('/api/patients', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const newPatient = await response.json();
        setPatients(prev => [...prev, newPatient]);
        setShowForm(false);
        setError('');
      } else {
        throw new Error('Failed to create patient');
      }
    } catch (error) {
      setError('Erreur lors de la création du patient');
      console.error('Error creating patient:', error);
    }
  };

  const handleUpdate = async (data: PatientFormData) => {
    if (!editingPatient?.id) return;

    try {
      const response = await fetch(`/api/patients/${editingPatient.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const updatedPatient = await response.json();
        setPatients(prev => prev.map(p => p.id === editingPatient.id ? updatedPatient : p));
        setEditingPatient(null);
        setShowForm(false);
        setError('');
      } else {
        throw new Error('Failed to update patient');
      }
    } catch (error) {
      setError('Erreur lors de la modification du patient');
      console.error('Error updating patient:', error);
    }
  };

  const handleDelete = async (patientId: number) => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer ce patient ?')) {
      return;
    }

    try {
      const response = await fetch(`/api/patients/${patientId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setPatients(prev => prev.filter(p => p.id !== patientId));
        setError('');
      } else {
        throw new Error('Failed to delete patient');
      }
    } catch (error) {
      setError('Erreur lors de la suppression du patient');
      console.error('Error deleting patient:', error);
    }
  };

  const handleEdit = (patient: Patient) => {
    setEditingPatient(patient);
    setShowForm(true);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingPatient(null);
  };

  const getPatientTypeLabel = (type: PatientType | null): string => {
    if (!type) return 'Non défini';
    switch (type) {
      case PatientType.STUDENT: return 'Étudiant';
      case PatientType.STAFF: return 'Personnel';
      case PatientType.GUEST: return 'Invité';
      case PatientType.AUTHER: return 'Autre';
      default: return type;
    }
  };

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString('fr-FR');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
            <Users className="text-blue-600" size={32} />
            Gestion des Patients
          </h1>
          <p className="text-gray-600 mt-2">Gérez les informations des patients de votre centre de santé</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center gap-2"
        >
          <UserPlus size={20} />
          Ajouter un patient
        </button>
      </div>

      {/* Error Display */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          <div className="flex flex-col space-y-2">
            <div className="flex justify-between items-center">
              <span className="font-medium">{error}</span>
              <button
                onClick={fetchPatients}
                className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700 transition-colors"
              >
                Réessayer
              </button>
            </div>
            {error.includes('connexion au serveur') && (
              <div className="text-sm text-red-600 bg-red-50 p-2 rounded">
                <strong>Solution:</strong> Assurez-vous que votre serveur backend est démarré sur le port 8080 et que l'endpoint <code className="bg-red-100 px-1 rounded">/api/patients</code> est accessible.
              </div>
            )}
          </div>
        </div>
      )}

      {/* Search and Filters */}
      <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Rechercher un patient..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Type Filter */}
          <div>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value as PatientType | 'ALL')}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="ALL">Tous les types</option>
              <option value={PatientType.STUDENT}>Étudiants</option>
              <option value={PatientType.STAFF}>Personnel</option>
              <option value={PatientType.GUEST}>Invités</option>
              <option value={PatientType.AUTHER}>Autres</option>
            </select>
          </div>

          {/* Sex Filter */}
          <div>
            <select
              value={filterSex}
              onChange={(e) => setFilterSex(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="ALL">Tous les sexes</option>
              <option value="Homme">Hommes</option>
              <option value="Femme">Femmes</option>
            </select>
          </div>

          {/* Results Count */}
          <div className="flex items-center justify-end text-gray-600">
            <Filter className="mr-2" size={20} />
            {filteredPatients.length} patient(s) trouvé(s)
          </div>
        </div>
      </div>

      {/* Patients Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Patient
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  CNE
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contact
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Département
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredPatients.map((patient) => (
                <tr key={patient.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                          <span className="text-blue-600 font-medium text-sm">
                            {patient.nom.charAt(0)}{patient.prenom.charAt(0)}
                          </span>
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {patient.prenom} {patient.nom}
                        </div>
                        <div className="text-sm text-gray-500">
                          {formatDate(patient.dateNaissance)} • {patient.sexe}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 font-mono">{patient.cne}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      patient.typePatient === PatientType.STUDENT ? 'bg-green-100 text-green-800' :
                      patient.typePatient === PatientType.STAFF ? 'bg-blue-100 text-blue-800' :
                      patient.typePatient === PatientType.GUEST ? 'bg-yellow-100 text-yellow-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {getPatientTypeLabel(patient.typePatient)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{patient.telephone}</div>
                    <div className="text-sm text-gray-500">{patient.email}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {patient.departement || '-'}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEdit(patient)}
                        className="text-blue-600 hover:text-blue-900 p-1 rounded hover:bg-blue-50"
                        title="Modifier"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(patient.id!)}
                        className="text-red-600 hover:text-red-900 p-1 rounded hover:bg-red-50"
                        title="Supprimer"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredPatients.length === 0 && (
          <div className="text-center py-12">
            <Users className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">Aucun patient trouvé</h3>
            <p className="mt-1 text-sm text-gray-500">
              {searchTerm || filterType !== 'ALL' || filterSex !== 'ALL'
                ? 'Essayez de modifier vos critères de recherche.'
                : 'Commencez par ajouter votre premier patient.'}
            </p>
          </div>
        )}
      </div>

      {/* Patient Form Modal */}
      {showForm && (
        <PatientForm
          patient={editingPatient}
          onSubmit={editingPatient ? handleUpdate : handleCreate}
          onCancel={handleCancel}
        />
      )}
    </div>
  );
};

export default Patients;
