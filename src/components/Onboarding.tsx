import { useState } from 'react';
import { UserProfile } from '@/hooks/useAppData';
import { ChevronRight, ChevronLeft, Target, Flame, Dumbbell } from 'lucide-react';

interface OnboardingProps {
  onComplete: (profile: Partial<UserProfile>) => void;
}

const steps = ['Gender', 'Measurements', 'Age', 'Goal'];

const Onboarding = ({ onComplete }: OnboardingProps) => {
  const [step, setStep] = useState(0);
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [weight, setWeight] = useState(75);
  const [height, setHeight] = useState(175);
  const [age, setAge] = useState(25);
  const [goal, setGoal] = useState<'fat_loss' | 'muscle_gain'>('fat_loss');

  const next = () => {
    if (step < steps.length - 1) setStep(step + 1);
    else onComplete({ gender, weight, height, age, goal, onboarded: true });
  };

  const prev = () => {
    if (step > 0) setStep(step - 1);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col safe-top safe-bottom">
      {/* Progress */}
      <div className="px-6 pt-6">
        <div className="flex gap-2 mb-2">
          {steps.map((_, i) => (
            <div
              key={i}
              className={`h-1 flex-1 rounded-full transition-all duration-500 ${
                i <= step ? 'bg-primary' : 'bg-muted'
              }`}
            />
          ))}
        </div>
        <p className="text-muted-foreground text-sm">Step {step + 1} of {steps.length}</p>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col justify-center px-6 animate-slide-up" key={step}>
        {step === 0 && (
          <div>
            <h1 className="font-display text-3xl font-bold mb-2">What's your gender?</h1>
            <p className="text-muted-foreground mb-8">This helps us calculate your metabolism</p>
            <div className="grid grid-cols-2 gap-4">
              {(['male', 'female'] as const).map((g) => (
                <button
                  key={g}
                  onClick={() => setGender(g)}
                  className={`card-surface haptic-press p-6 text-center transition-all ${
                    gender === g ? 'border-primary neon-glow' : ''
                  }`}
                >
                  <div className="text-4xl mb-3">{g === 'male' ? '♂' : '♀'}</div>
                  <span className="font-display font-semibold capitalize text-lg">{g}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 1 && (
          <div>
            <h1 className="font-display text-3xl font-bold mb-2">Your measurements</h1>
            <p className="text-muted-foreground mb-8">We'll use this for calorie calculations</p>
            <div className="space-y-6">
              <div className="card-surface p-5">
                <label className="text-muted-foreground text-sm mb-3 block">Weight (kg)</label>
                <div className="flex items-center gap-4">
                  <button onClick={() => setWeight(Math.max(40, weight - 1))} className="haptic-press w-12 h-12 rounded-full bg-muted flex items-center justify-center text-xl font-bold">−</button>
                  <span className="flex-1 text-center font-display text-4xl font-bold neon-text">{weight}</span>
                  <button onClick={() => setWeight(Math.min(200, weight + 1))} className="haptic-press w-12 h-12 rounded-full bg-muted flex items-center justify-center text-xl font-bold">+</button>
                </div>
              </div>
              <div className="card-surface p-5">
                <label className="text-muted-foreground text-sm mb-3 block">Height (cm)</label>
                <div className="flex items-center gap-4">
                  <button onClick={() => setHeight(Math.max(140, height - 1))} className="haptic-press w-12 h-12 rounded-full bg-muted flex items-center justify-center text-xl font-bold">−</button>
                  <span className="flex-1 text-center font-display text-4xl font-bold neon-text">{height}</span>
                  <button onClick={() => setHeight(Math.min(220, height + 1))} className="haptic-press w-12 h-12 rounded-full bg-muted flex items-center justify-center text-xl font-bold">+</button>
                </div>
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div>
            <h1 className="font-display text-3xl font-bold mb-2">How old are you?</h1>
            <p className="text-muted-foreground mb-8">Age affects your metabolic rate</p>
            <div className="card-surface p-6">
              <div className="flex items-center gap-4">
                <button onClick={() => setAge(Math.max(16, age - 1))} className="haptic-press w-14 h-14 rounded-full bg-muted flex items-center justify-center text-2xl font-bold">−</button>
                <span className="flex-1 text-center font-display text-6xl font-bold neon-text">{age}</span>
                <button onClick={() => setAge(Math.min(80, age + 1))} className="haptic-press w-14 h-14 rounded-full bg-muted flex items-center justify-center text-2xl font-bold">+</button>
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div>
            <h1 className="font-display text-3xl font-bold mb-2">What's your goal?</h1>
            <p className="text-muted-foreground mb-8">We'll tailor your nutrition plan</p>
            <div className="space-y-4">
              <button
                onClick={() => setGoal('fat_loss')}
                className={`w-full card-surface haptic-press p-5 flex items-center gap-4 transition-all ${
                  goal === 'fat_loss' ? 'border-primary neon-glow' : ''
                }`}
              >
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center">
                  <Flame className="w-7 h-7 text-primary" />
                </div>
                <div className="text-left">
                  <div className="font-display font-semibold text-lg">Fat Loss</div>
                  <div className="text-muted-foreground text-sm">Calorie deficit for lean results</div>
                </div>
              </button>
              <button
                onClick={() => setGoal('muscle_gain')}
                className={`w-full card-surface haptic-press p-5 flex items-center gap-4 transition-all ${
                  goal === 'muscle_gain' ? 'border-primary neon-glow' : ''
                }`}
              >
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center">
                  <Dumbbell className="w-7 h-7 text-primary" />
                </div>
                <div className="text-left">
                  <div className="font-display font-semibold text-lg">Muscle Gain</div>
                  <div className="text-muted-foreground text-sm">Calorie surplus for growth</div>
                </div>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="px-6 pb-8 flex gap-3">
        {step > 0 && (
          <button
            onClick={prev}
            className="haptic-press touch-target w-14 h-14 rounded-2xl bg-muted flex items-center justify-center"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
        )}
        <button
          onClick={next}
          className="haptic-press touch-target flex-1 h-14 rounded-2xl bg-primary text-primary-foreground font-display font-semibold text-lg flex items-center justify-center gap-2"
        >
          {step === steps.length - 1 ? 'Start My Journey' : 'Continue'}
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default Onboarding;
