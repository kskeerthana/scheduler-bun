
import React, { useState } from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, isToday } from 'date-fns';
import { useTask } from '../contexts/TaskContext';
import TaskCard from './TaskCard';
import ReminderModal from './ReminderModal';
import { Task } from '../types';

const Calendar = () => {
  const { tasks, updateTask } = useTask();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isReminderModalOpen, setIsReminderModalOpen] = useState(false);

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const getTasksForDate = (date: Date) => {
    return tasks.filter(task => {
      const taskDate = new Date(task.dueDate);
      return isSameDay(taskDate, date);
    });
  };

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
  };

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

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      if (direction === 'prev') {
        newDate.setMonth(prev.getMonth() - 1);
      } else {
        newDate.setMonth(prev.getMonth() + 1);
      }
      return newDate;
    });
    setSelectedDate(null);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Calendar</h1>
        <p className="text-gray-600">View your tasks by date</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Calendar Grid */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            {/* Calendar Header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">
                {format(currentDate, 'MMMM yyyy')}
              </h2>
              <div className="flex space-x-2">
                <button
                  onClick={() => navigateMonth('prev')}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  ←
                </button>
                <button
                  onClick={() => navigateMonth('next')}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  →
                </button>
              </div>
            </div>

            {/* Days of Week */}
            <div className="grid grid-cols-7 gap-1 mb-2">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                <div key={day} className="p-3 text-center text-sm font-medium text-gray-500">
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar Days */}
            <div className="grid grid-cols-7 gap-1">
              {days.map(day => {
                const tasksForDay = getTasksForDate(day);
                const isSelected = selectedDate && isSameDay(day, selectedDate);
                const isTodayDate = isToday(day);
                
                return (
                  <button
                    key={day.toISOString()}
                    onClick={() => handleDateClick(day)}
                    className={`
                      p-3 text-center relative hover:bg-gray-50 rounded-lg transition-colors
                      ${!isSameMonth(day, currentDate) ? 'text-gray-300' : 'text-gray-900'}
                      ${isSelected ? 'bg-primary text-white hover:bg-primary/90' : ''}
                      ${isTodayDate && !isSelected ? 'bg-blue-50 text-blue-600 font-semibold' : ''}
                    `}
                  >
                    {format(day, 'd')}
                    {tasksForDay.length > 0 && (
                      <div className={`absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 rounded-full ${
                        isSelected ? 'bg-white' : 'bg-primary'
                      }`} />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Selected Date Tasks */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              {selectedDate ? format(selectedDate, 'MMMM dd, yyyy') : 'Select a date'}
            </h3>
            
            {selectedDate ? (
              <div className="space-y-4">
                {getTasksForDate(selectedDate).length === 0 ? (
                  <div className="text-center py-8">
                    <div className="text-4xl mb-2">📅</div>
                    <p className="text-gray-500 text-sm">No tasks for this date</p>
                  </div>
                ) : (
                  getTasksForDate(selectedDate).map(task => (
                    <div key={task.id} className="bg-gray-50 rounded-lg p-4">
                      <TaskCard
                        task={task}
                        onSetReminder={handleSetReminder}
                        onToggleComplete={handleToggleComplete}
                      />
                    </div>
                  ))
                )}
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="text-4xl mb-2">👆</div>
                <p className="text-gray-500 text-sm">Click on a date to view tasks</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <ReminderModal
        isOpen={isReminderModalOpen}
        onClose={() => setIsReminderModalOpen(false)}
        task={selectedTask}
      />
    </div>
  );
};

export default Calendar;
