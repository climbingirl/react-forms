import Card from '../../components/Card/Card';
import { useAppSelector } from '../../hooks/redux';
import { cardsSelector } from '../../store/cardsSelectors';
import './Home.scss';

function Home() {
  const { cards } = useAppSelector(cardsSelector);

  if (!cards.length) {
    return <section className="home-empty">No cards created!</section>;
  }

  return (
    <section className="home">
      <div className="cards">
        {cards.map((card) => (
          <Card card={card} key={card.name + card.password} />
        ))}
      </div>
    </section>
  );
}

export default Home;
