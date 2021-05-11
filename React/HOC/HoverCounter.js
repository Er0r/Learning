import withCounter from './HOC/WithCounter';

const HoverCounter = (props) => {
   const {count, incrementCount } = props;
    return(
       
        <div>
            <h1 type="button" onMouseOver = { incrementCount }>Clicked { count } Times</h1>
        </div>
        
    )
}

export default withCounter(HoverCounter);
