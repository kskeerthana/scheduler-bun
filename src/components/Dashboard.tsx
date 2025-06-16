
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import TaskCard from './TaskCard';
import TaskModal from './TaskModal';
import ReminderModal from './ReminderModal';
import { useTask } from '../contexts/TaskContext';
import { Task } from '../types';

const Dashboard = () => {
  const { tasks, updateTask } = useTask();
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [isReminderModalOpen, setIsReminderModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const handleSetReminder = (task: Task) => {
    setSelectedTask(task);
    setIsReminderModalOpen(true);
  };

  const handleToggleComplete = (taskId: string) => {
    const task = tasks.find(t => t.id === taskId);
    if (task) {
      updateTask(taskId, { completed: !task.completed });
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
        <p className="text-gray-600">Manage your tasks and stay organized</p>
      </div>

      <div className="space-y-4">
        {tasks.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📝</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No tasks yet</h3>
            <p className="text-gray-600 mb-6">Create your first task to get started with your personal scheduler</p>
            <Button 
              onClick={() => setIsTaskModalOpen(true)}
              className="bg-primary hover:bg-primary/90"
            >
              + Add Your First Task
            </Button>
          </div>
        ) : (
          tasks.map(task => (
            <TaskCard
              key={task.id}
              task={task}
              onSetReminder={handleSetReminder}
              onToggleComplete={handleToggleComplete}
            />
          ))
        )}
      </div>

      {/* Floating Add Task Button */}
      {tasks.length > 0 && (
        <Button
          onClick={() => setIsTaskModalOpen(true)}
          className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-primary hover:bg-primary/90 shadow-lg transition-all duration-200 hover:scale-110"
        >
          <span className="text-2xl text-white">+</span>
        </Button>
      )}

      <TaskModal
        isOpen={isTaskModalOpen}
        onClose={() => setIsTaskModalOpen(false)}
      />

      <ReminderModal
        isOpen={isReminderModalOpen}
        onClose={() => setIsReminderModalOpen(false)}
        task={selectedTask}
      />
    </div>
  );
};

export default Dashboard;
