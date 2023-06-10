import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useFormQuery } from "../useFormQuery";
import { updateDoc, doc, runTransaction } from "firebase/firestore";
import { db } from "../../firebase";
import { useFormQuestions } from "../useFormQuestions";

/**
 * @typedef {Object} UpdateFormMutation
 * @property {import('../../types/formType').FormType} form
 *
 *
 * @param {UpdateFormMutation} param0
 */
export const useSyncQuestionsMutation = ({ formId }) => {
  const formQuery = useFormQuery({ formId });
  const formQuestionsQuery = useFormQuestions({ formId });

  let queryClient = useQueryClient();

  return useMutation(
    {
      mutationKey: ["syncQuestions", formId],
      mutationFn: async ({ formQuestions }) => {
        if (formQuestions.length === 0) return;
        if (!formQuestionsQuery.data) return;

        let equal = true;

        if (formQuestions.length !== formQuestionsQuery.data.length) {
          equal = false;
        }

        if (equal) {
          for (let i = 0; i < formQuestions.length; i++) {
            if (!formQuestions[i].isEqual(formQuestionsQuery.data[i])) {
              equal = false;
              break;
            }
          }
        }

        if (equal) {
          console.log("equal");
          return;
        }

        let promises = [];

        //   translation step
        for (let question of formQuestions) {
        }

        // assuming we have translated the formQuestions to the format that the API expects
        if (!formQuery.data) return;

        await runTransaction(db, async (transaction) => {
          const form = formQuery.data;

          let updates = {
            updatedAt: new Date(),
          };

          if (form.start == null || form.start !== formQuestions[0].id) {
            updates.start = formQuestions[0].id;
          }

          promises.push(
            transaction.update(doc(db, "forms", formId), updates, {
              merge: true,
            })
          );

          for (let question of formQuestions) {
            promises.push(
              transaction.set(
                doc(db, "forms", formId, "questions", question.id),
                question.getJSON()
              )
            );
          }

          await Promise.all(promises);
        });
      },
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["form questions"]);
      },
    }
  );
};
