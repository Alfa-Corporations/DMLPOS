import { useEffect, useState } from 'react';

export const usePushNotifications = () => {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [subscription, setSubscription] = useState<PushSubscription | null>(null);

  useEffect(() => {
    if ('serviceWorker' in navigator && 'PushManager' in window) {
      navigator.serviceWorker.ready.then(registration => {
        registration.pushManager.getSubscription().then(existingSubscription => {
          if (existingSubscription) {
            setIsSubscribed(true);
            setSubscription(existingSubscription);
          }
        });
      });
    }
  }, []);

  const subscribeToNotifications = async () => {
    if (!('serviceWorker' in navigator) || !('PushManager' in window)) {
      alert('Push notifications not supported');
      return;
    }

    try {
      const registration = await navigator.serviceWorker.ready;
      const newSubscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array('YOUR_PUBLIC_VAPID_KEY') // Replace with actual key
      });

      setSubscription(newSubscription);
      setIsSubscribed(true);

      // Send subscription to backend
      await fetch('/api/subscribe', {
        method: 'POST',
        body: JSON.stringify(newSubscription),
        headers: {
          'Content-Type': 'application/json'
        }
      });
    } catch (error) {
      console.error('Failed to subscribe:', error);
    }
  };

  const unsubscribeFromNotifications = async () => {
    if (subscription) {
      await subscription.unsubscribe();
      setIsSubscribed(false);
      setSubscription(null);
    }
  };

  return {
    isSubscribed,
    subscribeToNotifications,
    unsubscribeFromNotifications
  };
};

function urlBase64ToUint8Array(base64String: string) {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}
