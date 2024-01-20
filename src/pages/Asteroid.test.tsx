import { render, screen } from "@testing-library/react";
import Asteroid from "./Asteroid";

const stateMock = {
    name: "(2010 PK9)",
    nasa_jpl_url:
        "http://ssd.jpl.nasa.gov/sbdb.cgi?sstr=3542519",
    is_potentially_hazardous_asteroid: "True"
}


jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useLocation: () => ({
        state: stateMock
    })
}));

describe("Asteroid", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });
    test("Rendering the Asteroid", async () => {
        render(<Asteroid />);
        const title = await screen.findByRole("heading", { level: 4 });
        expect(title).toBeInTheDocument();
    })

    test("Rendering the list present in the Asteroid", async () => {
        render(<Asteroid />);
        const lists = await screen.findAllByRole("listitem");
        expect(lists).toHaveLength(3);
    })

    test("Rendering is Hazardious", async () => {

        render(<Asteroid />);
        const isHazard = screen.queryByTestId("hazard");
        expect(isHazard).toBeInTheDocument()

    })
})