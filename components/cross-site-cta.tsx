import { ArrowRightIcon } from "./icons/ecosystem-icons"

interface CrossSiteCtaProps {
  variant: "consulting-to-learning" | "learning-to-consulting"
  articleTitle?: string
  className?: string
}

export function CrossSiteCta({ variant, articleTitle, className = "" }: CrossSiteCtaProps) {
  if (variant === "consulting-to-learning") {
    return (
      <div className={`rounded-xl border border-teal-500/20 bg-teal-500/5 p-6 ${className}`}>
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 h-10 w-10 rounded-lg bg-teal-500/10 flex items-center justify-center">
            <svg className="h-5 w-5 text-teal-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
              />
            </svg>
          </div>
          <div className="flex-1">
            <h4 className="font-semibold text-slate-900 dark:text-white mb-1">Want to learn how this works?</h4>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
              Explore in-depth tutorials on AI automation, RAG systems, and security best practices.
            </p>
            <a
              href="https://highencodelearning.com/programs"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-medium text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300 transition-colors"
            >
              Browse learning programs
              <ArrowRightIcon className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={`rounded-xl border border-sky-500/20 bg-sky-500/5 p-6 ${className}`}>
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 h-10 w-10 rounded-lg bg-sky-500/10 flex items-center justify-center">
          <svg className="h-5 w-5 text-sky-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
        <div className="flex-1">
          <h4 className="font-semibold text-slate-900 dark:text-white mb-1">Need this built for you?</h4>
          <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
            {articleTitle
              ? `Let me implement ${articleTitle} for your team with a done-for-you automation package.`
              : "Get expert help implementing AI automation, chatbots, and security solutions for your business."}
          </p>
          <a
            href="https://cs-learning.me/work-with-me"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-medium text-sky-600 dark:text-sky-400 hover:text-sky-700 dark:hover:text-sky-300 transition-colors"
          >
            View consulting services
            <ArrowRightIcon className="h-4 w-4" />
          </a>
        </div>
      </div>
    </div>
  )
}
