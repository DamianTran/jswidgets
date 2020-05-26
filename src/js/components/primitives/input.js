import styles from "../../../css/components/primitives/input.scss";

var JSWLabelUID = 0;

export default class Input extends React.Component {

    static defaultProps = {
        animation: 'static',
        paragraph: false,
        placeholder: "",
        label: "",
        type: 'text',
        readOnly: false,
        value: ""
    };

    constructor(props) {
        super(props);

        this.state = {
            value: props.value,
            focus: false,
            readOnly: props.readOnly,
            placeholder: props.placeholder,
            type: props.type,
            label: props.label,
            animation: props.animation,
            paragraph: props.paragraph,
            required: props.required
        };

        this.labelID = "jsw-input-" + JSWLabelUID;
        ++JSWLabelUID;

        this.parentOnChange = props.onChange;
        this.parentOnTrigger = props.onTrigger;
        this.icon = props.icon;
        this.input = React.createRef();

        this.lastPropsValue = props.value;
        this.lastStateValue = this.state.value;
    }

    static getDerivedStateFromProps = (props, state) => {
        if(this.lastPropsValue !== props.value) {
            this.lastPropsValue = props.value;
            return({
                value: props.value,
                readOnly: props.readOnly
            });
        } else {
            return({});
        }
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

    value = () => {
        return this.state.value;
    }

    validate = () => {
        if(this.input.current.checkValidity()) {
            return true;
        } else {
            this.input.current.reportValidity();
            return false;
        }
    }

    render() { 

        const {
            value,
            focus,
            readOnly,
            type,
            label,
            placeholder,
            animation,
            required,
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
                readOnly={readOnly} 
                value={value} 
                onChange={this.handleChange}
                onFocus={this.onFocus}
                onBlur={this.onBlur}
                onKeyDown={this.onKeyDown}
                ref={this.input}
                required={required}></textarea>
        } else {
            var inputDOM = 
            <input 
                id={this.labelID}
                type={type} 
                style={this.props.style} 
                placeholder={placeholder}
                readOnly={readOnly} 
                value={value} 
                onChange={this.handleChange}
                onFocus={this.onFocus}
                onBlur={this.onBlur}
                onKeyDown={this.onKeyDown}
                ref={this.input}
                required={required} />
        }

        return(
            <div 
                className={ `jsw-input${ focus ? " focus": "" }`}>
                {this.icon ? <div className='jsw-icon'>{this.icon}</div> : null}
                {labelDOM}
                <div className="jsw-input-wrapper">
                    {inputDOM}
                    { readOnly ? null : <div className="jsw-close" onClick={this.clear}></div> }
                </div>
            </div>
        );

    }

}