import useProcessor from './useProcessor'

interface PreviewProps {
  markdownText: string
}

const Preview = ({ markdownText }: PreviewProps) => {
  const Component = useProcessor(markdownText)

  return (
    <div className='w-[600px]'>
      <div className='prose prose-a:font-normal'>{Component}</div>
    </div>
  )
}

export default Preview
