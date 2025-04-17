
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://awdynsykupzpflckzyil.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF3ZHluc3lrdXB6cGZsY2t6eWlsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI2NzIwNDMsImV4cCI6MjA1ODI0ODA0M30.KtoQybI9JF5ben87qhE2Si7PjzAqYtXrHO56ZHO0jqY";

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
export default supabase;