import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useFormQuery } from "../useFormQuery";
import { updateDoc, doc, runTransaction } from "firebase/firestore";
import { db } from "../../firebase";
import { useFormQuestions } from "../useFormQuestions";

// const translate = async (text) => {
//   let response = await fetch("https://code-to-give.onrender.com/translate", {
//     method: "POST",
//     body: JSON.stringify({
//       text,
//       language: "malayalam",
//     }),
//     headers: {
//       "Content-Type": "application/json",
//     },
//   });

//   let data = await response.json();
//   console.log("Response from api", data);
//   return data.translatedText;
// };

const translate = async (text) => {
  if (text.length === 0) return text;

  const formData = new URLSearchParams();
  let apiKey =
    "trnsl.1.1.20230610T101022Z.df0eadfa9b801c0f.644b09efaca21b50d5ca109d4934eced8ae74262";
  let lang = "en-ml";
  formData.append("key", apiKey);
  formData.append("lang", lang);
  formData.append("text", text);

  const url = "https://translate.yandex.net/api/v1.5/tr.json/translate";

  let res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Accept: "*/*",
    },
    body: formData,
  });

  let data = await res.json();

  return data.text;
};

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

        let promises = [];
        console.log("Form Questions before mutation", formQuestions);
        //   translation step
        for (let i = 0; i < formQuestions.length; i++) {
          console.log(
            "Comparing",
            formQuestions[i],
            formQuestionsQuery.data[i]
          );
          if (formQuestions[i].isEqual(formQuestionsQuery.data[i])) {
            continue;
          }

          equal = false;

          formQuestions[i].text.malayalam = await translate(
            formQuestions[i].text.english
          );

          if (
            "options" in formQuestions[i] &&
            formQuestions[i].options.length > 0
          ) {
            console.log("Running inner loop");
            for (let j = 0; j < formQuestions[i].options.length; j++) {
              if ("option" in formQuestions[i].options[j]) {
                formQuestions[i].options[j].option.malayalam = await translate(
                  formQuestions[i].options[j].option.english
                );
              } else {
                // option question

                formQuestions[i].options[j].malayalam = await translate(
                  formQuestions[i].options[j].english
                );
              }
            }
          }
        }

        if (equal) {
          console.log("equal");
          return;
        }

        console.log("formQuestions", formQuestions);

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
