interface PreviewProps {
  markdownText: string
}

const Preview = ({ markdownText }: PreviewProps) => {
  return (
    <div className='h-[300px] w-[600px] overflow-auto px-3 py-2 text-foreground'>
      {markdownText}
    </div>
  )
}

export default Preview
