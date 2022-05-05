import { SubmitFeedbackUseCase } from "./submit-feedback-use-case";

const createFeedbackSpy = jest.fn();
const sendMailSpy = jest.fn();

const submitFeedback = new SubmitFeedbackUseCase(
  { create: createFeedbackSpy },
  { sendMail: sendMailSpy }
);

describe("Submit feedback", () => {
  it("should be able to submit a feedback", async () => {
    await expect(
      submitFeedback.execute({
        type: "BUG",
        comment: "This is a bug",
        screenshot: "data:image/png;base64,asdsadasddasda",
      })
    ).resolves.not.toThrow();

    expect(createFeedbackSpy).toHaveBeenCalledWith();
    expect(sendMailSpy).toHaveBeenCalledWith();
  });

  it("should not able to submit a feedback without type", async () => {
    await expect(
      submitFeedback.execute({
        type: "",
        comment: "This is a bug",
        screenshot: "data:image/png;base64,asdsadasddasda",
      })
    ).rejects.toThrow();
  });

  it("should not able to submit a feedback without comment", async () => {
    await expect(
      submitFeedback.execute({
        type: "BUG",
        comment: "",
        screenshot: "data:image/png;base64,asdsadasddasda",
      })
    ).rejects.toThrow();
  });

  it("should not able to submit a feedback with an invalid screenshot", async () => {
    await expect(
      submitFeedback.execute({
        type: "BUG",
        comment: "bugado",
        screenshot: "teste.jpg",
      })
    ).rejects.toThrow();
  });
});
