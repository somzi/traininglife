import { useState } from 'react';
import { useAppData, getTodayStr } from '@/hooks/useAppData';
import AuthScreen from '@/components/AuthScreen';
import Onboarding from '@/components/Onboarding';
import BottomNav from '@/components/BottomNav';
import HomePage from '@/pages/HomePage';
import WorkoutPage from '@/pages/WorkoutPage';
import MealsPage from '@/pages/MealsPage';
import ProfilePage from '@/pages/ProfilePage';

const Index = () => {
  const {
    data,
    getDailyLog,
    updateProfile,
    addMealEntry,
    updateMealEntry,
    addWeight,
    scheduleWorkout,
    deleteWorkout,
    updateScheduledWorkout,
    logExercise,
    resetData,
  } = useAppData();

  const [activeTab, setActiveTab] = useState('home');
  const [selectedDate, setSelectedDate] = useState(getTodayStr());
  const [isLoggedIn, setIsLoggedIn] = useState(() => localStorage.getItem('fitcoach_user') !== null);
  const [userName, setUserName] = useState(() => localStorage.getItem('fitcoach_user') || '');
  const [needsOnboarding, setNeedsOnboarding] = useState(false);

  const handleLogin = (name: string) => {
    localStorage.setItem('fitcoach_user', name);
    setUserName(name);
    setIsLoggedIn(true);
  };

  const handleSignUp = () => {
    setNeedsOnboarding(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('fitcoach_user');
    setIsLoggedIn(false);
    setUserName('');
  };

  if (!isLoggedIn) {
    return <AuthScreen onLogin={handleLogin} onSignUp={handleSignUp} />;
  }

  if (needsOnboarding || !data.profile.onboarded) {
    return (
      <Onboarding
        onComplete={(profile) => {
          updateProfile(profile);
          setNeedsOnboarding(false);
        }}
      />
    );
  }

  const currentLog = getDailyLog(selectedDate);

  return (
    <div className="min-h-screen bg-background max-w-lg mx-auto relative overflow-x-hidden">
      <div className="min-h-screen">
        {activeTab === 'home' && (
          <HomePage
            userName={userName}
            profile={data.profile}
            selectedDate={selectedDate}
            onSelectDate={setSelectedDate}
            dayLog={currentLog}
            calorieHistory={data.calorieHistory}
            weightHistory={data.weightHistory}
          />
        )}
        {activeTab === 'workout' && (
          <WorkoutPage
            selectedDate={selectedDate}
            onSelectDate={setSelectedDate}
            scheduledWorkouts={data.scheduledWorkouts}
            onScheduleWorkout={scheduleWorkout}
            onDeleteWorkout={deleteWorkout}
            onUpdateWorkout={updateScheduledWorkout}
            exerciseLogs={data.exerciseLogs}
            onLogExercise={logExercise}
          />
        )}
        {activeTab === 'meals' && (
          <MealsPage
            profile={data.profile}
            selectedDate={selectedDate}
            onSelectDate={setSelectedDate}
            dayLog={currentLog}
            onAddMeal={(entry) => addMealEntry(selectedDate, entry)}
            onUpdateMeal={(entryId, updates) => updateMealEntry(selectedDate, entryId, updates)}
          />
        )}
        {activeTab === 'profile' && (
          <ProfilePage
            userName={userName}
            profile={data.profile}
            weightHistory={data.weightHistory}
            exerciseLogs={data.exerciseLogs}
            onAddWeight={addWeight}
            onUpdateProfile={updateProfile}
            onLogout={handleLogout}
            onReset={resetData}
          />
        )}
      </div>
      <BottomNav active={activeTab} onNavigate={setActiveTab} />
    </div>
  );
};

export default Index;
