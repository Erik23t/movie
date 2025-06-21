
import React from 'react';
import MembersArea from '@/components/MembersArea';
import Footer from '@/components/Footer';
import SubscriptionNotifications from '@/components/SubscriptionNotifications';

const Index = () => {
  return (
    <div className="min-h-screen bg-black">
      <MembersArea />
      <Footer />
      <SubscriptionNotifications />
    </div>
  );
};

export default Index;
