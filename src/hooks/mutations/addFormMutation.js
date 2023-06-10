import { useMutation, useQueryClient } from "@tanstack/react-query";
import { db } from "../../firebase";
import { addDoc, collection, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

export const useAddFormMutation = () => {
  let queryClient = useQueryClient();
  let router = useNavigate();

  return useMutation({
    mutationKey: ["add form"],
    mutationFn: async ({ forms }) => {
      if (!forms) {
        throw new Error("No forms");
      }
      let newName = "Untitled Survey";
      // check which Untitled Survey(n) is available
      for (let i = 1; i < 100; i++) {
        let name = `Untitled Survey(${i})`;
        let form = forms.find((form) => form.name === name);
        if (!form) {
          newName = name;
          break;
        }
      }

      let newForm = {
        formName: newName,
        createdBy: "user",
        isDraft: true,
        start: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      let doc = await addDoc(collection(db, "forms"), newForm);
      return { ...newForm, id: doc.id };
    },
    onSuccess: (val) => {
      let id = val.id;
      queryClient.invalidateQueries({ queryKey: ["forms"] });
      router("/form-builder/" + id);
    },
  });
};
