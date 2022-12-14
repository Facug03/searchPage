import { useState } from 'react'

import Edit from '../components/Icons/Edit'
import type { Url } from '../types'

type Props = {
  company: Url[]
  word: string
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleCheck: () => void
  check: (string | undefined)[]
  loading: boolean
  notFound: boolean
  changeFound: () => void
  changeWord: (word: string) => void
  changeCheck: () => void
}

export default function CheckWord({
  company,
  word,
  handleChange,
  handleCheck,
  check,
  loading,
  notFound,
  changeFound,
  changeWord,
  changeCheck,
}: Props) {
  const [edit, setEdit] = useState(true)
  const [error, setError] = useState('')
  const [befWord, setBefWord] = useState('')

  const handleAccept = () => {
    if (befWord !== word) {
      changeCheck()
    }
    if (word.length) {
      setEdit(false)
      setError('')
    } else {
      setError('La palabra clave no puede estar vacia')
    }
  }

  const handleCancel = () => {
    if (word.length || befWord.length) {
      setEdit(false)
      changeWord(befWord)
    }
  }

  return (
    <section className='pb-4'>
      {company.length ? (
        <div className='mt-7'>
          <h2 className='mb-4'>
            Revisar si alguna de estas paginas contiene la siguiente palabra:
          </h2>
          {!edit && word.length ? (
            <div>
              <div className='inline-flex items-center gap-2 mb-4 px-3 py-1 bg-[#ededed] rounded'>
                <h3 className=' '>{word}</h3>
                <button
                  className={`${loading && 'pointer-events-none'}`}
                  onClick={() => {
                    setEdit(true)
                    changeFound()
                    setBefWord(word)
                  }}
                >
                  <Edit />
                </button>
              </div>
              {loading ? (
                <button
                  disabled
                  type='button'
                  className='bg-primary h-10 w-[79px] py-2 px-4 rounded-md flex justify-center items-center'
                >
                  <svg
                    className='inline w-5 h-5 text-white animate-spin'
                    viewBox='0 0 100 101'
                  >
                    <path
                      d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z'
                      fill='#2A9DFF'
                    />
                    <path
                      d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z'
                      fill='currentColor'
                    />
                  </svg>
                </button>
              ) : (
                <button
                  className='bg-primary py-2 px-4 text-white rounded-md block hover:bg-secondary duration-200 ease-linear'
                  onClick={handleCheck}
                >
                  Check
                </button>
              )}
            </div>
          ) : (
            <div>
              <div className='relative inline max-[435px]:block'>
                <label className='mr-2'>Palabra clave</label>
                <input
                  className='border-primary px-2 mr-2 border-2 rounded-md outline-none max-[435px]:block'
                  name='word'
                  value={word}
                  onChange={handleChange}
                />
                {!word.length && (
                  <p className='absolute top-[25px] left-[115px] text-xs text-red-500 max-[435px]:top-[52px] max-[435px]:left-[1px]'>
                    {error}
                  </p>
                )}
              </div>
              <div className='inline max-tb:block max-tb:mt-5'>
                <button
                  onClick={handleAccept}
                  className='bg-primary py-1 px-4 text-white rounded-md mr-4 hover:bg-secondary duration-200 ease-linear'
                >
                  Aceptar
                </button>
                <button
                  onClick={handleCancel}
                  className='bg-primary py-1 px-4 text-white rounded-md hover:bg-secondary duration-200 ease-linear'
                >
                  Cancelar
                </button>
              </div>
            </div>
          )}
        </div>
      ) : null}
      {!!check.length && !!word.length && !edit && (
        <div className='mt-5 mx-auto'>
          <h2 className='mb-2'>
            Estas paginas contienen la palabra:{' '}
            <span className='px-3 py-1 bg-[#ededed] rounded'>{word}</span>
          </h2>
          <ul className='list-none'>
            {check.map((comp, index) => (
              <li className='text-primary' key={index}>
                <a href={comp} target='_blank' rel='noreferrer noopener'>
                  {comp}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
      {!!notFound && !edit && (
        <div className='mt-4'>
          <p>
            Ninguna de las paginas contiene la palabra:{' '}
            <span className='px-3 py-1 bg-[#ededed] rounded'>{word}</span>
          </p>
        </div>
      )}
    </section>
  )
}
