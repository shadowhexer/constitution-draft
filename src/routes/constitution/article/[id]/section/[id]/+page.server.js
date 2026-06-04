import { error } from '@sveltejs/kit';

export const load = async ({ params, locals }) => {
    try {
        const
            { data: subRow, error: subError }
                = await locals.supabase
                    .from('subsection')
                    .select('id, section_id, content')
                    .eq('section_id', params.id)

        if (subError) throw subError

        return {
            subSection: subRow,
        }
    } catch (e) {
        console.error(e);
        throw error(500, 'Internal Server Error');
    }
};
