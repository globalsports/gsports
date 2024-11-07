'use server'

import { createClient } from "@/utils/supabase/client"
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function signIn(){
    const supabase = createClient();
    const origin = headers().get('origin')
    const {error, data} = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
            redirectTo: `${origin}`
        }
    })

    if(error){
        console.log(error)
    }
    else{
        return redirect(data.url)
    }

}