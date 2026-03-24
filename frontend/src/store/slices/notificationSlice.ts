import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface Notification {
  id: number;
  message: string;
  type: string;
  isRead: boolean;
  timestamp: Date;
}

interface NotificationState {
  notifications: Notification[];
}

const initialState: NotificationState = {
  notifications: []
};

const notificationSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    addNotification: (state, action: PayloadAction<Omit<Notification, 'id' | 'timestamp'>>) => {
      const newNotification = {
        ...action.payload,
        id: Date.now(),
        timestamp: new Date()
      };
      state.notifications.unshift(newNotification);
    },
    markAsRead: (state, action: PayloadAction<number>) => {
      const notification = state.notifications.find(n => n.id === action.payload);
      if (notification) notification.isRead = true;
    },
    markAllAsRead: state => {
      state.notifications.forEach(notification => (notification.isRead = true));
    },
    clearNotifications: state => {
      state.notifications = [];
    }
  }
});

export const { addNotification, markAsRead, markAllAsRead, clearNotifications } = notificationSlice.actions;
export default notificationSlice.reducer;
