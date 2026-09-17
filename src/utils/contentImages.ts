/**
 * Returns the first image referenced in a Markdown article.
 * Images kept under `public/` are normalized to their public URL.
 */
export function getFirstContentImage(body: string): string | undefined {
	const markdownImage = body.match(
		/!\[[^\]]*\]\(\s*(?:<([^>]+)>|([^\s)]+))(?:\s+["'][^"']*["'])?\s*\)/
	);
	const htmlImage = body.match(/<img\b[^>]*\bsrc=["']([^"']+)["'][^>]*>/i);
	const firstImage = [markdownImage, htmlImage]
		.filter((match): match is RegExpMatchArray => Boolean(match))
		.sort((a, b) => (a.index ?? 0) - (b.index ?? 0))[0];
	const source =
		firstImage === markdownImage
			? (firstImage?.[1] ?? firstImage?.[2])
			: firstImage?.[1];

	if (!source) return undefined;

	return source
		.replace(/^(?:\.\.\/)+public\//, "/")
		.replace(/^\.?\/public\//, "/");
}
