import { Link } from "react-router-dom";
import { useState } from "react";

import { useFormsQuery } from "../hooks/useFormsQuery";
import { relativeTime } from "../utils/relTime";
import { useAddFormMutation } from "../hooks/mutations/addFormMutation";
import { ShareWindow } from "../components/Share";
import { Loader } from "../components/Loader";
import { getAuth } from "firebase/auth";
import Navbar from "../components/Navbar";

export const FormDashboard = () => {
  const formsQuery = useFormsQuery();
  const addFormMutation = useAddFormMutation();

  const auth = getAuth();

  let forms = formsQuery.data;

  if (formsQuery.isLoading) {
    return (
      <div className="fixed inset-0">
        <div className="m-auto">
          <Loader />
        </div>
      </div>
    );
  }
  return (
    <div className="">
      <Navbar />
      <div className="min-h-screen rounded-t-lg  bg-slate-50 pt-4  shadow-2xl lg:pt-8">
        <div className="mx-auto ml-20 px-4">
          <h1 className="text-3xl font-semibold text-neutral-600">
            Forms Dashboard
          </h1>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <button
              onClick={() => {
                addFormMutation.mutate({
                  forms: formsQuery.data,
                  user: auth.currentUser.displayName,
                });
              }}
              className="grid h-40  w-56 place-content-center rounded-md border border-dashed  border-neutral-800 text-neutral-600"
            >
              <svg
                width={50}
                height={50}
                viewBox="0 0 25 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="mx-auto mb-2"
              >
                <path
                  d="M12.4502 7.44751V17.4475"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M7.4502 12.4475H17.4502"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M12.4502 21.4475C17.4208 21.4475 21.4502 17.4181 21.4502 12.4475C21.4502 7.47695 17.4208 3.44751 12.4502 3.44751C7.47964 3.44751 3.4502 7.47695 3.4502 12.4475C3.4502 17.4181 7.47964 21.4475 12.4502 21.4475Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <p className="text-sm font-medium">Create a new Survey</p>
            </button>
            {forms.map((form) => (
              <FormCard form={form} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const shareIcon = (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M15.3156 16.6578L8.6938 13.3469M8.68439 10.6578L15.3125 7.34377M21 18C21 19.6569 19.6569 21 18 21C16.3431 21 15 19.6569 15 18C15 16.3431 16.3431 15 18 15C19.6569 15 21 16.3431 21 18ZM21 6C21 7.65685 19.6569 9 18 9C16.3431 9 15 7.65685 15 6C15 4.34315 16.3431 3 18 3C19.6569 3 21 4.34315 21 6ZM9 12C9 13.6569 7.65685 15 6 15C4.34315 15 3 13.6569 3 12C3 10.3431 4.34315 9 6 9C7.65685 9 9 10.3431 9 12Z"
      stroke="currentColor"
      strokeWidth="1.5"
    />
  </svg>
);

const editPen = (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M4 16L3.46967 15.4697C3.32902 15.6103 3.25 15.8011 3.25 16H4ZM17 3L17.5303 2.46967C17.2374 2.17678 16.7626 2.17678 16.4697 2.46967L17 3ZM21 7L21.5303 7.53033C21.8232 7.23744 21.8232 6.76256 21.5303 6.46967L21 7ZM8 20V20.75C8.19891 20.75 8.38968 20.671 8.53033 20.5303L8 20ZM4 20H3.25C3.25 20.4142 3.58579 20.75 4 20.75V20ZM12 19.25C11.5858 19.25 11.25 19.5858 11.25 20C11.25 20.4142 11.5858 20.75 12 20.75V19.25ZM20.5 20.75C20.9142 20.75 21.25 20.4142 21.25 20C21.25 19.5858 20.9142 19.25 20.5 19.25V20.75ZM4.53033 16.5303L17.5303 3.53033L16.4697 2.46967L3.46967 15.4697L4.53033 16.5303ZM16.4697 3.53033L20.4697 7.53033L21.5303 6.46967L17.5303 2.46967L16.4697 3.53033ZM20.4697 6.46967L7.46967 19.4697L8.53033 20.5303L21.5303 7.53033L20.4697 6.46967ZM8 19.25H4V20.75H8V19.25ZM4.75 20V16H3.25V20H4.75ZM13.4697 6.53033L17.4697 10.5303L18.5303 9.46967L14.5303 5.46967L13.4697 6.53033ZM12 20.75H20.5V19.25H12V20.75Z"
      fill="currentColor"
    />
  </svg>
);

/**
 *
 * @typedef {Object} FormCardProps
 * @property {import("../types/formType").FormType} form
 *
 * @param {FormCardProps} param0
 * @returns
 */
const FormCard = ({ form }) => {
  const { isDraft: draft, formName, updatedAt, createdAt } = form;
  const [showShare, setShowShare] = useState(false);

  return (
    <>
      <ShareWindow
        url={`https://code-to-give-2023-team9-frontend-sidtohan.vercel.app/form?formID=${form.id}&volunteerFormID=${form.id}`}
        open={showShare}
        setOpen={setShowShare}
        form={form}
      />
      <div className="min-w-56 relative h-40 flex-shrink-0  rounded-md bg-white p-2 shadow-md">
        <div className="flex justify-between">
          <h1 className="w-36 overflow-hidden text-ellipsis whitespace-nowrap text-xl">
            {formName}
          </h1>
          <div className="pl-4">
            <span
              className={`rounded-full   px-4  py-1 text-xs font-medium text-neutral-900 ${
                draft ? "bg-yellow-300" : "bg-green-300"
              }`}
            >
              {draft ? "Draft" : "Published"}
            </span>
          </div>
        </div>

        <div className="mt-0">
          <p className="text-sm text-neutral-500">
            Created {relativeTime(new Date(createdAt.seconds * 1000))}
          </p>
          <p className="text-sm text-neutral-500">
            Updated {relativeTime(new Date(updatedAt.seconds * 1000))}
          </p>
        </div>

        <div className="absolute inset-x-0 bottom-0 flex items-center justify-between p-2">
          <div className=""></div>
          <div className="flex">
            <button
              className="grid h-10 w-10 place-content-center rounded-full  p-1  hover:bg-neutral-200 active:bg-neutral-300 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-transparent"
              disabled={draft}
              onClick={() => {
                setShowShare(true);
              }}
            >
              {shareIcon}
            </button>
            <Link
              to={`/form-builder/${form.id}`}
              className="grid h-10 w-10 place-content-center rounded-full  p-1 hover:bg-neutral-200 active:bg-neutral-300"
            >
              {editPen}
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};
