export default class ExtendableComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    extendState(state) {
        this.state = {...this.state, ...state};
    }
}