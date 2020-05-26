import style from '../../../css/components/containers/collapsable.css';

var JSCollapsableUID = 0;

export default class Collapsable extends React.Component {

    static defaultProps = {
        open: true
    }

    constructor(props) {
        super(props);
        
        this.hasClickOff = props.hasClickOff ? props.hasClickOff : false;

        this.state = {
            open: props.open,
            title: props.title
        }
        this.overflowTimeout = null;

        this.labelid = "jsw-collapsable-" + JSCollapsableUID;
        ++JSCollapsableUID;
    }

    buttonToggle = () => {
        this.setState({
            open: !this.state.open
        });
    }

    render() {

        const {
            open,
            height
        } = this.state;

        return(
            <div className={`jsw-collapsable${ open ? " open" : ""}`} style={this.props.style}>
                <div className="jsw-collapsable-header">
                    <label htmlFor={this.labelid}>{this.state.title}</label>
                    <button 
                        type="button" 
                        id={this.labelid}
                        className="jsw-collapsable-button" onClick={this.buttonToggle}>
                        <div className="jsw-chevron"></div>
                    </button>
                </div>
                <div className="jsw-child-container" ref={node => this.node = node} style={{
                    maxHeight: open ? height : 0
                }}>
                    {this.props.children}
                </div>
            </div>
        )
    }

    componentDidMount() {
        const { open } = this.state;

        if(open) {
            this.setState({
                height: $(this.node).height()
            });
        }
    }

    componentDidUpdate() {
        const { open } = this.state;
        if(open) {
            this.overflowTimeout = setTimeout(() => {
                $(this.node).css('overflow', 'visible');
            }, 350);
        } else {
            if(this.overflowTimeout) {
                clearTimeout(this.overflowTimeout);
                this.overflowTimeout = null;
            }

            $(this.node)
                .css('overflow', 'hidden');
        }
    }

}