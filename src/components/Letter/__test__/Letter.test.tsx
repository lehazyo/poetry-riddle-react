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

  it("Letter passed in 'letter' prop is rendered", () => {
    render(<Letter letter="Ж" inRiddles inStone />);

    expect(screen.getByText("Ж")).toBeTruthy();
  });

  it("If only inRiddles prop is specified, only top block is rendered", () => {
    render(<Letter letter="Б" inRiddles inStone={false} />);

    expect(screen.queryByLabelText(/^Буква Б использована вами в загадках$/)).toBeTruthy();
    expect(screen.queryByLabelText(/^Буква Б использована вами на камне$/)).toBeNull();
  });

  it("If only inStone prop is specified, only bottom block is rendered", () => {
    render(<Letter letter="Г" inRiddles={false} inStone />);

    expect(screen.queryByLabelText(/^Буква Г использована вами в загадках$/)).toBeNull();
    expect(screen.queryByLabelText(/^Буква Г использована вами на камне$/)).toBeTruthy();
  });

  it("If both inStone and inRiddles are specified, both blocks are rendered", () => {
    render(<Letter letter="Д" inRiddles inStone />);

    expect(screen.queryByLabelText(/^Буква Д использована вами в загадках$/)).toBeTruthy();
    expect(screen.queryByLabelText(/^Буква Д использована вами на камне$/)).toBeTruthy();
  });
});