"use client"
import React, {useEffect} from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkBreaks from 'remark-breaks';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import rehypeHighlight from 'rehype-highlight';
import rehypeRaw from 'rehype-raw';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import 'katex/dist/katex.min.css';
import {cn} from "@/src/lib/utils";
import {useTheme} from 'next-themes';

interface MarkdownGptProps {
  content: string;
  className?: string;
}

const MarkdownGpt: React.FC<MarkdownGptProps> = ({content, className}) => {
  const {resolvedTheme} = useTheme();

  useEffect(() => {
    if (!resolvedTheme) return;

    // Dynamically change highlight theme
    const head = document.head;
    const existing = document.getElementById('hljs-style');
    if (existing) head.removeChild(existing);

    const style = document.createElement('link');
    style.id = 'hljs-style';
    style.rel = 'stylesheet';
    style.href = resolvedTheme === 'dark'
      ? 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.8.0/styles/github-dark.min.css'
      : 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.8.0/styles/github.min.css';

    head.appendChild(style);
  }, [resolvedTheme]);

  return (
    <article
      className={cn("prose prose-slate dark:prose-invert w-full prose-md lg:prose-lg xl:prose-xl text-foreground text-left max-w-none", className)}
    >
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkBreaks, remarkMath]}
        rehypePlugins={[
          rehypeKatex,
          rehypeHighlight,
          rehypeRaw,
          rehypeSlug,
          rehypeAutolinkHeadings
        ]}
      >
        {content}
      </ReactMarkdown>
    </article>
  );
};

export default MarkdownGpt;
