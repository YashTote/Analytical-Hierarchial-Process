import { Fragment, useRef, useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { createPortal } from "react-dom";
import EditNameModal from "../field_names";
export let crit, alt;

export default function Modal({ isOpen, onExit, closeIntro, obtainData }) {
  const [open, setOpen] = useState(true);
  const [empty, setEmpty] = useState(true);
  const [data, setData] = useState({ criteria: 0, alternatives: 0 });
  // alert(isOpen.isOpen);
  const cancelButtonRef = useRef(null);
  // closes intro+Modal
  function intro() {
    onExit(false);
    closeIntro(false);
    obtainData(data.criteria, data.alternatives);
  }
  //  onlyCloses Modal subjected to include allow afterwards
  function onlyExit() {
    onExit(false);
  }

  useEffect(() => {
    if (
      !(data.criteria < 0 || data.criteria > 9) ||
      data.alternatives < 0 ||
      data.alternatives > 9
    ) {
      setEmpty(false);
    }
  });
  // }

  useEffect(() => {
    if (
      data.criteria < 0 ||
      data.criteria > 9 ||
      data.alternatives < 0 ||
      data.alternatives > 9
    ) {
      alert("Please enter values between 1 and 9 only.");
    }
  });

  function handleCriteria(e) {
    setData({
      ...data,
      criteria: e.target.value,
    });   
  }
  function handleAlternatives(e) {
    setData({
      ...data,
      alternatives: e.target.value,
    });
  }
  crit = data.criteria;
  alt = data.alternatives;
  if (!isOpen) return null;
  else
    return createPortal(
      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          initialFocus={cancelButtonRef}
          onClose={setOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-5xl">
                  <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-12">
                    <div className="sm:flex sm:items-start">
                      <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                        <Dialog.Title
                          as="h3"
                          className="text-lg font-medium leading-6 text-gray-900"
                        >
                          Enter the criteria and alternatives considered.
                        </Dialog.Title>

                        <div className="mt-2">
                          <div>
                            <label
                              htmlFor="price"
                              className="block text-sm font-medium text-gray-700"
                            >
                              Criteria Considered range(1-10 only):
                            </label>
                            <div className="relative mt-1 rounded-md shadow-sm">
                              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"></div>
                              <input
                                type="number"
                                name="price"
                                id="price"
                                className="rounded border-2 hover:border-dotted border-blue-200  border- pl-3 pr-1 focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                                placeholder="5"
                                onChange={handleCriteria}
                                // value="5"
                              />
                            </div>
                          </div>

                          <div class="py-6 ">
                            <label
                              htmlFor="price"
                              className="pd block text-sm font-medium text-gray-700"
                            >
                              Alternatives range(1-10 only):
                            </label>
                            <div className="relative mt-1 rounded-md shadow-sm">
                              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"></div>
                              <input
                                type="number"
                                name="price"
                                id="price"
                                onChange={handleAlternatives}
                                className="rounded pb- border-2 hover:border-violet-600 border-blue-200  border- pl-3 pr-1 focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                                placeholder="4"
                                // value="5"
                              />
                            </div>
                          </div>

                          <p className="text-sm text-gray-500">
                            Please be careful while deciding the Values and Names. This
                            can't be changed later!
                          </p>
                        </div>
                      </div>
                    </div>
                    <EditNameModal critValue={data.criteria} altValue={data.alternatives}/>
                  </div>
                  <div className=" bg-slate-100 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <button
                      type="button"
                      className="inline-flex w-full justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                      disabled={empty}
                      onClick={intro}
                    >
                      Confirm
                    </button>

                    {/* cancel button */}
                    <button
                      type="button"
                      className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                      onClick={onlyExit}
                      ref={cancelButtonRef}
                    >
                      Cancel
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>,
      document.getElementById("portal")
    );
}
