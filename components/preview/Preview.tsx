import useProcessor from './useProcessor'

interface PreviewProps {
  markdownText: string
}

const Preview = ({ markdownText }: PreviewProps) => {
  const Component = useProcessor(markdownText)

  return (
    <div className='w-[90vw] max-w-[600px]'>
      <div className='prose dark:prose-invert prose-a:font-normal'>{Component}</div>
    </div>
  )
}

export default Preview
