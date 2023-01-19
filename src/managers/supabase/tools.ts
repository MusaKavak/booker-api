import { PostgrestError } from "@supabase/supabase-js"

export function returnCheck<T>(data: T | null | undefined, error: PostgrestError | null): T | null {
    if (data != null && data != undefined) return data
    console.error(`
        Err ${error?.code || "-"}: ${error?.message}:
            - ${error?.details}
    `)
    return null
}
const postgrestErr: PostgrestError = {
    message: "Supabase Is Not Initiated",
    details: "",
    hint: "",
    code: ""
}
export const nullPlaceholder = { data: null, error: postgrestErr }