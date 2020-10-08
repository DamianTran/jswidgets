import styles from "../../../css/components/containers/view.scss";

export default class View extends React.Component {

    static defaultProps = {
        visible: true,
        scroll: true,
        switching: false,
        anim: "fade",
        index: 0
    };

    constructor(props) {
        super(props);

        this.state = {
            visible: props.visible,
            lastVisible: props.visible,
            index: props.index,
            lastIndex: props.index,
            switching: props.switching,
            lastSwitching: props.switching,
            scroll: props.scroll
        };
        
    }

    static getDerivedStateFromProps = (props, state) => {
        
        let output = {};

        if(props.index !== state.lastIndex) {
          output.lastIndex = output.index = props.index
        }
        if(props.visible != state.visible) {
          output.lastVisible = output.visible = props.visible;
        }
        if(props.switching !== state.lastSwitching) {
          output.lastSwitching = output.switching = props.switching;
        }

        return output;

    }

    getName = () => {
        return this.props.name;
    }

    show = () => {
        this.setState({
            visible: true
        });
    }

    hide = () => {
        this.setState({
            visible: false
        });
    }

    toggle = () => {
        this.setState({
            visible: !this.state.visible
        });
    }

    setScroll = state => {
        this.setState({
            scroll: state
        });
    }

    render() {

        const { visible, index, scroll } = this.state;
        const { className, anim, switching } = this.props;

        let style = {};

        switch(anim) {
            case 'slide':
                style = {
                    transform: `translateX(${index*100}%)`
                }
                break;
            default:
        }

        if(!switching && index) {
          return null;
        }

        return(
            <div 
                className={`jsw-view ${anim}${scroll ? "" : " noscroll"}${ visible ? "" : " hidden"}${className ? " " + className : ""}`}
                style={{...style, ...this.props.style}}>
                {this.props.children}
            </div>
        );
    }
}

export { View };