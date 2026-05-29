import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import WriteKudosInput from "./write-kudos-input";

describe("WriteKudosInput", () => {
  it("renders without crashing", () => {
    render(<WriteKudosInput />);
    expect(
      screen.getByText("Hôm nay, bạn muốn gửi lời cảm ơn và ghi nhận đến ai?")
    ).toBeInTheDocument();
  });

  it("renders pencil icon (✏) in write button", () => {
    const { container } = render(<WriteKudosInput />);
    const spans = container.querySelectorAll("span");
    const hasIcon = Array.from(spans).some((s) => s.textContent === "✏");
    expect(hasIcon).toBe(true);
  });

  it("renders two pill buttons with correct text", () => {
    render(<WriteKudosInput />);
    expect(
      screen.getByText("Hôm nay, bạn muốn gửi lời cảm ơn và ghi nhận đến ai?")
    ).toBeInTheDocument();
    expect(
      screen.getByText("Tìm kiếm profile Sunner")
    ).toBeInTheDocument();
  });

  it("opens dialog when write button is clicked", async () => {
    render(<WriteKudosInput />);
    const writeButton = screen.getByText(
      "Hôm nay, bạn muốn gửi lời cảm ơn và ghi nhận đến ai?"
    ).closest("button");

    fireEvent.click(writeButton!);

    await waitFor(() => {
      expect(
        screen.getByText("Tính năng ghi nhận sẽ sớm ra mắt.")
      ).toBeInTheDocument();
    });
  });

  it("opens dialog when search button is clicked", async () => {
    render(<WriteKudosInput />);
    const searchButton = screen.getByText(
      "Tìm kiếm profile Sunner"
    ).closest("button");

    fireEvent.click(searchButton!);

    await waitFor(() => {
      expect(
        screen.getByText("Tính năng ghi nhận sẽ sớm ra mắt.")
      ).toBeInTheDocument();
    });
  });

  it("closes dialog when close button is clicked", async () => {
    render(<WriteKudosInput />);
    const writeButton = screen.getByText(
      "Hôm nay, bạn muốn gửi lời cảm ơn và ghi nhận đến ai?"
    ).closest("button");

    fireEvent.click(writeButton!);

    await waitFor(() => {
      expect(
        screen.getByText("Tính năng ghi nhận sẽ sớm ra mắt.")
      ).toBeInTheDocument();
    });

    const closeButton = screen.getByText("Đóng");
    fireEvent.click(closeButton);

    await waitFor(() => {
      expect(
        screen.queryByText("Tính năng ghi nhận sẽ sớm ra mắt.")
      ).not.toBeInTheDocument();
    });
  });

  it("closes dialog when backdrop is clicked", async () => {
    const { container } = render(<WriteKudosInput />);
    const writeButton = screen.getByText(
      "Hôm nay, bạn muốn gửi lời cảm ơn và ghi nhận đến ai?"
    ).closest("button");

    fireEvent.click(writeButton!);

    await waitFor(() => {
      expect(
        screen.getByText("Tính năng ghi nhận sẽ sớm ra mắt.")
      ).toBeInTheDocument();
    });

    const dialog = container.querySelector('[role="dialog"]');
    fireEvent.click(dialog!);

    await waitFor(() => {
      expect(
        screen.queryByText("Tính năng ghi nhận sẽ sớm ra mắt.")
      ).not.toBeInTheDocument();
    });
  });
});
