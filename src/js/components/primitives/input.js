import styles from "../../../css/components/primitives/input";

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
    }

    handleChange = event => {
        console.log(event);
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
            var labelDOM = <label for={this.labelID}>{label}</label>
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
                readonly={readonly} 
                value={value} 
                onChange={this.handleChange}></textarea>
        } else {
            var inputDOM = 
            <input 
                id={this.labelID}
                type={type} 
                style={this.props.style} 
                placeholder={placeholder}
                readonly={readonly} 
                value={value} 
                onChange={this.handleChange} />
        }

        return(
            <div className="jsw-input">
                {labelDOM}
                {inputDOM}
            </div>
        );

    }

}