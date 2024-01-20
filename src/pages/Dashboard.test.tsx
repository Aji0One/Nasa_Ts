import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import Dashboard from "./Dashboard";
import userEvent from "@testing-library/user-event";
import axios from "axios";


const mockData = {
    Name: "(2010 PK9)",
    Nasa_Jpl_DB_Link:
        "http://ssd.jpl.nasa.gov/sbdb.cgi?sstr=3542519",
    Is_Dangerous: "True"
}

const mockedUsedNavigate = jest.fn();


jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedUsedNavigate,

}));

describe("Dashboard", () => {

    beforeEach(() => {
        jest.spyOn(axios, "get").mockResolvedValue({
            data: { current: mockData },
        });
    });


    afterEach(() => {
        jest.clearAllMocks();
    });


    test("Rendering the title of the doc", () => {
        render(<Dashboard />);
        const title = screen.getByRole("heading", { level: 2 });
        expect(title).toHaveTextContent("Asteroid Search");
    })
    test("Checking for input value in input field", () => {
        render(<Dashboard />);
        const input = screen.getByRole("textbox");
        expect(input).toBeInTheDocument();
        screen.debug();
        fireEvent.change(input, { target: { value: "12345" } });
        screen.debug();
        expect(input).toHaveValue("12345");
    })

    test("calling random function on onclick randombtn", async () => {
        const randomHandle = jest.fn();
        render(<Dashboard />);
        const randombtn = screen.getByRole("button", { name: "Random Asteroid" });
        await userEvent.click(randombtn, randomHandle());
        expect(randomHandle).toHaveBeenCalledTimes(1);
    })

    test("calling handleForm on onClick form submit", async () => {
        const formHandle = jest.fn();

        render(<Dashboard />);
        const submitbtn = screen.getByRole("button", { name: "Submit" });
        fireEvent.submit(submitbtn, formHandle());
        expect(formHandle).toHaveBeenCalledTimes(1);

    })

    describe("when API call is successful", () => {
        test("calling the api in handleForm", async () => {

            render(<Dashboard />);

            const submitbtn = screen.getByRole("button", { name: "Submit" });
            fireEvent.submit(submitbtn);

            jest.spyOn(axios, "get").mockResolvedValue({
                data: { current: mockData },
            });

        })
    })
})