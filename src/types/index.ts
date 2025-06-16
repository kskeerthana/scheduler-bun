
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

// Remove the custom User interface since we're now using Supabase's User type
// The profile data will be handled separately through the profiles table
