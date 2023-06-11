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
        query(collection(db, "forms"), orderBy("updatedAt", "desc"))
      );

      console.log("Forms", forms);

      let formsData = forms.docs.map((form) => {
        return new FormType({
          id: form.id,
          ...form.data(),
        });
      });

      console.log("formsData", formsData);

      return formsData;
    },
    {
      refetchOnWindowFocus: false,
    }
  );
};
