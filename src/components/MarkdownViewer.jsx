import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { MessageCircle } from "lucide-react";
import ReindexButton from "@/components/ReindexButton";

export default function MarkdownViewer({ content }) {
  return (
    <article className="w-full font-cairo max-w-4xl mx-auto text-foreground">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ children }) => (
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-foreground mb-6 pb-3 border-b border-border/70 tracking-tight leading-tight">
              {children}
            </h1>
          ),
          h2: ({ children }) => (
            <h2 className="text-xl sm:text-2xl font-bold text-foreground mt-10 mb-4 pb-1 border-b border-border/40 flex items-center gap-2">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="text-base sm:text-lg font-bold text-foreground mt-6 mb-2">
              {children}
            </h3>
          ),
          p: ({ children }) => (
            <p className="text-sm sm:text-base text-foreground/85 leading-relaxed mb-4">
              {children}
            </p>
          ),
          ul: ({ children }) => (
            <ul className="list-disc list-outside mr-5 space-y-2 mb-5 text-sm sm:text-base text-foreground/85">
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol className="list-decimal list-outside mr-5 space-y-2 mb-5 text-sm sm:text-base text-foreground/85">
              {children}
            </ol>
          ),
          li: ({ children }) => (
            <li className="leading-relaxed">
              {children}
            </li>
          ),
          blockquote: ({ children }) => (
            <blockquote className="bg-yellow-100/50 py-3 px-4 rounded-lg my-5 text-sm sm:text-base text-foreground/90 font-medium leading-relaxed">
              {children}
            </blockquote>
          ),
          code: ({ inline, className, children, ...props }) => {
            if (inline) {
              return (
                <code
                  dir="ltr"
                  className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-xs text-primary font-semibold border border-border/60"
                  {...props}
                >
                  {children}
                </code>
              );
            }
            return (
              <pre
                dir="ltr"
                className="rounded-2xl bg-card border border-border p-4 overflow-x-auto text-xs sm:text-sm font-mono my-5 text-foreground shadow-2xs"
              >
                <code className={className} {...props}>
                  {children}
                </code>
              </pre>
            );
          },
          table: ({ children }) => (
            <div className="w-full overflow-x-auto my-6 rounded-xl bg-card">
              <table className="w-full text-right text-xs sm:text-sm">
                {children}
              </table>
            </div>
          ),
          thead: ({ children }) => (
            <thead className="bg-muted/70 text-foreground font-bold">
              {children}
            </thead>
          ),
          tbody: ({ children }) => (
            <tbody className="divide-y divide-border/60">
              {children}
            </tbody>
          ),
          th: ({ children }) => (
            <th className="p-3 sm:p-3.5 font-bold text-foreground">
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td className="p-3 sm:p-3.5 text-foreground/85">
              {children}
            </td>
          ),
          hr: () => (
            <hr className="border-border/60 my-8" />
          ),
          a: ({ href, children }) => {
            if (href === "#reindex") {
              return <ReindexButton />;
            }
            if (href?.startsWith("https://wa.me")) {
              return (
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 my-2 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-xs sm:text-sm transition-all no-underline cursor-pointer"
                >
                  <MessageCircle className="size-4 shrink-0" />
                  <span>{children}</span>
                </a>
              );
            }
            return (
              <a
                href={href}
                target={href?.startsWith("#") ? "_self" : "_blank"}
                rel={href?.startsWith("#") ? undefined : "noopener noreferrer"}
                className="text-primary hover:underline font-semibold"
              >
                {children}
              </a>
            );
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </article>
  );
}
