'use client'

import { useState } from 'react'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/Tabs'
import Write from '@/components/write/Write'
import Preview from '@/components/preview/Preview'

const DEFAULT_TEXT =
  'built by @nainglk, heavily inspired by @mxkaske, built with @shadcn **ui**\n\n## What is Markdown?\n\nMarkdown is a lightweight markup language that you can use to add formatting elements to plaintext text documents. Created by John Gruber in 2004, Markdown is now one of the world’s most popular markup languages.'

const FancyMarkdown = () => {
  const [markdownText, setMarkdownText] = useState(DEFAULT_TEXT)

  return (
    <Tabs defaultValue='write'>
      <TabsList>
        <TabsTrigger value='write'>Write</TabsTrigger>
        <TabsTrigger value='preview'>Preview</TabsTrigger>
      </TabsList>

      <TabsContent value='write'>
        <Write markdownText={markdownText} setMarkdownText={setMarkdownText} />
      </TabsContent>

      <TabsContent value='preview'>
        <Preview markdownText={markdownText} />
      </TabsContent>
    </Tabs>
  )
}

export default FancyMarkdown
