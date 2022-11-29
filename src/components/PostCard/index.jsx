import './styles.css'

export const PostCard = ({ id, cover, title, body }) => {
  return (
    <div className="post">
      <img src={cover} alt={title} />
      <div className="post-content">
        <h1>{title} id: {id}</h1>
        <p>{body}</p>
      </div>
    </div>
  )
}