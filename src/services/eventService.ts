import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, Timestamp } from 'firebase/firestore';
import { firebaseConfig } from '../firebaseconfig';

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const IP_CACHE_KEY = 'user_ip_address';
const IP_CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

export interface Event {
  title: string;
  description?: string;
  timestamp: Date;
  userId: string;
  ipAddress?: string;
  environment: 'production' | 'development';
}

interface IpCache {
  ip: string;
  timestamp: number;
}

const getCachedIp = (): string | null => {
  const cached = localStorage.getItem(IP_CACHE_KEY);
  if (!cached) return null;

  try {
    const { ip, timestamp }: IpCache = JSON.parse(cached);
    const now = Date.now();
    
    // Check if cache is still valid (within 24 hours)
    if (now - timestamp <= IP_CACHE_DURATION) {
      return ip;
    }
    
    // Clear expired cache
    localStorage.removeItem(IP_CACHE_KEY);
    return null;
  } catch (error) {
    console.error('Error reading IP cache:', error);
    return null;
  }
};

const cacheIp = (ip: string) => {
  const cache: IpCache = {
    ip,
    timestamp: Date.now(),
  };
  localStorage.setItem(IP_CACHE_KEY, JSON.stringify(cache));
};

const fetchIpFromService = async (serviceUrl: string): Promise<string | null> => {
  try {
    const response = await fetch(serviceUrl);
    if (!response.ok) return null;
    const data = await response.json();
    return data.ip || data.IPv4 || data.ipAddress;
  } catch (error) {
    console.error(`Error fetching IP from ${serviceUrl}:`, error);
    return null;
  }
};

export const getIpAddress = async (): Promise<string> => {
  // First, try to get IP from cache
  const cachedIp = getCachedIp();
  if (cachedIp) {
    return cachedIp;
  }

  // List of free IP services
  const ipServices = [
    'https://api.ipify.org?format=json',
    'https://api.ipdata.co?api-key=test',
    'https://api.techniknews.net/ipgeo/',
    'https://ipapi.co/json/'
  ];

  // Try each service until we get a valid IP
  for (const service of ipServices) {
    const ip = await fetchIpFromService(service);
    if (ip) {
      cacheIp(ip);
      return ip;
    }
  }

  // If all services fail, return unknown
  return 'unknown';
};

// Get the current environment
export const getEnvironment = (): 'production' | 'development' => {
  // You can modify this logic based on your deployment setup
  return window.location.hostname.includes('firebaseapp.com') ? 'production' : 'development';
};

export const saveEvent = async (event: Event): Promise<string> => {
  try {
    const eventData = {
      ...event,
      timestamp: Timestamp.fromDate(event.timestamp),
      createdAt: Timestamp.now(),
    };

    const docRef = await addDoc(collection(db, 'events'), eventData);
    return docRef.id;
  } catch (error) {
    console.error('Error saving event:', error);
    throw error;
  }
};
