import { useEffect } from 'react'
import {
  Form,
  NavLink,
  Outlet,
  redirect,
  useLoaderData,
  useNavigation,
} from 'react-router-dom'
import { createBook, getBooks } from '../storage'


export async function loader() {
  const books = await getBooks()
  return { books }
}


export async function action({ request }) {
  const formData = await request.formData()
  const data = Object.fromEntries(formData)
  const book = await createBook({ ...data, year: Number(data.year) })
  return redirect(`/books/${book.id}`)
}

function Root() {
  const { books } = useLoaderData()
  const navigation = useNavigation()
  const isSubmitting = navigation.state === 'submitting'

  useEffect(() => {
    document.title = `Книг: ${books.length}`
  }, [books.length])

  return (
    <>
      <h1>Библиотека</h1>
      <div className="layout">
        <nav>
          <Form method="post" action="/">
            <input name="title" placeholder="Название" required />
            <input name="author" placeholder="Автор" required />
            <input name="year" type="number" placeholder="Год" required />
            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Добавляем...' : 'Добавить'}
            </button>
          </Form>

          {books.length === 0 ? (
            <p>Книг пока нет</p>
          ) : (
            <ul>
              {books.map((book) => (
                <li key={book.id}>
                  <NavLink
                    to={`/books/${book.id}`}
                    className={({ isActive, isPending }) =>
                      isPending ? 'pending' : isActive ? 'active' : undefined
                    }
                  >
                    {book.title} — {book.author}
                  </NavLink>
                </li>
              ))}
            </ul>
          )}
        </nav>
        <main>
          <Outlet />
        </main>
      </div>
    </>
  )
}

export default Root
