import { MDXRemote } from "next-mdx-remote/rsc";

export function MDXContent({ source }: { source: string }) {
  return (
    <div className="prose prose-garden prose-lg max-w-none font-sans prose-headings:font-heading prose-headings:font-medium prose-a:text-link hover:prose-a:text-link-hover prose-code:rounded prose-code:bg-sage-light prose-code:px-1.5 prose-code:py-0.5 prose-code:before:content-none prose-code:after:content-none">
      <MDXRemote source={source} />
    </div>
  );
}
