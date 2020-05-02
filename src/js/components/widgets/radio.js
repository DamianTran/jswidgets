import styles from "../../../css/components/widgets/radio.scss";

var JSRadioUID = 0;

class RadioItem extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            value: props.value,
            selected: props.selected,
            id: props.id,
            index: props.index
        }

        this.onSelect = props.onSelect;
    }

    static getDerivedStateFromProps(props, state) {
        return({
            value: props.value,
            selected: props.selected,
            id: props.id,
            index: props.index
        });
    }

    render = () => {
        const {selected, index, id, value} = this.state;

        return(
            <div className={`jsw-radio-item${ index == selected ? " selected" : "" }`} value={value} onClick={() => {this.onSelect(index)}}>
                <label htmlFor={id}>{value}</label>
                <button type="button" id={id} className="jsw-radio-button"></button>
            </div>
        )
    }
}

export default class Radio extends React.Component {
    constructor(props) {
        super(props);

        this.state ={
            selected: props.selected ? props.selected : 0,
            content: props.content ? props.content : [],
            label: props.label ? props.label : ""
        };
    }

    selectItem = (index) => {
        this.setState({
            selected: index
        });
    }

    fill = (content) => {
        let items = [];
        const { selected } = this.state;

        if(content) {
            let i = 0;
            for(const item of content) {
                let id = "jsradio-" + JSRadioUID;
                ++JSRadioUID;

                items.push(<RadioItem key={item} index={i} value={item} id={id} selected={selected} onSelect={this.selectItem}/>);
                ++i;
            }
        }

        return items;

    }

    render() {

        const {
            content,
            label
        } = this.state;

        return (
            <div className="jsw-radio">
                <h3>{label}</h3>
                {this.fill(content)}
            </div>
        );
    }
}