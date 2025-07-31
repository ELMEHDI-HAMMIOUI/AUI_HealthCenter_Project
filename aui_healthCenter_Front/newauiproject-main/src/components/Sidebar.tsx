import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Pill, 
  Package, 
  Users, 
  Truck, 
  BarChart3, 
  UserCog,
  GraduationCap,
  Heart,
  Stethoscope
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Sidebar = () => {
  const { user } = useAuth();
  const isStudent = user?.role === 'STUDENT';

  const adminNavItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
    { icon: Stethoscope, label: 'Consultations', path: '/consultations' },
    { icon: Pill, label: 'Medicines', path: '/medicines' },
    { icon: Package, label: 'Stock Management', path: '/stock' },
    { icon: Users, label: 'Students', path: '/students' },
    { icon: Truck, label: 'Suppliers', path: '/suppliers' },
    { icon: BarChart3, label: 'Reports', path: '/reports' },
    { icon: UserCog, label: 'Personnel', path: '/personnel' },
  ];

  const studentNavItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
    { icon: Heart, label: 'My Prescriptions', path: '/student-portal' },
  ];

  const navItems = isStudent ? studentNavItems : adminNavItems;

  return (
    <div className="w-64 bg-white shadow-lg">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
            <GraduationCap className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-800">AUI Health</h1>
            <p className="text-sm text-gray-500">Center</p>
          </div>
        </div>
      </div>
      
      <nav className="mt-6">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center px-6 py-3 text-gray-700 hover:bg-green-50 hover:text-green-600 transition-colors duration-200 ${
                isActive ? 'bg-green-50 text-green-600 border-r-2 border-green-600' : ''
              }`
            }
          >
            <item.icon className="w-5 h-5 mr-3" />
            {item.label}
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;