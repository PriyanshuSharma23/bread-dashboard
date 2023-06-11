import { Dialog, Transition } from "@headlessui/react";
import { QRCodeCanvas } from "qrcode.react";
import { Fragment } from "react";

export const ShareWindow = ({ url, open, setOpen, form }) => {
  let closeModal = () => {
    setOpen(false);
  };

  console.log("URL", url);

  return (
    <Transition appear show={open} as={Fragment}>
      <Dialog as="div" className="relative z-30" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className=" text-3xl font-medium leading-6  text-gray-900"
                >
                  Share
                  <br />
                  <span className="text-4xl font-bold">{form.formName}</span>
                </Dialog.Title>
                <div className="">
                  <div className="flex flex-col gap-2">
                    <div className="grid flex-grow place-content-center py-2">
                      <QRCodeCanvas
                        value={url}
                        size={214}
                        className="mx-auto rounded-md "
                        // bgColor="rgb(38 38 38)"
                        // fgColor="#fff"
                        // includeMargin
                        // renderAs="svg"
                        id="qr-code"
                      />
                    </div>
                    {/* <div className="h-80 w-[1px] rounded-full bg-neutral-400"></div> */}
                    <div className="flex-grow px-4">
                      <p className="text-sm">Created By</p>
                      <p className="text-2xl font-bold">{form.createdBy}</p>

                      <p className="mt-3 text-sm">Form created </p>
                      <p className=" text-2xl font-bold ">
                        {new Date(form.createdAt.seconds * 1000).toDateString()}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-7 flex items-center justify-center gap-4">
                  <button
                    className="inline-flex justify-center rounded-md border border-transparent bg-neutral-900 px-4 py-2 text-sm font-medium text-white hover:bg-neutral-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    onClick={() => {
                      navigator.clipboard.writeText(url);
                    }}
                  >
                    <svg
                      width={30}
                      height={30}
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M17.5 14H19C20.1046 14 21 13.1046 21 12V5C21 3.89543 20.1046 3 19 3H12C10.8954 3 10 3.89543 10 5V6.5M5 21H12C13.1046 21 14 20.1046 14 19V12C14 10.8954 13.1046 10 12 10H5C3.89543 10 3 10.8954 3 12V19C3 20.1046 3.89543 21 5 21Z"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                  <button
                    className="inline-flex justify-center rounded-md border border-transparent bg-neutral-900 px-4 py-2 text-sm font-medium text-white hover:bg-neutral-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    onClick={() => {
                      document.getElementById("qr-code").toBlob((blob) => {
                        const a = document.createElement("a");
                        a.href = URL.createObjectURL(blob);
                        a.download = `${form.formName}-QR.png`;
                        a.click();
                      });
                    }}
                  >
                    <svg
                      width={30}
                      height={30}
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M20 14V18C20 19.1046 19.1046 20 18 20H6C4.89543 20 4 19.1046 4 18V14M12 15L12 3M12 15L8 11M12 15L16 11"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};
