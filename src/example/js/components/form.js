import {
    Collapsable,
    Form,
    Selector,
    Toggle,
    Radio
} from "../../../";

export default class ExampleForm extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return(
            <Collapsable title="Collapsable Section" style={{ padding: '24px' }}>
                <Collapsable title="Collapsable Form 1">
                    <Form>
                        <Collapsable title="Dropdown selectors">
                            <Selector label="Select a number" content={[1, 2, 3]} name="selector-number" />
                            <Selector label="Select a letter" content={['A', 'B', 'C']} name="selector-letter" />
                        </Collapsable>
                        <Collapsable title="Toggle switches">
                            <Toggle label="Test toggle 1" name="toggle1" on></Toggle>
                            <Toggle label="Test toggle 2" name="toggle2"></Toggle>
                        </Collapsable>
                        <Collapsable title="Radio buttons">
                            <Radio label="Select an option" name="radio-option" content={["Option 1", "Option 2", "Option 3"]} />
                        </Collapsable>
                    </Form>
                </Collapsable>
                <Collapsable title="Collapsable Form 2">
                    <Form>
                        <Collapsable title="Dropdown selectors">
                            <Selector content={[4, 5, 6]} name="selector-number" />
                            <Selector content={['D', 'E', 'F']} name="selector-letter" />
                        </Collapsable>
                        <Collapsable title="Toggle switches">
                            <Toggle label="Test toggle 3" name="toggle3" on></Toggle>
                            <Toggle label="Test toggle 4" name="toggle4"></Toggle>
                        </Collapsable>
                        <Collapsable title="Radio buttons">
                            <Radio label="Select a different option" name="radio-option" content={["Option A", "Option B", "Option C"]} />
                        </Collapsable>
                    </Form>
                </Collapsable>
            </Collapsable>
        )
    }

}