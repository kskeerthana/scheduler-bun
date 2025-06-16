
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useTask } from '../contexts/TaskContext';
import { Task } from '../types';

interface ReminderModalProps {
  isOpen: boolean;
  onClose: () => void;
  task: Task | null;
}

const ReminderModal = ({ isOpen, onClose, task }: ReminderModalProps) => {
  const { addReminder } = useTask();
  const [formData, setFormData] = useState({
    reminderTime: '',
    channel: 'email' as 'email' | 'sms'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.reminderTime || !task) return;

    addReminder(task.id, formData);
    setFormData({
      reminderTime: '',
      channel: 'email'
    });
    onClose();
  };

  const handleCancel = () => {
    setFormData({
      reminderTime: '',
      channel: 'email'
    });
    onClose();
  };

  if (!task) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Set Reminder</DialogTitle>
          <p className="text-sm text-gray-600">for "{task.title}"</p>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="reminderTime" className="block text-sm font-medium text-gray-700 mb-1">
              Reminder Time *
            </label>
            <Input
              id="reminderTime"
              type="datetime-local"
              value={formData.reminderTime}
              onChange={(e) => setFormData(prev => ({ ...prev, reminderTime: e.target.value }))}
              className="w-full"
              required
            />
          </div>

          <div>
            <label htmlFor="channel" className="block text-sm font-medium text-gray-700 mb-1">
              Notification Channel
            </label>
            <Select
              value={formData.channel}
              onValueChange={(value: 'email' | 'sms') => 
                setFormData(prev => ({ ...prev, channel: value }))
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select channel" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="email">📧 Email</SelectItem>
                <SelectItem value="sms">📱 SMS</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex space-x-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={handleCancel}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-primary hover:bg-primary/90"
            >
              Set Reminder
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ReminderModal;
