import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp();

export const onAnalyticsEvent = functions.analytics.event('*').onLog(async (event) => {
  try {
    const db = admin.firestore();
    
    // Create a more structured event object
    const eventData = {
      name: event.name,
      params: event.params || {},
      userId: event.user?.userId || 'anonymous',
      deviceInfo: {
        deviceModel: event.device?.mobileModelName,
        deviceCategory: event.device?.deviceCategory,
        operatingSystem: event.device?.operatingSystem,
        browserVersion: event.device?.browserVersion,
        language: event.device?.language
      },
      geoInfo: {
        continent: event.location?.continent,
        country: event.location?.country,
        region: event.location?.region,
        city: event.location?.city
      },
      timestamp: admin.firestore.Timestamp.fromMillis(event.logTime),
      createdAt: admin.firestore.FieldValue.serverTimestamp()
    };

    // Write to Firestore
    await db.collection('analytics_events').add(eventData);
    
    functions.logger.info('Analytics event saved to Firestore:', {
      eventName: event.name,
      userId: eventData.userId
    });
    
  } catch (error) {
    functions.logger.error('Error saving analytics event:', error);
    throw error;
  }
});
