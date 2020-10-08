import Button from "../primitives/button";
import Input from "../primitives/input";

import styles from "../../../css/components/widgets/modal.scss";

export default class Modal extends React.Component {

    static defaultProps = {
        options: [
            'OK'
        ],
        open: false
    };

    constructor(props) {
        super(props);

        this.state = {
            header: props.header,
            body: props.body,
            open: props.open,
            options: props.options
        };

        this.frame = React.createRef();
    }

    respond = label => {

        this.close();
        
        if(this.callback) {
            this.callback(label);
        }

    }

    setText = (header, body) => {
        this.setState({
            header: header,
            body: body
        });
    }

    prompt = (header, body, callback, options = [ 'OK' ]) => {
        this.setState({
            header: header,
            body: body,
            options: options
        });
        this.open();
        this.callback = callback;
    }

    open = () => {
        this.setState({
            open: true
        });
    }

    close = () => {
        this.setState({
            open: false
        });
    }

    handleClick = event => {
        let clickState = this.frame.current.contains(event.target);

        if(!clickState) {
            this.setState({
                open: false
            });
        }
    }

    render() {

        const { open, header, body, options } = this.state;

        let buttons = [];

        options.map((label, i) => {
            buttons[i] = <Button 
                            value={label} 
                            key={label} 
                            onClick={() => {this.respond(label)}} />;
        });
        

        return (
            <div className={`jsw-modal${ open ? " open" : ""}`}>
                <div className="jsw-modal-frame" ref={this.frame}>
                    <button className='jsw-close' onClick={this.close}></button>
                    <h1>{header}</h1>
                    <p>{body}</p>
                    <div className="jsw-modal-children">
                        {this.props.children}
                    </div>
                    <div className="jsw-modal-buttons">
                        {buttons}
                    </div>
                </div>
            </div>
        )
    }

    componentDidMount = () => {
        document.addEventListener('mousedown', this.handleClick, false);
    }

    componentWillUnmount = () => {
        document.removeEventListener('mousedown', this.handleClick, false);
    }
}

export { Modal };