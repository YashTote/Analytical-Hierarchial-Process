import ReactPaginate from "react-paginate";
import React,{useEffect, useState} from "react";
import { ReactDOM } from "react-dom";
import './pagination.css';
import Crit_Table from "../containers/Criteria_Matrix/crit_table";
import { useSelector } from "react-redux";
import CrAndAltValueSlice from "../slices/CrAndAltValueSlice";
const items = [...Array(33).keys()];


function Items({ currentItems }) {
  return (
    <div className="items">
    {currentItems && currentItems.map((item) => (
      <div>
        <h3>Item #{item}</h3>
      </div>
    ))}
      </div>
  );
}





export default function PaginatedItems({ itemsPerPage }) {
  const cr_obj1 = useSelector((state) => state.CrAndAltValue);
  console.log(cr_obj1);
 
  // We start with an empty list of items.
  const [currentItems, setCurrentItems] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  const [itemOffset, setItemOffset] = useState(0);

  useEffect(() => {
    // Fetch items from another resources.
    const endOffset = itemOffset + itemsPerPage;
    // console.log(`Loading items from ${itemOffset} to ${endOffset}`);
    setCurrentItems(items.slice(itemOffset, endOffset));
    
    setPageCount(Math.ceil(items.length / itemsPerPage));
  }, [itemOffset, itemsPerPage]);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = event.selected * itemsPerPage % items.length;
    // console.log(newOffset);
    // console.log(`User requested page number ${event.selected}, which is offset ${newOffset}`);
    setItemOffset(newOffset);
  };
 
  return (
    <>     
      <ReactPaginate
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={2}
        marginPagesDisplayed={2}
        pageCount={pageCount}
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
      /><Items currentItems={currentItems} />
      
    </>
  );
}


// Add a <div id="container"> to your HTML to see the componend rendered.
// ReactDOM.render(
//   <PaginatedItems itemsPerPage={5} />,
//   document.getElementById("container")
// );


