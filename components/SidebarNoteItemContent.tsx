'use client'

import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import React, { MutableRefObject, useEffect, useMemo, useRef, useState, useTransition } from 'react'

type Props = {
  id: string
  title: string
  expandedChildren: React.ReactNode
  children: React.ReactNode
}

const SidebarNoteItemContent = ({ id, title, expandedChildren, children }: Props) => {
  const router = useRouter()
  const pathname = usePathname()
  const selectedId = useMemo(() => pathname?.split('/')[1] || null, [pathname])

  const [isPending] = useTransition()
  const [isExpanded, setIsExpanded] = useState(false)
  const isActive = useMemo(() => selectedId === id, [selectedId, id])

  // Animate after title is edited.
  const itemRef: MutableRefObject<null | HTMLDivElement> = useRef(null)
  const prevTitleRef = useRef(title)

  useEffect(() => {
    if (title !== prevTitleRef.current) {
      prevTitleRef.current = title
      itemRef.current && itemRef.current.classList.add('flash')
    }
  }, [title])

  return (
    <div
      ref={itemRef}
      onAnimationEnd={() => {
        itemRef.current && itemRef.current.classList.remove('flash')
      }}
      className={['sidebar-note-list-item', isExpanded ? 'note-expanded' : ''].join(' ')}
    >
      {children}
      <button
        className='sidebar-note-open'
        style={{
          backgroundColor: isPending ? 'var(--gray-80)' : isActive ? 'var(--tertiary-blue)' : '',
          border: isActive ? '1px solid var(--primary-border)' : '1px solid transparent',
        }}
        onClick={() => {
          router.push(`/note/${id}`)
        }}
      >
        Open note for preview
      </button>
      <button
        className='sidebar-note-toggle-expand'
        onClick={e => {
          e.stopPropagation()
          setIsExpanded(!isExpanded)
        }}
      >
        {isExpanded ? (
          <Image src='/chevron-down.svg' width={10} height={10} alt='Collapse' />
        ) : (
          <Image src='/chevron-up.svg' width={10} height={10} alt='Expand' />
        )}
      </button>
      {isExpanded && expandedChildren}
    </div>
  )
}

export default SidebarNoteItemContent
