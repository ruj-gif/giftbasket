import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://abwschtyzquiqvcbvgcy.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFid3NjaHR5enF1aXF2Y2J2Z2N5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ1MTU4ODksImV4cCI6MjA5MDA5MTg4OX0.uHKIanjtIsIEMQ9E07vUGZVXKpaAbfmR9eTpyjRZSdk";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);