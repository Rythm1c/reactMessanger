
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://jepgvblwyhjogirjanqt.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImplcGd2Ymx3eWhqb2dpcmphbnF0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI4MDY5NjEsImV4cCI6MjA1ODM4Mjk2MX0.q9VSa-IRWRFF9g3Zs38LZ0ID0SIhFg4nrEyNAsuni0k";

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
export default supabase;