import { useState } from 'react'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/Tabs'
import Write from '@/components/write/Write'
import Preview from '@/components/preview/Preview'

function App() {
  const [markdownText, setMarkdownText] = useState('')

  return (
    <div className='flex h-screen w-full justify-center pt-[10vh]'>
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
    </div>
  )
}

export default App
