import { createElement, useEffect, useState } from 'react'
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import rehypeRaw from 'rehype-raw'
import rehypeReact from 'rehype-react'
import rehypeSanitize, { defaultSchema } from 'rehype-sanitize'

import Mention from './Mention'

const useProcessor = (markdownText: string) => {
  const [content, setContent] = useState<React.ReactNode>(null)
  const mentionRegex = /@(\w+)/g
  const markdown = markdownText.replace(
    mentionRegex,
    '<mention twittername="$1">@$1</mention>'
  )

  useEffect(() => {
    unified()
      .use(remarkParse)
      .use(remarkRehype, { allowDangerousHtml: true })
      .use(rehypeRaw)
      .use(rehypeSanitize, {
        ...defaultSchema,
        tagNames: [...defaultSchema.tagNames!, 'mention'],
        attributes: {
          ...defaultSchema.attributes,
          mention: ['twittername'],
        },
      })
      // @ts-expect-error because mention is not valid html-tag
      .use(rehypeReact, {
        createElement,
        components: {
          mention: Mention,
        },
      })
      .process(markdown)
      .then(file => setContent(file.result))
  }, [markdown])

  return content
}

export default useProcessor
