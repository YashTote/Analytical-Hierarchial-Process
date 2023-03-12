import { useSelector } from "react-redux";

export default function EigenTable(){
    const eigenReducer = useSelector((state) => state.eigenStore);
    // thisis bad coding practice. change this. 
    if(eigenReducer.length)
    { 
        // console.log(eigenReducer[eigenReducer.length -1]);
      const eigen_vector = {};
      for (let i = 1; i < eigenReducer.length; i++) {
         eigen_vector[`Crit ${i}`] = eigenReducer[eigenReducer.length -1];
      }
      const sorted = [];
      for (let elements in eigen_vector) {
        sorted.push([elements ,eigen_vector[elements]]);
      }
      sorted.sort(function(a,b){
        return a[1] - b[1];
      })
      // console.log(sorted);

    }

    // console.log("beta male")
}