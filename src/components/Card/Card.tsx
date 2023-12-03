import { CardModel } from '../../types/models';
import './Card.scss';

interface CardProps {
  card: CardModel;
}

function Card({ card }: CardProps) {
  return (
    <div className="card">
      <div className="card__inner">
        <div className="card__line">
          <span className="card__title">Name: </span>
          {card?.name}
        </div>
        <div className="card__line">
          <span className="card__title">Age: </span>
          {card?.age}
        </div>
        <div className="card__line">
          <span className="card__title">Email: </span>
          {card?.email}
        </div>
        <div className="card__line">
          <span className="card__title">Password: </span>
          {card?.password}
        </div>
        <div className="card__line">
          <span className="card__title">Gender: </span>
          {card?.gender}
        </div>
        <div className="card__line">
          <span className="card__title">Image: </span>
          {card?.image}
        </div>
      </div>
    </div>
  );
}

export default Card;
