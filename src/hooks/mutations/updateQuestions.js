import { useMutation } from "@tanstack/react-query";

export const useUpdateQuestions = ({ formId }) => {
  return useMutation({
    mutationKey: ["form questions update", formId],
    mutationFn: async ({ questions, newQuestions }) => {},
  });
};
