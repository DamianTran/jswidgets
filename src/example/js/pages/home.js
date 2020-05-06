/* Example app */

import {
    Parallax,
    SplashCenter,
    SplashCard,
    SplashSequence,
    ScrollFade,
    TimedFade
} from "../../..";

import ExampleNavigation from "../components/navigation";
import ExampleForm from "../components/form";

import custom_styles from "../../css/styles.scss";

import mainLogo from "../../assets/images/jsw-logo.png";
import mainLogoWhite from "../../assets/images/jsw-logo-white.png";
import splashImage2 from "../../assets/images/jsw-bricks.png";
import landscapeImage from "../../assets/images/landscape.jpg";
import starryImage from "../../assets/images/milkyway.jpg";

import favicon from "../../assets/images/favicon.ico";

const ExampleSplash = () => {
    return(
        <SplashSequence>
            <SplashCard wait={1800} animLength={2000} first>
                <SplashCenter image={mainLogo} title="JSWidgets" message="An extensive component library for ReactJS.  Do more in less time with JSWidgets." />
            </SplashCard>
            <SplashCard wait={1500} animLength={1200} style={{
                backgroundColor: 'rgb(255,170,0)'
            }} indicatorColor='white' first>
                <SplashCenter image={splashImage2} title="A building block system with high level components." message="JSWidgets lets you repeat, nest, and copy modular widgets with ease.  It just works!"
                style={{ color: 'white' }} />
            </SplashCard>
            <SplashCard wait={1500} animLength={1200} first>
                <SplashCenter title="A more Reactive toolkit" message="Continue on to see more examples of how JSWidgets can be readily incorporated with your site.">
                    <i className='jsw-example jsw-splash fas fa-tools'></i>
                </SplashCenter>
            </SplashCard>
        </SplashSequence>
    );
}

const ExampleParallax = () => {
    return(
        <div>
        <Parallax image={landscapeImage} style={{
            width: '100%',
            height: 'calc(100vh - 64px)'
        }}>
            <TimedFade>
                <div className="example-parallax">
                    <img src={mainLogoWhite} alt="JSWidgets main logo" />
                    <h1>This is JSWidgets.</h1>
                    <h3>A ReactJS component library with the speed of rapid prototyping and the quality of professional production.</h3>
                </div>
            </TimedFade>
        </Parallax>
        <Parallax image={starryImage} style={{
            width: '100%',
            height: 'calc(100vh - 64px)'
        }} parallaxStyle={{
            filter: 'brightness(70%)'
        }} scaleY={0.3}>
            <ScrollFade in out>
                <div className="example-parallax">
                    <h1>Everything you're seeing has been built with the JSWidgets library.</h1>
                    <h3>Consult the examples from the navigation bar above, or continue scrolling to read more.</h3>
                </div>
            </ScrollFade>
        </Parallax>
        </div>
    );
}

class ExampleApp extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div>
                <ExampleSplash />
                <ExampleNavigation />
                <ExampleParallax />
            </div>
        )
    }

}

let e = document.querySelector("#root");
ReactDOM.render(<ExampleApp />, e);

