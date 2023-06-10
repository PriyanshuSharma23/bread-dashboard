import { useQuery } from "@tanstack/react-query";
import { getDoc, doc } from "firebase/firestore";
import { db } from "../firebase";
import { FormType } from "../types/formType";

export const useFormQuery = ({ formId }) => {
  return useQuery(
    ["form", formId],
    async (params) => {
      let [, formId] = params.queryKey;

      let form = await getDoc(doc(db, "forms", formId));

      return new FormType({
        id: form.id,
        ...form.data(),
      });
    },
    {
      refetchOnWindowFocus: false,
    }
  );
};
