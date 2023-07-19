/* This example requires Tailwind CSS v3.0+ */
import React, {useState} from 'react';
import Modal from './Modal';
export default function Intro({closeIntro , obtainData}) {
  const [popup, setPopup] = useState(false);
  function onExit(exit)
  {
    setPopup(exit);
  }
  
  function deleteDatabase(){
     setPopup(true);
    //  fetch('http://127.0.0.1:8000/dataHandle/deleteRecords/' ,{
    //   method: 'DELETE',
    //  })
    // //  .then(response => response.json())
    //  .then(Response => console.log(Response))
    //  .catch(error => console.error(error));
    if(localStorage.getItem('localAlternativeEigen')){
      localStorage.removeItem('localAlternativeEigen');
    }
    if(localStorage.getItem('localCriteriaEigen'))
      localStorage.removeItem('localCriteriaEigen');
  }
  
    return (
      
      <div className="bg-white">
        <div className="mx-auto max-w-7xl py-24 sm:px-6 sm:py-32 lg:px-8">
          <div className="relative isolate overflow-hidden bg-sky-300 px-16 pt-16 shadow-2xl sm:rounded-3xl sm:px-16 md:pt-24 lg:flex lg:gap-x-20 lg:px-24 lg:pt-0">
           {/* for bottom gradient  */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 1024 1024"
              className="absolute top-1/2 left-1/2 -z-10 h-[64rem] w-[64rem] -translate-y-1/2 [mask-image:radial-gradient(closest-side,white,transparent)] sm:left-full sm:-ml-80 lg:left-1/2 lg:ml-0 lg:translate-y-0 lg:-translate-x-1/2"
              aria-hidden="true"
            >
              <defs>
                <radialGradient id="759c1415-0410-454c-8f7c-9a820de03641">
                  <stop stopColor="#7775D6" />
                  <stop offset={1} stopColor="#E935C1" />
                </radialGradient>
              </defs>
              <circle cx={512} cy={512} r={512} fill="url(#759c1415-0410-454c-8f7c-9a820de03641)" fillOpacity="0.7" />

            </svg>
            <div className="mx-auto max-w-2xl text-center lg:mx-0 lg:flex-auto lg:py-20 lg:text-left">
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                The contractor selection techniques redifined.
              </h2>
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-1xl">
                Explore AHP as a new alternative to existing contractor selection techniques.
              </h2>
              
              <div className="mt-10 flex items-center justify-center gap-x-6 lg:justify-start">
                <button onClick={deleteDatabase} href="#"
                  className="rounded-md bg-white px-3.5 py-1.5 text-base font-semibold leading-7 text-gray-900 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  Get started
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* <Homemain open={popup} onClose = {() =>{setPopup(false)}}/> */}
        <Modal isOpen = {popup}  obtainData={obtainData} onExit = {onExit} closeIntro={closeIntro}/>
      </div>
    )
  }