import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { SupabaseDatabase } from "src/models/supabase"
export class Supabase {
    static client: SupabaseClient<SupabaseDatabase> | undefined

    static initializeSupabase() {
        const supabaseProjectUrl: string | undefined = process.env.SUPABASE_PROJECT_URL
        const supabaseApiKey: string | undefined = process.env.SUPABASE_API_KEY
        if (supabaseApiKey != undefined && supabaseProjectUrl != undefined) {
            this.client = createClient<SupabaseDatabase>(supabaseProjectUrl, supabaseApiKey)
            console.log("Supabase Client Connected!")
        } else {
            console.log("Supabase Credentials Are Not Defined")
        }
    }

    static isAvalible(): boolean {
        const is = this.client != null && this.client != undefined
        if (!is) console.error("Supabase Is Not Initiated!")
        return is
    }
}
