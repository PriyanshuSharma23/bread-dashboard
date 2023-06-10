import { useQuery } from "@tanstack/react-query";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../firebase";
import { useFormQuery } from "./useFormQuery";

const nextIdFromRef = (ref) => {
  let segments = ref._key.path.segments;
  let newNext = segments[segments.length - 1];

  return newNext;
};

export const useFormQuestions = ({ formId }) => {
  const formsQuery = useFormQuery({ formId });

  return useQuery({
    enabled: formsQuery.data != null,
    staleTime: 0.5 * 60 * 60 * 1000, // 30 minutes
    queryKey: ["form questions", formsQuery.data],
    refetchOnWindowFocus: false,
    queryFn: async (params) => {
      let form = params.queryKey[1];
      console.log("form", form);
      console.log("params", params);
      let formQuestions = await getDocs(
        collection(db, "forms", form.id, "questions")
      );

      let docs = formQuestions.docs.map((doc) => {
        return {
          ...doc.data(),
          id: doc.id,
        };
      });

      if (docs.length === 0) {
        return [];
      }

      console.log("docs", form.start, form);

      let ordered = [];
      let nextId = nextIdFromRef(form.start);
      let stack = [nextId];
      let visited = new Set();
      let runs = 0;

      console.log("nextID", nextId);
      while (stack.length > 0 && runs < 100) {
        let nextId = stack.pop();

        if (!visited.has(nextId)) {
          let doc = docs.find((doc) => doc.id === nextId);
          ordered.push(doc);
          visited.add(nextId);

          if ("next" in doc) {
            if (doc.next !== null) {
              stack.push(nextIdFromRef(doc.next));
            }
          } else {
            if ("options" in doc) {
              for (let j = 0; j < doc.options.length; j++) {
                let option = doc.options[j];
                if (option.next !== null) {
                  stack.push(nextIdFromRef(option.next));
                }
              }
            }
          }
        }

        runs++;
      }

      return ordered;
    },
  });
};

// let q = [
//   {
//     id: "41InS19LVhCc5VoeUbHm",
//     type: "text",
//     key: "age",
//     text: {
//       malayalam: "എന്താണ് നിന്റെ പേര്?",
//       english: "What is your name?",
//     },
//     next: {
//       converter: null,
//       _key: {
//         path: {
//           segments: [
//             "projects",
//             "code-to-give-breads",
//             "databases",
//             "(default)",
//             "documents",
//             "forms",
//             "IDtwe0lZDI7dBSeoHOZm",
//             "questions",
//             "fhdA9XSX0C9c8RFOlSt0",
//           ],
//           offset: 5,
//           len: 4,
//         },
//       },
//       type: "document",
//       firestore: {
//         app: {
//           _isDeleted: false,
//           _options: {
//             apiKey: "AIzaSyBC8vgQ8WDgJcUNwyLQAFVnUVAsvlSyjtM",
//             authDomain: "code-to-give-breads.firebaseapp.com",
//             projectId: "code-to-give-breads",
//             storageBucket: "code-to-give-breads.appspot.com",
//             messagingSenderId: "670362121297",
//             appId: "1:670362121297:web:8670a3cdb2d956482bb470",
//             measurementId: "G-ZZFVXJGLNK",
//           },
//           _config: {
//             name: "[DEFAULT]",
//             automaticDataCollectionEnabled: false,
//           },
//           _name: "[DEFAULT]",
//           _automaticDataCollectionEnabled: false,
//           _container: {
//             name: "[DEFAULT]",
//             providers: {},
//           },
//         },
//         databaseId: {
//           projectId: "code-to-give-breads",
//           database: "(default)",
//         },
//         settings: {
//           host: "firestore.googleapis.com",
//           ssl: true,
//           ignoreUndefinedProperties: false,
//           cacheSizeBytes: 41943040,
//           experimentalForceLongPolling: false,
//           experimentalAutoDetectLongPolling: true,
//           experimentalLongPollingOptions: {},
//           useFetchStreams: true,
//         },
//       },
//     },
//     required: true,
//   },
//   {
//     id: "7iHoqkcxmkGESjKVaUPJ",
//     text: "What is your locality",
//     options: [
//       {
//         next: null,
//         option: "Alappuzha",
//       },
//       {
//         next: null,
//         option: "Ernakulam",
//       },
//       {
//         option: "Idukki",
//         next: null,
//       },
//       {
//         option: "Kannur",
//         next: null,
//       },
//       {
//         next: null,
//         option: "Kasaragod",
//       },
//       {
//         next: null,
//         option: "Kollam",
//       },
//       {
//         next: null,
//         option: "Kottayam",
//       },
//       {
//         option: "Kozhikode",
//         next: null,
//       },
//       {
//         next: null,
//         option: "Malappuram",
//       },
//       {
//         option: "Palakkad",
//         next: null,
//       },
//       {
//         option: "Pathanamthitta",
//         next: null,
//       },
//       {
//         next: null,
//         option: "Thiruvananthapuram",
//       },
//       {
//         option: "Thrissur",
//         next: null,
//       },
//       {
//         next: null,
//         option: "Wayanad",
//       },
//     ],
//     type: "single-correct",
//     key: "district",
//     required: true,
//   },
//   {
//     id: "CBNZUMk0kw74v8F4lR35",
//     text: "On a scale of 1 to 10, with 1 being not at all and 10 being extremely, how would you rate your current level of stress or emotional distress?",
//     required: true,
//     minLength: 1,
//     type: "slider",
//     next: {
//       converter: null,
//       _key: {
//         path: {
//           segments: [
//             "projects",
//             "code-to-give-breads",
//             "databases",
//             "(default)",
//             "documents",
//             "forms",
//             "IDtwe0lZDI7dBSeoHOZm",
//             "questions",
//             "41InS19LVhCc5VoeUbHm",
//           ],
//           offset: 5,
//           len: 4,
//         },
//       },
//       type: "document",
//       firestore: {
//         app: {
//           _isDeleted: false,
//           _options: {
//             apiKey: "AIzaSyBC8vgQ8WDgJcUNwyLQAFVnUVAsvlSyjtM",
//             authDomain: "code-to-give-breads.firebaseapp.com",
//             projectId: "code-to-give-breads",
//             storageBucket: "code-to-give-breads.appspot.com",
//             messagingSenderId: "670362121297",
//             appId: "1:670362121297:web:8670a3cdb2d956482bb470",
//             measurementId: "G-ZZFVXJGLNK",
//           },
//           _config: {
//             name: "[DEFAULT]",
//             automaticDataCollectionEnabled: false,
//           },
//           _name: "[DEFAULT]",
//           _automaticDataCollectionEnabled: false,
//           _container: {
//             name: "[DEFAULT]",
//             providers: {},
//           },
//         },
//         databaseId: {
//           projectId: "code-to-give-breads",
//           database: "(default)",
//         },
//         settings: {
//           host: "firestore.googleapis.com",
//           ssl: true,
//           ignoreUndefinedProperties: false,
//           cacheSizeBytes: 41943040,
//           experimentalForceLongPolling: false,
//           experimentalAutoDetectLongPolling: true,
//           experimentalLongPollingOptions: {},
//           useFetchStreams: true,
//         },
//       },
//     },
//     maxLength: 10,
//     key: "stress_level",
//   },
//   {
//     id: "ON2ozlzj7lHQLQaoCi7Z",
//     type: "single-correct",
//     text: "How familiar are you with drugs?",
//     key: "familiarity",
//     required: true,
//     options: [
//       {
//         option: "Very",
//         next: {
//           converter: null,
//           _key: {
//             path: {
//               segments: [
//                 "projects",
//                 "code-to-give-breads",
//                 "databases",
//                 "(default)",
//                 "documents",
//                 "forms",
//                 "IDtwe0lZDI7dBSeoHOZm",
//                 "questions",
//                 "CBNZUMk0kw74v8F4lR35",
//               ],
//               offset: 5,
//               len: 4,
//             },
//           },
//           type: "document",
//           firestore: {
//             app: {
//               _isDeleted: false,
//               _options: {
//                 apiKey: "AIzaSyBC8vgQ8WDgJcUNwyLQAFVnUVAsvlSyjtM",
//                 authDomain: "code-to-give-breads.firebaseapp.com",
//                 projectId: "code-to-give-breads",
//                 storageBucket: "code-to-give-breads.appspot.com",
//                 messagingSenderId: "670362121297",
//                 appId: "1:670362121297:web:8670a3cdb2d956482bb470",
//                 measurementId: "G-ZZFVXJGLNK",
//               },
//               _config: {
//                 name: "[DEFAULT]",
//                 automaticDataCollectionEnabled: false,
//               },
//               _name: "[DEFAULT]",
//               _automaticDataCollectionEnabled: false,
//               _container: {
//                 name: "[DEFAULT]",
//                 providers: {},
//               },
//             },
//             databaseId: {
//               projectId: "code-to-give-breads",
//               database: "(default)",
//             },
//             settings: {
//               host: "firestore.googleapis.com",
//               ssl: true,
//               ignoreUndefinedProperties: false,
//               cacheSizeBytes: 41943040,
//               experimentalForceLongPolling: false,
//               experimentalAutoDetectLongPolling: true,
//               experimentalLongPollingOptions: {},
//               useFetchStreams: true,
//             },
//           },
//         },
//       },
//       {
//         option: "Moderate",
//         next: {
//           converter: null,
//           _key: {
//             path: {
//               segments: [
//                 "projects",
//                 "code-to-give-breads",
//                 "databases",
//                 "(default)",
//                 "documents",
//                 "forms",
//                 "IDtwe0lZDI7dBSeoHOZm",
//                 "questions",
//                 "CBNZUMk0kw74v8F4lR35",
//               ],
//               offset: 5,
//               len: 4,
//             },
//           },
//           type: "document",
//           firestore: {
//             app: {
//               _isDeleted: false,
//               _options: {
//                 apiKey: "AIzaSyBC8vgQ8WDgJcUNwyLQAFVnUVAsvlSyjtM",
//                 authDomain: "code-to-give-breads.firebaseapp.com",
//                 projectId: "code-to-give-breads",
//                 storageBucket: "code-to-give-breads.appspot.com",
//                 messagingSenderId: "670362121297",
//                 appId: "1:670362121297:web:8670a3cdb2d956482bb470",
//                 measurementId: "G-ZZFVXJGLNK",
//               },
//               _config: {
//                 name: "[DEFAULT]",
//                 automaticDataCollectionEnabled: false,
//               },
//               _name: "[DEFAULT]",
//               _automaticDataCollectionEnabled: false,
//               _container: {
//                 name: "[DEFAULT]",
//                 providers: {},
//               },
//             },
//             databaseId: {
//               projectId: "code-to-give-breads",
//               database: "(default)",
//             },
//             settings: {
//               host: "firestore.googleapis.com",
//               ssl: true,
//               ignoreUndefinedProperties: false,
//               cacheSizeBytes: 41943040,
//               experimentalForceLongPolling: false,
//               experimentalAutoDetectLongPolling: true,
//               experimentalLongPollingOptions: {},
//               useFetchStreams: true,
//             },
//           },
//         },
//       },
//       {
//         next: null,
//         option: "None",
//       },
//     ],
//   },
//   {
//     id: "fhdA9XSX0C9c8RFOlSt0",
//     required: true,
//     next: {
//       converter: null,
//       _key: {
//         path: {
//           segments: [
//             "projects",
//             "code-to-give-breads",
//             "databases",
//             "(default)",
//             "documents",
//             "forms",
//             "IDtwe0lZDI7dBSeoHOZm",
//             "questions",
//             "7iHoqkcxmkGESjKVaUPJ",
//           ],
//           offset: 5,
//           len: 4,
//         },
//       },
//       type: "document",
//       firestore: {
//         app: {
//           _isDeleted: false,
//           _options: {
//             apiKey: "AIzaSyBC8vgQ8WDgJcUNwyLQAFVnUVAsvlSyjtM",
//             authDomain: "code-to-give-breads.firebaseapp.com",
//             projectId: "code-to-give-breads",
//             storageBucket: "code-to-give-breads.appspot.com",
//             messagingSenderId: "670362121297",
//             appId: "1:670362121297:web:8670a3cdb2d956482bb470",
//             measurementId: "G-ZZFVXJGLNK",
//           },
//           _config: {
//             name: "[DEFAULT]",
//             automaticDataCollectionEnabled: false,
//           },
//           _name: "[DEFAULT]",
//           _automaticDataCollectionEnabled: false,
//           _container: {
//             name: "[DEFAULT]",
//             providers: {},
//           },
//         },
//         databaseId: {
//           projectId: "code-to-give-breads",
//           database: "(default)",
//         },
//         settings: {
//           host: "firestore.googleapis.com",
//           ssl: true,
//           ignoreUndefinedProperties: false,
//           cacheSizeBytes: 41943040,
//           experimentalForceLongPolling: false,
//           experimentalAutoDetectLongPolling: true,
//           experimentalLongPollingOptions: {},
//           useFetchStreams: true,
//         },
//       },
//     },
//     type: "multi-correct",
//     key: "substance_used",
//     options: ["Nicotine", "Alcohol", "Weeds", "Heroine"],
//     text: "Which of the following substances do you believe are commonly used among your peers or in your locality in general?",
//   },
// ];

// ON2ozlzj7lHQLQaoCi7Z (option)

//1. CBNZUMk0kw74v8F4lR35
//  41InS19LVhCc5VoeUbHm
// fhdA9XSX0C9c8RFOlSt0
// 7iHoqkcxmkGESjKVaUPJ
