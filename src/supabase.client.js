import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://mmbvygjfaqqtsauwrtsk.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1tYnZ5Z2pmYXFxdHNhdXdydHNrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjI3NzI3NjQsImV4cCI6MjAzODM0ODc2NH0.-Lam9G6LkiThSoCAVbSOjg4gr04-vWaNd8W1c9wLVgc';
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
