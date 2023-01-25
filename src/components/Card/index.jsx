import './styles.css';

//recebendo propriedades, pois o react conheçe o props, assim vai renderisar legal
export function Card(props) {
    return(
    <div className='card'>
        <strong>{props.name}</strong>
        <small>{props.time}</small>
    </div>
    )
}
