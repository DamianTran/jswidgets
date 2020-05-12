import styles from "../../../css/components/primitives/input.scss";

var JSWLabelUID = 0;

export default class Input extends React.Component {

    static defaultProps = {
        animation: 'static',
        paragraph: false,
        placeholder: "",
        label: ""
    };

    constructor(props) {
        super(props);

        this.state = {
            value: "",
            focus: false,
            readonly: false,
            placeholder: props.placeholder,
            type: 'text',
            label: props.label,
            animation: props.animation,
            paragraph: props.paragraph
        };

        this.labelID = "jsw-input-" + JSWLabelUID;
        ++JSWLabelUID;

        this.parentOnChange = props.onChange;
        this.parentOnTrigger = props.onTrigger;
    }

    handleChange = event => {
        this.setState({
            value: event.target.value
        });

        if(this.parentOnChange) {
            this.parentOnChange(event);
        }
    }

    onTrigger = () => {
        if(this.parentOnTrigger) {
            this.parentOnTrigger(this.state.value);
        }
    }

    onFocus = () => {
        this.setState({
            focus: true
        });
    }

    onBlur = () => {
        this.setState({
            focus: false
        });
    }

    clear = event => {
        this.setState({
            value: ""
        });
        if(this.parentOnChange) {
            this.parentOnChange(event);
        }
    }

    onKeyDown = event => {
        if(event.key === 'Enter') {
            this.onTrigger();
        }
    }

    render() { 

        const {
            value,
            focus,
            readonly,
            type,
            label,
            placeholder,
            animation,
            paragraph
        } = this.state;

        if(label) {
            var labelDOM = <label htmlFor={this.labelID}>{label}</label>
        } else {
            var labelDOM = null;
        }

        if(paragraph) {
            var inputDOM = 
            <textarea 
                id={this.labelID}
                type={type} 
                style={this.props.style} 
                placeholder={placeholder} 
                readOnly={readonly} 
                value={value} 
                onChange={this.handleChange}
                onFocus={this.onFocus}
                onBlur={this.onBlur}
                onKeyDown={this.onKeyDown}></textarea>
        } else {
            var inputDOM = 
            <input 
                id={this.labelID}
                type={type} 
                style={this.props.style} 
                placeholder={placeholder}
                readOnly={readonly} 
                value={value} 
                onChange={this.handleChange}
                onFocus={this.onFocus}
                onBlur={this.onBlur}
                onKeyDown={this.onKeyDown} />
        }

        return(
            <div className={ `jsw-input${ focus ? " focus": "" }`}>
                {labelDOM}
                <div className="jsw-input-wrapper">
                    {inputDOM}
                    <button className="jsw-close" onClick={this.clear}></button>
                </div>
            </div>
        );

    }

}