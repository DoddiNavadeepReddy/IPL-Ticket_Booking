import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://yopyadvqkwebobsgrcqt.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlvcHlhZHZxa3dlYm9ic2dyY3F0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTUxNjE3MDMsImV4cCI6MjExMDczNzcwM30.z5-kP7f_FBnDxXUo1u-aq0lKBbk05kgYgL9VgyRXPk0";

export const supabase = createClient(supabaseUrl, supabaseKey);