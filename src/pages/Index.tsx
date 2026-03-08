import { useState } from 'react';
import { useAppData, getTodayStr } from '@/hooks/useAppData';
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
    resetData,
  } = useAppData();
  const [activeTab, setActiveTab] = useState('home');
  const [selectedDate, setSelectedDate] = useState(getTodayStr());

  if (!data.profile.onboarded) {
    return <Onboarding onComplete={(profile) => updateProfile(profile)} />;
  }

  const currentLog = getDailyLog(selectedDate);

  return (
    <div className="min-h-screen bg-background max-w-lg mx-auto relative overflow-x-hidden">
      <div className="min-h-screen">
        {activeTab === 'home' && (
          <HomePage
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
            profile={data.profile}
            weightHistory={data.weightHistory}
            onAddWeight={addWeight}
            onUpdateProfile={updateProfile}
            onReset={resetData}
          />
        )}
      </div>
      <BottomNav active={activeTab} onNavigate={setActiveTab} />
    </div>
  );
};

export default Index;
