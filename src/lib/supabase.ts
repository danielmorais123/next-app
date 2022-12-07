import { createClient } from "@supabase/supabase-js";


const SUPABASE_URL = "https://vcapfrbzsklbkxiyjmvp.supabase.co";
const SUPABASE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZjYXBmcmJ6c2tsYmt4aXlqbXZwIiwicm9sZSI6ImFub24iLCJpYXQiOjE2Njk5Mjg1NTIsImV4cCI6MTk4NTUwNDU1Mn0.Ua1MOJ8vHr-tp0nBjIQf5M026BHKRjQYgx3_HACHWWQ";

export const supabase = createClient(
  SUPABASE_URL,
  SUPABASE_KEY
);


export const STORAGE_URL = "https://vcapfrbzsklbkxiyjmvp.supabase.co/storage/v1/object/public/images/postImages/"