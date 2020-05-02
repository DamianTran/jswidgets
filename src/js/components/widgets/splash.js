import styles from "../../../css/components/widgets/splash.scss"

import Indicator from "../primitives/indicator";

class SplashCenter extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            image: props.image,
            title: props.title,
            message: props.message,
            indicator: props.indicator
        };
    }

    render() {
        const { image, title, message } = this.state;

        return(
            <div className="jsw-splash-main">
                <img src={image} alt="Splash image"/>
                <h1 className="jsw-splash-header">{title}</h1>
                <h3 className="jsw-splash-message">{message}</h3>
            </div>
        );
    }
}

export default class SplashCard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            scrolled: this.props.scrolled || false,
            ready: false,
            waitComplete: false
        };

        this.animLength = props.animLength ? props.animLength : 1500;
        this.anim = props.anim ? props.anim : "fade";
        this.wait = this.props.wait ? this.props.wait : 2000,

        $('html, body')
            .addClass("jsw-scroll-controlled");

        $(window)
            .on('load', () => {
                this.setState({
                    ready: true
                });
            });
    }

    render() {

        const { 
            scrolled, 
            ready,
            indicator,
            waitComplete
        } = this.state;

        $("html, body")
            .stop()
            .animate({scrollTop: 0}, 1200);

        return(
            [
                <div className={`jsw-splash-card-placeholder${ scrolled ? " scrolled" : ""}`} key={0}></div>,
                <div className={`jsw-splash-card${ scrolled ? " scrolled" : "" }`} key={1} ref={node => this.node = node}> 
                    <div className="jsw-splash-card-container" ref={container => this.container = container}>
                        {this.props.children}
                        <Indicator 
                            type={indicator} 
                            active={waitComplete}
                            label="Scroll"/>
                    </div>
                </div>
            ]
        )
    }

    onWheelScroll = event => {

        if(this.state.ready && this.state.waitComplete) {

            this.setState({
                scrolled: true
            })

            $(this.node)
                .one('transitionend', function() {
                    $('html, body')
                        .removeClass("jsw-scroll-controlled")
                });
            $(this.container)
                .animate({opacity: 0}, 1000);

            document.removeEventListener('wheel', this.onWheelScroll, false);

        }
    }

    componentDidMount() {
        document.addEventListener('wheel', this.onWheelScroll, false);

        setTimeout(() => {
            this.setState({
                waitComplete: true
            })
        }, this.wait);

        $(this.container)
            .animate({opacity: 1}, this.animLength);
    }

    componentWillUnmount() {
        document.removeEventListener('wheel', this.onWheelScroll, false);
    }
}

export { 
    SplashCenter,
    SplashCard 
};