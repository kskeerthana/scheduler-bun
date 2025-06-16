
export interface Task {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  priority: 'low' | 'medium' | 'high';
  completed: boolean;
  reminders: Reminder[];
}

export interface Reminder {
  id: string;
  taskId: string;
  reminderTime: string;
  channel: 'email' | 'sms';
}

export interface User {
  id: string;
  name: string;
}
