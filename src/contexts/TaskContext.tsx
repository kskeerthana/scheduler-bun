
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Task, Reminder } from '../types';

interface TaskContextType {
  tasks: Task[];
  addTask: (task: Omit<Task, 'id' | 'completed' | 'reminders'>) => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  addReminder: (taskId: string, reminder: Omit<Reminder, 'id' | 'taskId'>) => void;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const useTask = () => {
  const context = useContext(TaskContext);
  if (context === undefined) {
    throw new Error('useTask must be used within a TaskProvider');
  }
  return context;
};

interface TaskProviderProps {
  children: ReactNode;
}

export const TaskProvider = ({ children }: TaskProviderProps) => {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: '1',
      title: 'Review project proposal',
      description: 'Go through the Q1 marketing proposal and provide feedback',
      dueDate: '2024-12-20T14:00',
      priority: 'high',
      completed: false,
      reminders: []
    },
    {
      id: '2',
      title: 'Team standup meeting',
      description: 'Weekly sync with the development team',
      dueDate: '2024-12-18T09:00',
      priority: 'medium',
      completed: false,
      reminders: []
    }
  ]);

  const addTask = (taskData: Omit<Task, 'id' | 'completed' | 'reminders'>) => {
    const newTask: Task = {
      ...taskData,
      id: Date.now().toString(),
      completed: false,
      reminders: []
    };
    setTasks(prev => [...prev, newTask]);
  };

  const updateTask = (id: string, updates: Partial<Task>) => {
    setTasks(prev => prev.map(task => 
      task.id === id ? { ...task, ...updates } : task
    ));
  };

  const deleteTask = (id: string) => {
    setTasks(prev => prev.filter(task => task.id !== id));
  };

  const addReminder = (taskId: string, reminderData: Omit<Reminder, 'id' | 'taskId'>) => {
    const newReminder: Reminder = {
      ...reminderData,
      id: Date.now().toString(),
      taskId
    };
    
    setTasks(prev => prev.map(task => 
      task.id === taskId 
        ? { ...task, reminders: [...task.reminders, newReminder] }
        : task
    ));
  };

  return (
    <TaskContext.Provider value={{ tasks, addTask, updateTask, deleteTask, addReminder }}>
      {children}
    </TaskContext.Provider>
  );
};
