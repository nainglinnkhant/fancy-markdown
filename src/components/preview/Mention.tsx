import { CalendarDays } from 'lucide-react'
import { HoverCardPortal } from '@radix-ui/react-hover-card'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/Avatar'
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/HoverCard'
import { generateUsernameInitials } from '@/lib/utils'
import { mentions } from '@/data/mentions'

const Mention = ({ twittername }: { twittername: string }) => {
  const mention = mentions.find(mention => mention.username === `@${twittername}`)

  if (!mention) return `@${twittername}`

  const { username, profileImg, description, joined } = mention

  const twitterUrl = `https://twitter.com/${twittername}`
  const fallback = generateUsernameInitials(twittername)

  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <a href={twitterUrl} target='_blank' className='underline'>
          {username}
        </a>
      </HoverCardTrigger>

      <HoverCardPortal>
        <HoverCardContent className='w-[350px]'>
          <div className='flex space-x-4'>
            <Avatar>
              <AvatarImage src={profileImg} />
              <AvatarFallback>{fallback}</AvatarFallback>
            </Avatar>

            <div className='space-y-1'>
              <h4 className='text-sm font-semibold'>{username}</h4>
              <p className='text-sm'>{description}</p>
              <div className='flex items-center pt-2'>
                <CalendarDays className='mr-2 h-4 w-4 opacity-70' />{' '}
                <span className='text-xs text-muted-foreground'>{joined}</span>
              </div>
            </div>
          </div>
        </HoverCardContent>
      </HoverCardPortal>
    </HoverCard>
  )
}

export default Mention
