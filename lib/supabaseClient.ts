import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://caisatdcrysytdwkkcbz.supabase.co";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNhaXNhdGRjcnlzeXRkd2trY2J6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTI4MjkwNTYsImV4cCI6MjEwODQwNTA1Nn0.vkf6LUwjRMsjErTme4o5Y_qxQQcrHYM2JBIEGdCJKzI";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
