// src/hooks.server.js
import { env } from '$env/dynamic/private' 
import { createServerClient } from '@supabase/ssr';

/**@type {string} */
const supabaseUrl = env.SUPABASE_URL || '';

/**@type {string} */
const supabaseKey = env.SUPABASE_PUBLISHABLE_DEFAULT_KEY || ''; 

export const handle = async ({ event, resolve }) => {
    // Initialize the client inside the handle function (once per request)
    event.locals.supabase = createServerClient(supabaseUrl, supabaseKey, {
        cookies: {
            getAll: () => event.cookies.getAll(),
            setAll: (cookiesToSet) => {
                cookiesToSet.forEach(({ name, value, options }) => {
                    event.cookies.set(name, value, { ...options, path: '/' });
                });
            }
        },
        // Re-inject your specific schema requirement here
        db: { schema: 'constitution' }
    });

    /**
     * Helper to safely get the user session. 
     * Using getUser() is more secure than getSession() on the server.
     */
    event.locals.safeGetSession = async () => {
        const { data: { user }, error } = await event.locals.supabase.auth.getUser();
        if (error) return { session: null, user: null };

        const { data: { session } } = await event.locals.supabase.auth.getSession();
        return { session, user };
    };

    return resolve(event, {
        // This is a Supabase requirement to allow the client to see custom headers
        filterSerializedResponseHeaders(name) {
            return name === 'content-range' || name === 'x-supabase-api-version';
        }
    });
};