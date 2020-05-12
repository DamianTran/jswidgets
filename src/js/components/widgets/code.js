import styles from "../../../css/components/widgets/code.scss";

import Prism from 'prismjs';

export default class Code extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div className="jsw-code">
                {this.props.children}
            </div>
        );
    }
}