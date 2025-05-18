import { createClient } from "@supabase/supabase-js";

const supabaseAdmin = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

(async () => {
    console.log((await supabaseAdmin.auth.admin.listUsers()).data.users);
})();

// export async function checkEmailExists(email) {
//     console.log(await supabaseAdmin.from("auth.users").select("email"));
//     const { data, error } = await supabaseAdmin.from("auth.users").select("email").eq("email", email).single();

//     return !!data; // Returns true if email exists, false otherwise
// }

// (async () => {
//     console.log("KV@gmail.com", await checkEmailExists("kevinboriboonsomsin@gmail.com"));
//     console.log("rando@gmail.com", await checkEmailExists("sdflksdfsldkfs@gmail.com"));
// })();
