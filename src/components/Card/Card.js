import './Card.css'

const Card = ( { id, location, description, deleteSighting }) => {

  return (
    <div className='card'>
      <p>{location}</p>
      <p>{description}</p>
      <button onClick={() => deleteSighting(id)}>Delete</button>
    </div>
  )
}

export default Card