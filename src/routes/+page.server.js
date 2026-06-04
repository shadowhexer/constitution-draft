// src/routes/protected-page/+page.server.js
import { redirect } from '@sveltejs/kit';

// Type the load function correctly
export const load = async ({ cookies, url }) => {
    const userCookie = cookies.get('session_id');

    // if (!userCookie) {
    //     // TypeScript knows 'redirect' throws an error internally.
    //     // It's crucial to use 'throw' here.
    //     throw redirect(303, '/login');
    // }

    if (url.pathname === '/') {
        // Throw the redirect. The 303 status code is suitable for this.
        throw redirect(303, '/constitution');
    }

    return {
        // ... data for the page
    };
};

// Example in an Action (e.g., after a form submission)
export const actions = {
    default: async ({ request }) => {
        // Handle form data
        // ...

        // Throw redirect after successful action
        throw redirect(303, '/dashboard');

        // Note: You must throw the redirect inside an action;
        // any code after the throw is unreachable.
    }
};
