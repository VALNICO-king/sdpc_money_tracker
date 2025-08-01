
import React, { useState, useMemo, useCallback } from 'react';
import { Contribution, Activity } from './types';
import Header from './components/Header';
import ContributionGraph from './components/ContributionGraph';
import Calendar from './components/Calendar';
import ContributionList from './components/ContributionList';
import ContributionForm from './components/ContributionForm';

const getTodayString = () => {
  const today = new Date();
  return today.toISOString().split('T')[0]; // YYYY-MM-DD
};

// Initial Data
const initialContributions: Contribution[] = [
  { id: '1', name: 'Alice', amount: 5000 },
  { id: '2', name: 'Bob', amount: 2500 },
  { id: '3', name: 'Charlie', amount: 7500 },
  { id: '4', name: 'Diana', amount: 3000 },
];

const initialActivities: Activity[] = [
  { id: 'a1', date: getTodayString(), description: 'Team sync-up call' },
  { id: 'a2', date: getTodayString(), description: 'Submit Q3 report' },
  { id: 'a3', date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], description: 'Project kickoff' },
];

const App: React.FC = () => {
  const [contributions, setContributions] = useState<Contribution[]>(initialContributions);
  const [activities, setActivities] = useState<Activity[]>(initialActivities);

  const addContribution = useCallback((name: string, amount: number) => {
    const newContribution: Contribution = {
      id: crypto.randomUUID(),
      name,
      amount,
    };
    setContributions(prev => [...prev, newContribution]);
  }, []);

  const deleteContribution = useCallback((id: string) => {
    setContributions(prev => prev.filter(c => c.id !== id));
  }, []);

  const addActivity = useCallback((date: string, description: string) => {
    const newActivity: Activity = {
      id: crypto.randomUUID(),
      date,
      description,
    };
    setActivities(prev => [...prev, newActivity]);
  }, []);

  const deleteActivity = useCallback((id: string) => {
    setActivities(prev => prev.filter(a => a.id !== id));
  }, []);

  const sortedContributions = useMemo(() => {
    return [...contributions].sort((a, b) => b.amount - a.amount);
  }, [contributions]);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      <Header />
      <main className="container mx-auto p-4 sm:p-6 lg:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 mb-8">
          <div className="lg:col-span-3">
            <ContributionGraph data={sortedContributions} />
          </div>
          <div className="lg:col-span-2">
            <Calendar activities={activities} onAddActivity={addActivity} onDeleteActivity={deleteActivity} />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            <div className="md:col-span-2">
              <h2 className="text-2xl font-semibold mb-4 text-gray-700 dark:text-gray-300">Add New Contribution</h2>
              <ContributionForm onAddContribution={addContribution} />
            </div>
            <div className="md:col-span-3">
              <h2 className="text-2xl font-semibold mb-4 text-gray-700 dark:text-gray-300">Contributor Rankings</h2>
              <ContributionList contributions={sortedContributions} onDeleteContribution={deleteContribution} />
            </div>
        </div>
      </main>
    </div>
  );
};

export default App;
