import React, { Suspense } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import NoteList from './NoteList'
import EditButton from './EditButton'
import NoteListSkeleton from './NoteListSkeleton'
import SidebarSearchField from '@/components/SidebarSearchField'

type Props = {}

const Sidebar = async (props: Props) => {
  return (
    <>
      <section className='col sidebar'>
        <Link href={'/'} className='link--unstyled'>
          <section className='sidebar-header'>
            <Image className='logo' src='/logo.svg' width={22} height={20} alt='' role='img' />
            <strong>React Notes</strong>
          </section>
        </Link>
        <section className='sidebar-menu' role='menubar'>
          <SidebarSearchField />
          <EditButton noteId={null}>New</EditButton>
        </section>
        <nav>
          <Suspense fallback={<NoteListSkeleton />}>
            <NoteList />
          </Suspense>
        </nav>
      </section>
    </>
  )
}

export default Sidebar
