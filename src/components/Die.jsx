import { PropTypes } from 'prop-types'

export default function Die(props) {
    return (
        <button
            style={{ backgroundColor: props.isHeld ? "#59E391" : "white" }}
            onClick={props.onClick}
            aria-label={`Die with a value of ${props.val}. Currently is ${props.isHeld ? "held" : "not held"}`}
            aria-pressed={props.isHeld}
        >
                {props.val}
        </button>
    )
}

Die.propTypes = {
    val: PropTypes.number.isRequired,
    isHeld: PropTypes.bool.isRequired,
    onClick: PropTypes.function
}