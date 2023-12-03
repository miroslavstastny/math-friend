import React from 'react'

export const Input: React.FunctionComponent<
  Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onSubmit'> & {
    onSubmit?: (e: React.FormEvent<HTMLFormElement>, value: string) => void
  }
> = ({ onSubmit, ...rest }) => {
  const inputRef = React.useRef<HTMLInputElement>(null)

  React.useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    if (!inputRef.current) {
      return
    }

    e.preventDefault()
    onSubmit?.(e, inputRef.current.value)
    inputRef.current.value = ''
  }

  return (
    <form onSubmit={handleSubmit}>
      <input ref={inputRef} {...rest} />
    </form>
  )
}
