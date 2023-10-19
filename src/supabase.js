import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://iwhjdhhvxtcqjtvqxjfx.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml3aGpkaGh2eHRjcWp0dnF4amZ4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTczODAyNDIsImV4cCI6MjAxMjk1NjI0Mn0.YEcgZGo9unvMoRYievSIwuBG_tgMgGQTpg8jxR24HVo";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
