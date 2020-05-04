import {
    Navigation,
    NavigationButton,
    NavigationLogo,
    NavigationGroup,
    HamburgerMenu
} from "../../../";

import mainLogoWhite from "../../assets/images/jsw-logo-white.png";

export default class ExampleNavigation extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return(
            <Navigation shrink={120} hide={1040} showOnScrollUp>
                <NavigationLogo href="." image={mainLogoWhite} />
                <NavigationGroup>
                    <NavigationButton href="." label="Examples" />
                    <NavigationButton href="." label="Docs" />
                    <NavigationButton href="." label="Blog" />
                    <NavigationButton href="." label="Tutorial" />
                </NavigationGroup>
                <HamburgerMenu buttonType="topwide">
                    <NavigationGroup>
                        <NavigationButton href="." label="Examples" />
                        <NavigationButton href="." label="Docs" />
                        <NavigationButton href="." label="Blog" />
                        <NavigationButton href="." label="Tutorial" />
                    </NavigationGroup>
                    <NavigationGroup>
                        <NavigationButton href="." label="Contact" />
                        <NavigationButton href="." label="Privacy" />
                        <NavigationButton href="." label="Terms & Conditions" />
                    </NavigationGroup>
                </HamburgerMenu>
            </Navigation>
        );
    }
}