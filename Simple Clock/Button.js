import React from 'react';


class Button extends React.Component {
    shouldComponentUpdate(nextProps) {
        const {change: currentChange, locale: currentLocale } = this.props;
        const {change:nextChange, locale: nextLocale} = nextProps;
        
        if(currentChange === nextChange && nextLocale === currentLocale ) {
            return false;
        }
        return true;
    }
    render(){
        
        const {change, locale, show} = this.props;
        return(
            <button type="button" onClick={() => change(locale)}>
                {locale === 'bn-BD' ? 'Change Clock '+ show : 'Ghori Change Korun ' + show}
            </button>
        )
    }
} 

export default Button;
