import { populateDatabase } from '@/lib/firebase';
import psychologistsData from '@/data/psychologists.json';
import { Psychologist } from '@/lib/types';

const initializeDatabase = async () => {
  try {
    console.log('Starting database initialization...');
    
    const psychologists = psychologistsData as Psychologist[];
    
    console.log(`Found ${psychologists.length} psychologists to add to database`);
    
    await populateDatabase(psychologists);
    
    console.log('✅ Database initialized successfully!');
    console.log('You can now use the application with the populated data.');
    
  } catch (error) {
    console.error('❌ Error initializing database:', error);
    process.exit(1);
  }
};


initializeDatabase();