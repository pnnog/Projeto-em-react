import './styles.css'

export const TextInput = ({ searchValue, handleChange, placeholder }) => {
  return (
    <>
      <label htmlFor="text-input"></label>
      <input
        value={searchValue}
        onChange={handleChange}
        type="search"
        className="text-input"
        name='text-input'
        id='text-input'
        placeholder={placeholder} />

    </>
  )
}