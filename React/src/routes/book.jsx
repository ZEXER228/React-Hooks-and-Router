import { useEffect, useState } from 'react'
import { Form, useLoaderData } from 'react-router-dom'
import { getBook } from '../storage'


export async function loader({ params }) {
  const book = await getBook(params.bookId)

  if (book === null) {
    throw new Response('Книга не найдена', {
      status: 404,
      statusText: 'Not Found',
    })
  }

  return { book }
}

function Book() {
  const { book } = useLoaderData()
  const [timer, setTimer] = useState({ bookId: book.id, seconds: 0 })
  const seconds = timer.bookId === book.id ? timer.seconds : 0

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimer((currentTimer) => ({
        bookId: book.id,
        seconds: currentTimer.bookId === book.id ? currentTimer.seconds + 1 : 1,
      }))
    }, 1000)

    return () => clearInterval(intervalId)
  }, [book.id])

  function confirmDelete(event) {
    if (!window.confirm('Удалить книгу?')) {
      event.preventDefault()
    }
  }

  return (
    <article>
      <h2>{book.title}</h2>
      <p>Автор: {book.author}</p>
      <p>Год: {book.year}</p>
      <p>Вы на этой странице: {seconds} с</p>
      <Form method="post" action="delete" onSubmit={confirmDelete}>
        <button type="submit">Удалить</button>
      </Form>
    </article>
  )
}

export default Book
