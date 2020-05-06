import {
    Navigation,
    NavigationButton,
    NavigationLogo,
    NavigationGroup,
    NavigationDropdown,
    HamburgerMenu,
    Column,
    DropdownItem
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
                    <NavigationDropdown  label="Examples" arrow="triangle">
                        <Column>
                            <h3>Basic</h3>
                            <DropdownItem label="Input" href="./input.html"></DropdownItem>
                            <DropdownItem label="Selectors" href="./selectors.html"></DropdownItem>
                            <DropdownItem label="Collapsable" href="./collapsable.html"></DropdownItem>
                            <DropdownItem label="Parallax" href="./parallax.html"></DropdownItem>
                            <DropdownItem label="Navigation" href="./navigation.html"></DropdownItem>
                        </Column>
                        <Column>
                            <h3>Intermediate</h3>
                            <DropdownItem label="Forms" href="./form.html"></DropdownItem>
                            <DropdownItem label="Interfaces" href="./interfaces.html"></DropdownItem>
                        </Column>
                        <Column>
                            <h3>Advanced</h3>
                            <DropdownItem label="Games" href="./games.html"></DropdownItem>
                        </Column>
                    </NavigationDropdown>
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