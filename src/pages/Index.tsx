import { useState } from 'react';
import { useAppData } from '@/hooks/useAppData';
import Onboarding from '@/components/Onboarding';
import BottomNav from '@/components/BottomNav';
import HomePage from '@/pages/HomePage';
import WorkoutPage from '@/pages/WorkoutPage';
import MealsPage from '@/pages/MealsPage';
import ProfilePage from '@/pages/ProfilePage';

const Index = () => {
  const { data, updateProfile, addCalories, toggleExercise, addWeight, resetData } = useAppData();
  const [activeTab, setActiveTab] = useState('home');

  if (!data.profile.onboarded) {
    return <Onboarding onComplete={(profile) => updateProfile(profile)} />;
  }

  return (
    <div className="min-h-screen bg-background max-w-lg mx-auto relative overflow-x-hidden">
      <div className="min-h-screen">
        {activeTab === 'home' && (
          <HomePage profile={data.profile} todayLog={data.todayLog} />
        )}
        {activeTab === 'workout' && (
          <WorkoutPage todayLog={data.todayLog} onToggleExercise={toggleExercise} />
        )}
        {activeTab === 'meals' && (
          <MealsPage onQuickAdd={addCalories} />
        )}
        {activeTab === 'profile' && (
          <ProfilePage
            profile={data.profile}
            weightHistory={data.weightHistory}
            onAddWeight={addWeight}
            onReset={resetData}
          />
        )}
      </div>
      <BottomNav active={activeTab} onNavigate={setActiveTab} />
    </div>
  );
};

export default Index;
