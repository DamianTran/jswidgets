import styles from "../../../css/components/widgets/select.scss";

import ClickZone from "../primitives/clickzone";

class SelectorItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: false,
            value: this.props.value
        };
        this.ref = React.createRef();
        this.onSelect = this.props.onSelect;
    }

    render() {
        const { value } = this.state;
        return(
            <div className='jsw-selector-item' value={value} ref={this.ref} onClick={() => {this.onSelect(value)}}>{value}</div>
        )
    }
}

var JSDropdownUID = 0;

export default class Selector extends ClickZone {
    constructor(props) {
        super(props);
        this.extendState({
            open: false,
            value: "",
            showAll: true,
            options: props.options,
            content: props.content,
            label: props.label
        });
        this.buttonType = props.buttonType ? props.buttonType : "chevron";
        this.labelid = "jsw-selector-" + JSDropdownUID;
        ++JSDropdownUID;
    }

    buttonToggle = () => {

        this.setState({
            open: !this.state.open,
            showAll: this.state.open && this.clicked ? this.state.showAll : true
        });

        if(!this.state.open) {
            this.input.focus();
        }
    }

    open = () => {
        this.setState({
            open: true,
            clicked: true
        });
    }

    close = () => {
        this.setState({
            open: false
        });
    }

    selectItem = value => {
        this.setState({
            value: value,
            open: false
        });
    }

    fill = content => {
        let items = [];
        let regex = new RegExp(`(${this.state.value})`, 'i');
        const {showAll, value} = this.state;
        if(content) {
            for(const item of content) {
                if(showAll || !value || regex.test(item)) {
                    items.push(<SelectorItem key={item} value={item} onSelect={this.selectItem}/>);
                }
            }
        }
        return items;
    }

    onType = (e) => {
        this.setState({
            showAll: false,
            value: e.target.value
        });
    }

    render = () => {

        const {
            open,
            clicked,
            content,
            value,
            label
        } = this.state;

        switch(this.buttonType) {
            case 'triangle':
                var buttonDOM = <div className="jsw-triangle"></div>
                break;
            default:
                var buttonDOM = <div className="jsw-chevron"></div>
        }

        if(label) {
            var labelDOM = <label htmlFor={this.labelid}>{label}</label>
        } else {
            var labelDOM = null;
        }

        return(
            <div 
                className={`jsw-selector${ open && clicked ? " open" : "" }`} 
                ref={node => this.node = node}>
                {labelDOM}
                <div className="jsw-selector-main">
                    <input 
                        type="text" 
                        onChange={this.onType} 
                        onFocus={this.open}
                        value={value}
                        ref={input => this.input = input}></input>
                    <button 
                        type="button" className="jsw-selector-button" onClick={this.buttonToggle}
                        id={this.labelid}>
                    {buttonDOM}
                    </button>
                    <div className="jsw-selector-list">
                        {this.fill(content)}
                    </div>
                </div>
            </div>
        );
    }

    
};