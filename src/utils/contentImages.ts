type ContentImage = {
	source: string;
	alt?: string;
	title?: string;
	index: number;
};

const normalizeImageSource = (source: string) =>
	source.replace(/^(?:\.\.\/)+public\//, "/").replace(/^\.?\/public\//, "/");

const getAttribute = (tag: string, name: string): string | undefined => {
	const match = tag.match(
		new RegExp(`\\b${name}\\s*=\\s*(?:"([^"]*)"|'([^']*)')`, "i")
	);
	return match?.[1] ?? match?.[2];
};

const getContentImages = (body: string): ContentImage[] => {
	const images: ContentImage[] = [];
	const markdownImagePattern =
		/!\[([^\]]*)\]\(\s*(?:<([^>]+)>|([^\s)]+))(?:\s+(?:"([^"]*)"|'([^']*)'|\(([^)]*)\)))?\s*\)/g;
	const htmlImagePattern = /<img\b[^>]*>/gi;

	for (const match of body.matchAll(markdownImagePattern)) {
		images.push({
			source: normalizeImageSource(match[2] ?? match[3]),
			alt: match[1],
			title: match[4] ?? match[5] ?? match[6],
			index: match.index,
		});
	}

	for (const match of body.matchAll(htmlImagePattern)) {
		const source = getAttribute(match[0], "src");
		if (!source) continue;

		images.push({
			source: normalizeImageSource(source),
			alt: getAttribute(match[0], "alt"),
			title: getAttribute(match[0], "title"),
			index: match.index,
		});
	}

	return images.sort((a, b) => a.index - b.index);
};

/**
 * Returns the image selected by its Markdown alt text or title attribute.
 * Falls back to the first image when the selection is omitted or not found.
 */
export function getContentThumbnail(
	body: string,
	selectedTitle?: string
): string | undefined {
	const images = getContentImages(body);
	const title = selectedTitle?.trim();
	const selectedImage = title
		? images.find((image) => image.alt === title || image.title === title)
		: undefined;

	return (selectedImage ?? images[0])?.source;
}

/** Returns the first image referenced in a Markdown article. */
export function getFirstContentImage(body: string): string | undefined {
	return getContentThumbnail(body);
}
