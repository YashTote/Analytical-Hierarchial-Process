import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";

// let exportCritName;

export let exportCritName = [];
export let exportAltName = [];
export default function EditNameModal({ critValue, altValue }) {
  let [isOpen, setIsOpen] = useState(false);
  let [criteriaName, setCriteriaName] = useState(new Array(critValue + 1));
  let [alternativeName, setAlternativeName] = useState(new Array(altValue + 1));


  var criteriaN = new Array();
  var alternativeN = new Array();

  for (let i = 0; i < critValue; i++) {
    criteriaN.push([`Criteria ${i}`, `Crit ${i+1}`]);
  }
  for (let i = 0; i < altValue; i++) {
    alternativeN.push([`Alternative ${i}`, `Alt ${i+1}`]);
  }

  function criteriaChanged(e) {
    let temp = criteriaName;
    temp[e.target.id] = e.target.value;
    setCriteriaName(temp);
   
  }
//    useEffect(() => {dispatch(getCrAndAltName({criteriaName, alternativeName}));}) 
  function alternativeChanged(e){
    let temp = alternativeName;
    temp[e.target.id] = e.target.value;
    setAlternativeName(temp);
   
  }

  exportCritName = criteriaName;
  exportAltName = alternativeName;
  var critForm = [];
  var altForm = [];
  for (let i = 0; i < critValue; i++) {
    critForm.push(
      <div className="top_element crit_element my-2">
        {
          <>
            <label>Criteria No. {i + 1}: </label>
            <input
              className="input_box border-2 px-1.5 rounded-md"
              defaultValue={criteriaN[i][1]}
              type="text"
              id={i+1}
              onChange={criteriaChanged}
            />
          </>
        }
      </div>
    );
  }
  
  for (let i = 0; i < altValue; i++) {
    altForm.push(
      <div className="top_element crit_element my-2">
        {
          <>
            <label>Alternative No. {i + 1}: </label>
            <input
              className="input_box border-2 px-1.5 rounded-md"
              defaultValue={alternativeN[i][1]}
              type="text"
              id={i+1}
              onChange={alternativeChanged}
            />
          </>
        }
      </div>
    );
  }

 const handleConfirm = () =>{
   setIsOpen(false);
   console.log(criteriaName);
   console.log(alternativeN);
   let jsonCriteria = JSON.stringify(criteriaName);
   let jsonAlternative = JSON.stringify(alternativeName);
//    console.log(jsonCriteria)
   localStorage.setItem('jsonCriteria', jsonCriteria);
   localStorage.setItem('jsonAlternative', jsonAlternative);
 }
 
//  useEffect(()) let jsonCriteria = JSON.stringify(criteriaName);
//  let jsonAlternative = JSON.stringify(alternativeName);
// //    console.log(jsonCriteria)
//  localStorage.setItem('jsonCriteria', jsonCriteria);
//  localStorage.setItem('jsonAlternative', jsonAlternative);

 console.log(criteriaName)
 console.log(alternativeName)

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
    let jsonCriteria = JSON.stringify(criteriaName);
    let jsonAlternative = JSON.stringify(alternativeName);
 //    console.log(jsonCriteria)
    localStorage.setItem('jsonCriteria', jsonCriteria);
    localStorage.setItem('jsonAlternative', jsonAlternative);
  }
  return (
    <>
      <div className="h-10">
        <button
          type="button"
          onClick={openModal}
          label="Edit the Names of Field"
          className="rounded-md bg-cyan-200  w-96 h-10 px-4 my-3 text-sm font-medium
           text-black hover:bg-opacity-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Edit the names of Criteria and Alternatives
        </button>
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
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
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Edit the Names of Criteria and Alternatives
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Avoid using longer names ! Use short names instead.
                    </p>
                    <div>{critForm}</div>
                    <hr/>
                    <div>{altForm}</div>
                  </div>

                  <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={handleConfirm}
                    >
                      Confirm 
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
