
import { render, screen, fireEvent } from "@testing-library/react";
import PaymentForm from "../components/PaymentForm"; // Adjust the path accordingly

describe("PaymentForm Component", () => {
  beforeEach(() => {
    render(<PaymentForm />);
  });

  test("renders the payment form correctly", () => {
    expect(screen.getByText("Pay Invoice")).toBeInTheDocument();
    expect(screen.getByText("Payment amount")).toBeInTheDocument();
    expect(screen.getByText("$500.00")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /pay \$500.00/i })).toBeInTheDocument();
  });

  test("allows user to enter card details", () => {
    fireEvent.change(screen.getByPlaceholderText("Name on card"), {
      target: { value: "John Doe" },
    });
    fireEvent.change(screen.getByPlaceholderText("Card number"), {
      target: { value: "4111111111111111" },
    });
    fireEvent.change(screen.getByPlaceholderText("MM / YY"), {
      target: { value: "12/25" },
    });
    fireEvent.change(screen.getByPlaceholderText("Security code"), {
      target: { value: "123" },
    });
    fireEvent.change(screen.getByPlaceholderText("ZIP/Postal code"), {
      target: { value: "10001" },
    });
    
    expect(screen.getByPlaceholderText("Name on card")).toHaveValue("John Doe");
    expect(screen.getByPlaceholderText("Card number")).toHaveValue("4111111111111111");
    expect(screen.getByPlaceholderText("MM / YY")).toHaveValue("12/25");
    expect(screen.getByPlaceholderText("Security code")).toHaveValue("123");
    expect(screen.getByPlaceholderText("ZIP/Postal code")).toHaveValue("10001");
  });

  test("disables the pay button if required fields are empty", () => {
    const payButton = screen.getByRole("button", { name: /pay \$500.00/i });
    expect(payButton).toBeDisabled();
  });

  test("enables the pay button when all fields are filled", () => {
    fireEvent.change(screen.getByPlaceholderText("Name on card"), {
      target: { value: "John Doe" },
    });
    fireEvent.change(screen.getByPlaceholderText("Card number"), {
      target: { value: "4111111111111111" },
    });
    fireEvent.change(screen.getByPlaceholderText("MM / YY"), {
      target: { value: "12/25" },
    });
    fireEvent.change(screen.getByPlaceholderText("Security code"), {
      target: { value: "123" },
    });
    fireEvent.change(screen.getByPlaceholderText("ZIP/Postal code"), {
      target: { value: "10001" },
    });
    
    expect(screen.getByRole("button", { name: /pay \$500.00/i })).toBeEnabled();
  });
});
