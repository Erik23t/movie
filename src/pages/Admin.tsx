
import React, { useState, useEffect } from 'react';
import AdminLogin from '@/components/AdminLogin';
import AdminDashboard from '@/components/AdminDashboard';

const Admin = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Verificar se o administrador já está logado
    const adminLoggedIn = localStorage.getItem('adminLoggedIn');
    if (adminLoggedIn === 'true') {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  if (!isLoggedIn) {
    return <AdminLogin onLoginSuccess={handleLoginSuccess} />;
  }

  return <AdminDashboard />;
};

export default Admin;
