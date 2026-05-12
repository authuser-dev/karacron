import { cx } from '@util/cx';

interface MarkdownContentProps {
	content: string;
	className?: string;
}

/**
 * Minimal markdown renderer for controlled legal content.
 * Supports: ## headings, **bold**, - lists, paragraphs.
 */
export function MarkdownContent({ content, className }: MarkdownContentProps) {
	const blocks = content
		.split(/\n\n+/)
		.map((b) => b.trim())
		.filter(Boolean);

	return (
		<div className={cx('flex flex-col gap-3', className)}>
			{blocks.map((block, i) => {
				// Heading ## ...
				if (block.startsWith('## ')) {
					return (
						<h3
							key={i}
							className="text-sm font-semibold text-primary"
						>
							{block.slice(3)}
						</h3>
					);
				}

				// Unordered list
				const listLines = block
					.split('\n')
					.filter((l) => l.trimStart().startsWith('- '));
				if (
					listLines.length > 0 &&
					listLines.length === block.split('\n').length
				) {
					return (
						<ul key={i} className="list-disc space-y-1 pl-4">
							{listLines.map((line, j) => (
								<li key={j} className="text-sm text-secondary">
									<InlineText
										text={line.trimStart().slice(2)}
									/>
								</li>
							))}
						</ul>
					);
				}

				// Paragraph
				return (
					<p
						key={i}
						className="text-sm leading-relaxed text-secondary"
					>
						<InlineText text={block} />
					</p>
				);
			})}
		</div>
	);
}

function InlineText({ text }: { text: string }) {
	// Split on **bold** tokens
	const parts = text.split(/(\*\*[^*]+\*\*)/g);

	return (
		<>
			{parts.map((part, i) => {
				if (part.startsWith('**') && part.endsWith('**')) {
					return <strong key={i}>{part.slice(2, -2)}</strong>;
				}
				return <span key={i}>{part}</span>;
			})}
		</>
	);
}
