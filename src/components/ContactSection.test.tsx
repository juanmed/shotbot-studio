import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi, beforeEach, afterEach } from "vitest";

import ContactSection from "@/components/ContactSection";
import { I18nProvider } from "@/lib/i18n";

const renderContact = () =>
  render(
    <I18nProvider>
      <ContactSection />
    </I18nProvider>,
  );

const completeRequiredFields = () => {
  fireEvent.change(screen.getByPlaceholderText("이름"), { target: { value: "테스트 사용자" } });
  fireEvent.change(screen.getByPlaceholderText("이메일"), { target: { value: "test@example.com" } });
  fireEvent.change(screen.getByDisplayValue("이벤트 유형"), { target: { value: "wedding" } });
};

describe("ContactSection privacy consent", () => {
  beforeEach(() => {
    vi.stubGlobal("fetch", vi.fn());
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("shows the privacy policy in a dialog", () => {
    renderContact();

    fireEvent.click(screen.getByRole("button", { name: "개인정보 처리방침" }));

    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "개인정보 처리방침" })).toBeInTheDocument();
    expect(screen.getByText(/수집하는 개인정보 항목/)).toBeInTheDocument();
  });

  it("blocks submission and shows a Korean consent error when unchecked", () => {
    renderContact();
    completeRequiredFields();

    fireEvent.submit(screen.getByRole("button", { name: "문의 보내기" }).closest("form")!);

    expect(screen.getByRole("alert")).toHaveTextContent("개인정보 처리방침에 동의해 주세요");
    expect(fetch).not.toHaveBeenCalled();
  });

  it("clears the consent error and submits after consent is checked", async () => {
    vi.mocked(fetch).mockResolvedValue(
      new Response(JSON.stringify({ success: true }), { status: 200 }),
    );
    renderContact();
    completeRequiredFields();

    const form = screen.getByRole("button", { name: "문의 보내기" }).closest("form")!;
    fireEvent.submit(form);
    expect(screen.getByRole("alert")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("checkbox", { name: /개인정보 수집 및 이용에 동의합니다/ }));
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
    fireEvent.submit(form);

    await waitFor(() => expect(screen.getByText("문의가 전송되었습니다!")).toBeInTheDocument());
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(JSON.parse(vi.mocked(fetch).mock.calls[0][1]?.body as string)).toMatchObject({
      "Privacy policy consent": "Yes",
    });
  });
});
