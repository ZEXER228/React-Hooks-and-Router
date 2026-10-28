import { useRouteError } from 'react-router-dom'

function ErrorPage() {
  const error = useRouteError()
  const message = error?.statusText || error?.message || 'Неизвестная ошибка'

  return (
    <section>
      <h2>Ой!</h2>
      <p>{message}</p>
    </section>
  )
}

export default ErrorPage
