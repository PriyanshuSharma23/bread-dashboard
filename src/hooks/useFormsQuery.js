import { useQuery } from "@tanstack/react-query";
import { db } from "../firebase";
import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";
import { FormType } from "../types/formType";

export const useFormsQuery = () => {
  return useQuery(
    ["forms"],
    async (_params) => {
      // let forms = await db.collection("forms").get();
      const forms = await getDocs(
        query(collection(db, "forms"), orderBy("updatedAt", "desc"), limit(5))
      );

      console.log("forms", forms);

      let formsData = forms.docs.map((form) => {
        return new FormType({
          id: form.id,
          ...form.data(),
        });
      });

      return formsData;
    },
    {
      refetchOnWindowFocus: false,
    }
  );
};
