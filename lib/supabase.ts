import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://hwzvfnnxidvvtqwbetrm.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh3enZmbm54aWR2dnRxd2JldHJtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg4ODExMjAsImV4cCI6MjA2NDQ1NzEyMH0.IvsVn6wSQvdjlErGFuUyBgt7LXq2fEEjCMyGqqTXl7o';

export const supabase = createClient(supabaseUrl, supabaseKey);

export type GalleryImage = {
  id: number;
  title: string;
  description: string;
  uploaded_at: string;
  file_path: string;
  uploader_id: number;
}; 