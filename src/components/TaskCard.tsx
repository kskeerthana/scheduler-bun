
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Task } from '../types';
import { format } from 'date-fns';

interface TaskCardProps {
  task: Task;
  onSetReminder: (task: Task) => void;
  onToggleComplete: (taskId: string) => void;
}

const TaskCard = ({ task, onSetReminder, onToggleComplete }: TaskCardProps) => {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'priority-high';
      case 'medium': return 'priority-medium';
      case 'low': return 'priority-low';
      default: return 'priority-low';
    }
  };

  const formatDueDate = (dateString: string) => {
    const date = new Date(dateString);
    return format(date, 'MMM dd, yyyy \'at\' h:mm a');
  };

  return (
    <div className="task-card">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-3">
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => onToggleComplete(task.id)}
            className="w-5 h-5 text-primary focus:ring-primary border-gray-300 rounded"
          />
          <h3 className={`font-semibold text-lg ${task.completed ? 'line-through text-gray-500' : 'text-gray-900'}`}>
            {task.title}
          </h3>
        </div>
        <Badge className={`px-2 py-1 text-xs font-medium rounded-full border ${getPriorityColor(task.priority)}`}>
          {task.priority}
        </Badge>
      </div>
      
      <p className={`text-gray-600 mb-4 ${task.completed ? 'line-through' : ''}`}>
        {task.description}
      </p>
      
      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-500">
          Due: {formatDueDate(task.dueDate)}
        </div>
        
        <div className="flex items-center space-x-2">
          {task.reminders.length > 0 && (
            <Badge variant="outline" className="text-xs">
              {task.reminders.length} reminder{task.reminders.length > 1 ? 's' : ''}
            </Badge>
          )}
          <Button
            variant="outline"
            size="sm"
            onClick={() => onSetReminder(task)}
            className="text-primary hover:bg-primary/10"
          >
            + Set Reminder
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
