import renderer from 'react-test-renderer';
import { Letter } from "../Letter";
import { cleanup, render } from '@testing-library/react';
import { screen } from '@testing-library/dom'

afterEach(cleanup);

describe("Letter tests", () => {
    it("Component matches snapshot", () => {
        const component = renderer.create(
            <Letter letter="А" inRiddles inStone/>
        );
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });

    it("Component is not rendered if inStone=false and inRiddle=false", () => {
        render(<Letter letter="А" inRiddles={false} inStone={false} />);
        expect(screen.queryByLabelText(/Буква/)).toBeNull();
        expect(screen.queryByText(/^А$/)).toBeNull();
    });

    it("Letter case is not changed", () => {
        render(<Letter letter="А" inRiddles inStone />);
        expect(screen.queryByText(/^А$/)).not.toBeNull();
        expect(screen.queryByText(/^а$/)).toBeNull();
    });

    it("Letter passed in 'letter' prop is rendered", () => {
        render(<Letter letter="Ж" inRiddles inStone />);
        expect(screen.getByText("Ж")).toBeTruthy();
    });

    it("If only inRiddles prop is specified, tooltip text is correct", () => {
        render(<Letter letter="Б" inRiddles inStone={false} />);
        expect(screen.queryByLabelText(/^Буква Б использована вами в загадках, но не использована на камне$/)).toBeTruthy();
    });

    it("If only inStone prop is specified, tooltip text is correct", () => {
        render(<Letter letter="Г" inRiddles={false} inStone />);
        expect(screen.queryByLabelText(/^Буква Г использована вами на камне, но не использована в загадках$/)).toBeTruthy();
    });

    it("If both inStone and inRiddles are specified, tooltip text is correct", () => {
        render(<Letter letter="Д" inRiddles inStone />);
        expect(screen.queryByLabelText(/^Буква Д использована вами на камне и в загадках$/)).toBeTruthy();
    });
});