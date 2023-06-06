import useProcessor from './useProcessor'

interface PreviewProps {
  markdownText: string
}

const Preview = ({ markdownText }: PreviewProps) => {
  const Component = useProcessor(markdownText)

  return (
    <div className='h-[300px] w-[600px] overflow-auto px-3 py-2 text-[15px]'>
      {Component}
    </div>
  )
}

export default Preview
