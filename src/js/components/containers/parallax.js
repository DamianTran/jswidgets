import styles from "../../../css/components/containers/parallax.scss";

export default class Parallax extends React.Component {

    static defaultProps = {
        scaleY: 0.2,
        scaleX: 0.2,
        offsetY: 0,
        offsetX: 0
    };

    constructor(props) {
        super(props);

        this.state = {
            image: props.image,
            offsetY: props.offsetY,
            offsetX: props.offsetX,
            scaleY: props.scaleY,
            scaleX: props.scaleX,
            baseOffsetX: 0,
            baseOffsetY: 0
        };

        if(props.scale) {
            this.state.scaleY = this.state.scaleX = props.scale;
        }

        if(props.offset) {
            this.state.offsetX = props.offsetX;
            this.state.offsetY = props.offsetY;
        }

        this.ref = React.createRef();
        this.container = React.createRef();
    }

    render() {

        const { 
            image,
            offsetY,
            scaleY,
            baseOffsetY,
            offsetX,
            scaleX,
            baseOffsetX
        } = this.state;

        let totalOffsetY = (offsetY - baseOffsetY) * scaleY;
        let totalOffsetX = (offsetX - baseOffsetX) * scaleX;

        let newWidth = 100 * (1 + scaleX);
        let newHeight = 100 * (1 + scaleY);

        return(
            <div className="jsw-parallax-container" style={this.props.style} ref={this.container}>
                <div className="jsw-child-container">
                    {this.props.children}
                </div>
                <div className="jsw-parallax-wrapper" ref={this.ref}>
                    <img className="jsw-parallax-image" src={image} alt="Parallax image"
                    style={{...this.props.parallaxStyle, ...{
                        transform: `translate(${totalOffsetX}px, ${totalOffsetY}px)`,
                        width: `${newWidth}%`,
                        height: `${newHeight}%`,
                        left: `${(100 - newWidth)/2}%`,
                        top: `${(100 - newHeight)/2}%`
                    }}}/>
                </div>
            </div>
        );

    }

    handleScroll = () => {

        let newY = this.scrollView.scrollTop();
        let newX = this.scrollView.scrollLeft();

        let $img = $(this.ref.current);

        this.setState({
            offsetY: newY,
            offsetX: newX,
            baseOffsetX: $img.offset().left,
            baseOffsetY: $img.offset().top
        });

    }

    componentDidMount() {

        let $closest = $(this.container.current)
                            .closest(".jsw-scroll-view");

        if($closest.length) {
            this.scrollView = $closest.eq(0);
        } else {
            this.scrollView = $(window);
        }

        this.scrollView
            .scroll(this.handleScroll);
    }

    componentWillUnmount() {
        this.scrollView
            .unbind('scroll', this.handleScroll);
    }

}

export { Parallax };