import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

describe(
    "Contracts Page",
    () => {

        test(
            "renders contracts heading",
            () => {

                render(
                    <h1>Contracts</h1>
                );

                expect(
                    screen.getByText(
                        "Contracts"
                    )
                ).toBeInTheDocument();

            }
        );

    }
);