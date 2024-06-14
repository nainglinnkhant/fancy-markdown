import { ChangeEventHandler, useCallback, useEffect, useRef, useState } from 'react'
import { SiMarkdown } from 'react-icons/si'

import { Command, CommandInput, CommandItem, CommandList } from '@/components/ui/Command'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/Avatar'
import { Textarea } from '@/components/ui/Textarea'
import { cn, generateUsernameInitials } from '@/lib/utils'
import { mentions } from '@/data/mentions'
import { getCaretCoordinates, getCurrentWord, replaceWord } from './utils'

interface WriteProps {
  markdownText: string
  setMarkdownText: React.Dispatch<React.SetStateAction<string>>
}

const Write = ({ markdownText, setMarkdownText }: WriteProps) => {
  const [showMentions, setShowMentions] = useState(false)
  const [commandValue, setCommandValue] = useState('')
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const commandInputRef = useRef<HTMLInputElement>(null)
  const mentionsDropDownRef = useRef<HTMLDivElement>(null)

  const handleBlur = useCallback(() => {
    setShowMentions(false)
    setCommandValue('')
  }, [])

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      const commandInput = commandInputRef.current

      if (!showMentions || !commandInput) return

      if (e.key === 'Escape' || e.keyCode === 27) {
        setShowMentions(false)
      }

      if (
        e.key === 'ArrowUp' ||
        e.keyCode === 38 ||
        e.key === 'ArrowDown' ||
        e.keyCode === 40 ||
        e.key === 'Enter' ||
        e.keyCode === 13 ||
        e.key === 'Escape' ||
        e.keyCode === 27
      ) {
        e.preventDefault()
        commandInput.dispatchEvent(new KeyboardEvent('keydown', e))
      }
    },
    [showMentions]
  )

  const handleMouseDown = useCallback((e: Event) => {
    e.preventDefault()
    e.stopPropagation()
  }, [])

  const handleSelectionChange = useCallback(() => {
    const textarea = textareaRef.current

    if (!textarea) return

    const currentWord = getCurrentWord(textarea)
    if (!currentWord.startsWith('@') && commandValue !== '') {
      setCommandValue('')
      setShowMentions(false)
    }
  }, [commandValue])

  const onCommandSelect = useCallback((value: string) => {
    const textarea = textareaRef.current

    if (!textarea) return

    replaceWord(textarea, `${value}`)
    setCommandValue('')
    setShowMentions(false)
  }, [])

  const handleTextChange: ChangeEventHandler<HTMLTextAreaElement> = e => {
    setMarkdownText(e.target.value)

    const textarea = e.target
    const mentionsDropDown = mentionsDropDownRef.current
    const currentWord = getCurrentWord(textarea)

    if (currentWord.startsWith('@')) {
      setShowMentions(true)
      setCommandValue(currentWord)
      const { top, left, height } = getCaretCoordinates(textarea, textarea.selectionStart)

      if (!mentionsDropDown) return

      mentionsDropDown.style.top = `${top + height}px`
      mentionsDropDown.style.left = `${left}px`
    }

    if (currentWord.length === 0) {
      setShowMentions(false)
    }
  }

  useEffect(() => {
    const textarea = textareaRef.current
    const mentionsDropDown = mentionsDropDownRef.current

    textarea?.addEventListener('keydown', handleKeyDown)
    textarea?.addEventListener('blur', handleBlur)
    document?.addEventListener('selectionchange', handleSelectionChange)
    mentionsDropDown?.addEventListener('mousedown', handleMouseDown)

    return () => {
      textarea?.removeEventListener('keydown', handleKeyDown)
      textarea?.removeEventListener('blur', handleBlur)
      document?.removeEventListener('selectionchange', handleSelectionChange)
      mentionsDropDown?.removeEventListener('mousedown', handleMouseDown)
    }
  }, [handleBlur, handleKeyDown, handleMouseDown, handleSelectionChange])

  return (
    <div className='relative h-[300px] w-[90vw] max-w-[600px]'>
      <Textarea
        autoComplete='off'
        autoCorrect='off'
        autoCapitalize='off'
        ref={textareaRef}
        value={markdownText}
        onChange={handleTextChange}
        className='h-full w-full resize-none rounded-lg text-[15px]'
      />

      <Command
        ref={mentionsDropDownRef}
        className={cn(
          { hidden: !showMentions },
          'absolute h-auto max-h-44 w-auto min-w-[195px] p-[5px] shadow'
        )}
      >
        <div className='hidden'>
          <CommandInput
            ref={commandInputRef}
            value={commandValue}
            onValueChange={setCommandValue}
          />
        </div>

        <CommandList>
          {mentions.map(({ username, name, profileImg }) => (
            <CommandItem
              key={username}
              value={username}
              onSelect={onCommandSelect}
              className='flex space-x-3'
            >
              <Avatar>
                <AvatarImage src={profileImg} />
                <AvatarFallback>
                  {generateUsernameInitials(username.replace('@', ''))}
                </AvatarFallback>
              </Avatar>

              <div>
                <h4 className='text-sm'>{name}</h4>
                <p className='text-sm text-muted-foreground'>{username}</p>
              </div>
            </CommandItem>
          ))}
        </CommandList>
      </Command>

      <div className='mt-1 flex items-center'>
        <SiMarkdown className='mr-1.5 text-lg text-muted-foreground' />
        <p className='text-xs text-muted-foreground'>
          Styling with Markdown is supported.
        </p>
      </div>
    </div>
  )
}

export default Write
