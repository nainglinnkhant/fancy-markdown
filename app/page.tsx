import FancyMarkdown from '@/components/FancyMarkdown'
import ThemeMenu from '@/components/theme/ThemeMenu'

export default function Home() {
  return (
    <main className='flex h-screen w-full justify-center pt-[12vh]'>
      <FancyMarkdown />

      <ThemeMenu />
    </main>
  )
}
