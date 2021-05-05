import React from 'react';
import Button from './Button';


class Clock extends React.Component {
    state = { 
        date: new Date(), 
        locale: 'bn-BD'
    };

    componentDidMount(){
        this.clockTimer = setInterval(() => this.tick(), 1000)
    }

    tick(){
        this.setState({
            date: new Date(),
        });
    }

    componentWillUnmount(){
        clearInterval(this.clockTimer);
    }

    handlerClick = (locale) => {
        this.setState({
            locale: locale
        }) 
    }

    render(){
        const {date, locale } = this.state;
        return (
        <>
            <h1 className="heading">
                <span className="text">{date.toLocaleTimeString(locale)}</span>
                <img src="" alt=""/>
            </h1>
            {locale === 'bn-BD' ? (
                <Button change={this.handlerClick} locale="en-US" show="false" enable/>
                   
            ) : (
                <Button change={this.handlerClick} locale="bn-BD" show enable />
            )}
        </>
        );
      
    }
}

export default Clock;
