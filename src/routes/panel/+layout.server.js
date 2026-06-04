import { error } from '@sveltejs/kit';

export const load = async ({ locals }) => {
	try {
		const [
			{ data: articleRow, error: articleError },
			{ data: sectionRow, error: sectionError },
			{ data: subsectionRow, error: subsectionError }
		] = await Promise.all([
			locals.supabase.from('article').select(`
            id:article_id,
            name,
            section(count),
            summary!summary_article_id_fkey(summary_text),
            tags(tag)`),

			locals.supabase
				.from('section')
				.select(
					`id:section_id,
						article_id,
						name,
						subsection(count),
						summary!summary_section_id_fkey(summary_text),
						tags(tag)`
				)
				.order('section_id', { ascending: true }),
			locals.supabase
				.from('subsection')
				.select(
					`id,
						section_id,
						content`
				)
				.order('section_id', { ascending: true })
		]);

		if (articleError) throw articleError;
		if (sectionError) throw sectionError;
		if (subsectionError) throw subsectionError;

		return {
			articles: articleRow.map((article) => ({
				...article,
				summary: article.summary?.summary_text,
				sectionCount: article.section[0]?.count || 0,
				tag: article.tags?.tag
			})),
			sections: sectionRow.map((section) => ({
				...section,
				summary: section.summary?.summary_text,
				subSectionCount: section.subsection[0]?.count || 0,
				tag: section.tags?.tag
			})),
			subsections: subsectionRow
		};
	} catch (e) {
		console.error(e);
		throw error(500, 'Internal Server Error');
	}
};
