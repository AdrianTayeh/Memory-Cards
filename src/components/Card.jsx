import '../Card.css';
import PropTypes from 'prop-types';

function Card({ pokemon, onClick}) {
    return (
        <div className="card" onClick={() => onClick(pokemon)}>
            <img src={pokemon.image} alt={pokemon.name} />
            <p>{pokemon.name}</p>
        </div>
    );
}
Card.propTypes = {
    pokemon: PropTypes.shape({
        image: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
    }).isRequired,
    onClick: PropTypes.func.isRequired,
};

export default Card;