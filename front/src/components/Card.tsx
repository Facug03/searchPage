import { useEffect, useState } from 'react'
import Delete from './Icons/Delete'
import Edit from './Icons/Add'
import InfoCard from './InfoCard'

import type { Url } from '../types'
// import axios from 'axios'

type Props = {
  deleteCompany: (id: string) => void
  onEdit: (id: Url) => void
  id: string
  name: string
  link: string
}

function Card({ id, name, link, deleteCompany, onEdit }: Props) {
  const [modal, setModal] = useState(false)

  return (
    <>
      <div onClick={() => setModal(true)} className='cursor-pointer'>
        {name}
      </div>
      <div
        onClick={() => setModal(true)}
        className='text-xs text-primary col-span-4 cursor-pointer'
      >
        {link}
      </div>
      <InfoCard
        modal={modal}
        name={name}
        link={link}
        id={id}
        deleteCompany={deleteCompany}
        onEdit={onEdit}
        onClose={() => setModal(false)}
      />
    </>
  )
}

export default Card
