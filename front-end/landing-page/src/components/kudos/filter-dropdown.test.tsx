import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import FilterDropdown from "./filter-dropdown";

describe("FilterDropdown", () => {
  const mockOptions = ["Marketing", "Engineering", "Design"];
  const mockOnChange = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders button with label when no value selected", () => {
    render(
      <FilterDropdown
        label="Phòng ban"
        options={mockOptions}
        value={null}
        onChange={mockOnChange}
      />
    );
    expect(screen.getByText("Phòng ban")).toBeInTheDocument();
  });

  it("renders button with selected value", () => {
    render(
      <FilterDropdown
        label="Phòng ban"
        options={mockOptions}
        value="Engineering"
        onChange={mockOnChange}
      />
    );
    expect(screen.getByText("Engineering")).toBeInTheDocument();
  });

  it("opens dropdown when button is clicked", async () => {
    render(
      <FilterDropdown
        label="Phòng ban"
        options={mockOptions}
        value={null}
        onChange={mockOnChange}
      />
    );

    const button = screen.getByText("Phòng ban");
    fireEvent.click(button);

    await waitFor(() => {
      mockOptions.forEach((opt) => {
        expect(screen.getByText(opt)).toBeInTheDocument();
      });
    });
  });

  it("shows clear option in dropdown", async () => {
    render(
      <FilterDropdown
        label="Phòng ban"
        options={mockOptions}
        value={null}
        onChange={mockOnChange}
      />
    );

    const button = screen.getByText("Phòng ban");
    fireEvent.click(button);

    await waitFor(() => {
      const clearOption = screen.getAllByText("Phòng ban")[1];
      expect(clearOption).toBeInTheDocument();
    });
  });

  it("calls onChange with selected value when option is clicked", async () => {
    render(
      <FilterDropdown
        label="Phòng ban"
        options={mockOptions}
        value={null}
        onChange={mockOnChange}
      />
    );

    const button = screen.getByText("Phòng ban");
    fireEvent.click(button);

    await waitFor(() => {
      const engineeringOption = screen.getAllByText("Engineering")[0];
      fireEvent.click(engineeringOption);
    });

    expect(mockOnChange).toHaveBeenCalledWith("Engineering");
  });

  it("calls onChange with null when clear option is selected", async () => {
    render(
      <FilterDropdown
        label="Phòng ban"
        options={mockOptions}
        value="Engineering"
        onChange={mockOnChange}
      />
    );

    const button = screen.getByText("Engineering");
    fireEvent.click(button);

    await waitFor(() => {
      const options = screen.getAllByRole("option");
      const clearOption = options[0]; // First option is always the clear/label option
      fireEvent.click(clearOption);
    });

    expect(mockOnChange).toHaveBeenCalledWith(null);
  });

  it("closes dropdown after selection", async () => {
    render(
      <FilterDropdown
        label="Phòng ban"
        options={mockOptions}
        value={null}
        onChange={mockOnChange}
      />
    );

    const button = screen.getByText("Phòng ban");
    fireEvent.click(button);

    await waitFor(() => {
      const engineeringOption = screen.getAllByText("Engineering")[0];
      fireEvent.click(engineeringOption);
    });

    await waitFor(() => {
      const listbox = screen.queryByRole("listbox");
      expect(listbox).not.toBeInTheDocument();
    });
  });

  it("closes dropdown after option selection", async () => {
    render(
      <FilterDropdown
        label="Phòng ban"
        options={mockOptions}
        value={null}
        onChange={mockOnChange}
      />
    );

    const button = screen.getByText("Phòng ban");
    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByRole("listbox")).toBeInTheDocument();
    });

    const options = screen.getAllByRole("option");
    fireEvent.click(options[1]); // Click first option after clear

    await waitFor(() => {
      expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
    });
  });

  it("toggles dropdown when button is clicked again", async () => {
    render(
      <FilterDropdown
        label="Phòng ban"
        options={mockOptions}
        value={null}
        onChange={mockOnChange}
      />
    );

    const button = screen.getByText("Phòng ban");

    fireEvent.click(button);
    await waitFor(() => {
      expect(screen.getByRole("listbox")).toBeInTheDocument();
    });

    fireEvent.click(button);
    await waitFor(() => {
      expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
    });
  });

  it("has aria-expanded attribute", async () => {
    render(
      <FilterDropdown
        label="Phòng ban"
        options={mockOptions}
        value={null}
        onChange={mockOnChange}
      />
    );

    const button = screen.getByRole("button", { expanded: false });
    expect(button).toHaveAttribute("aria-expanded", "false");

    fireEvent.click(button);

    await waitFor(() => {
      expect(button).toHaveAttribute("aria-expanded", "true");
    });
  });

  it("marks selected option with aria-selected", async () => {
    render(
      <FilterDropdown
        label="Phòng ban"
        options={mockOptions}
        value="Engineering"
        onChange={mockOnChange}
      />
    );

    const button = screen.getByText("Engineering");
    fireEvent.click(button);

    await waitFor(() => {
      const options = screen.getAllByRole("option");
      const selectedOption = options.find(
        (opt) => opt.textContent === "Engineering"
      );
      expect(selectedOption).toHaveAttribute("aria-selected", "true");
    });
  });
});
