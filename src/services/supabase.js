import { createClient } from "@supabase/supabase-js";

// Create a single supabase client for interacting with your database
const supabaseUrl = "https://xzffvevtzeilehnkaxrf.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh6ZmZ2ZXZ0emVpbGVobmtheHJmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDk3MDM4NjcsImV4cCI6MjAyNTI3OTg2N30.Kq5T8mwqh5Fqmwb7_6aqU4NSVV33DU3MeuK1ChS3wiA";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
