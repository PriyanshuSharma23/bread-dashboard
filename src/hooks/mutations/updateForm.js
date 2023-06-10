import { useMutation, useQueryClient } from "@tanstack/react-query";
import { db } from "../../firebase";
import { doc, updateDoc } from "firebase/firestore";

/**
 * @typedef {Object} UpdateFormMutation
 * @property {import('../../types/formType').FormType['id']} FormId
 *
 *
 * @param {FormId} param0
 */
export const useFormMutation = ({ formId }) => {
  let queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["form update", formId],
    mutationFn: async ({ form, updates }) => {
      form = formId;
      await updateDoc(doc(db, "forms", form), {
        ...updates,
        updatedAt: new Date(),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["form", formId] });
    },
  });
};
