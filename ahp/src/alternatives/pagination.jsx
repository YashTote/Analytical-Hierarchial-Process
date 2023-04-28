import ReactPaginate from "react-paginate";
import React,{useState} from "react";
import { ReactDOM } from "react-dom";
import './pagination.css';
import Alt_Table from "./alternatives_table";
import { useSelector } from "react-redux";
import Crit_Table from "../containers/Criteria_Matrix/crit_table";
const items = [...Array(33).keys()];


function AltBox({total, currentTable}){
 
   console.log(total);
  const sample1 = [total];
  
  let jsonCriteria = localStorage.getItem('jsonCriteria');

  jsonCriteria = JSON.parse(jsonCriteria);
  console.log(jsonCriteria);

  const display_table_title = `Compare the Alternatives on the basis of :  ${jsonCriteria[currentTable + 1]}`
  for (let i = 0; i < total; i++) {
    console.log(currentTable, total)
    sample1[i] = <Crit_Table key={i} value={total} tableNumber={i+1} />
  }

  return(
    <div className="box-content h-auto my-3 mx-8 w-auto p-4 border-2 rounded-lg">
        <div className = "bg-cyan-200 headingText rounded">{display_table_title}</div>
        {sample1[currentTable]}
    </div>
  )
}

export default function PaginatedItems({ itemsPerPage }) {
  const total_tables = useSelector(state => state.CrAndAltValue)
  // console.log(total_tables[0]["AltValue"]);
  
  const [required, setRequired] = useState(0);
  const handlePageClick = (event) => {
    const required = event.selected;
    setRequired(required);
  }

  return (
    <> 
     <div className="flex justify-center">    
      <ReactPaginate
        className="inline-flex"
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={2}
        marginPagesDisplayed={2}
        pageCount={total_tables[0]["CritValue"]}
        previousLabel="<previous"
        pageClassName="inline leading-tight bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
        pageLinkClassName="px-3 py-2"
        previousClassName="inline px-3 py-2 ml-0 leading-tight bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700"
        previousLinkClassName="text-gray-500 page-link"
        nextClassName="px-3 py-2 inline leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700"
        nextLinkClassName="text-gray-500 page-link"
        breakLabel="..."
        breakClassName="inline px-3 py-2 leading-tight bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700ge-item"
        breakLinkClassName="page-link"
        containerClassName="pagination"
        activeClassName=" border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
        activeLinkClassName="text-blue-600"
        renderOnZeroPageCount={null}
      />
      </div>
      {/* <Items currentItems={currentItems} /> */}
      <AltBox total={total_tables[0]["AltValue"]} currentTable = {required}/>
      {/* <Alt_Table value={7}/> */}
    </>
  );
}


// Add a <div id="container"> to your HTML to see the componend rendered.
// ReactDOM.render(
//   <PaginatedItems itemsPerPage={5} />,
//   document.getElementById("container")
// );


