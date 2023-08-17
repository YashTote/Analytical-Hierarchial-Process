# Analytical-Hierarchial-Process Evaluator

## Problem Statement:

The 'In-General' methodology for assignment of a contract (usually by a Government body ) for any project (say construction, services) is using the lowest-bidding technique. The contractor who bids the lowest amount above some cap is usually preferred for the final approval. This may lead to biased or incorrect selection of a contractor, which may pose the risk of bad quality of final product delivered.  

The Analytical Hierarchy Process was developed by Thomas M. Saaty. This is a **Decision Making Model** that takes in range of inputs namely : Criteria and Alternatives. By using some mathematical calculations a prority vector is calculated for the Alternatives on the basis of criterias. This in return gives us a final most optimal Alternative to be selected.

## Using the Application

### Build of the Application.


1. (For FrontEnd) From the `*Main` branch:

   1. `git pull`  or download as zip.

   2. `npm install` for installing all the dependencies.
    

### Operating the Application:

1. Click on the ***Home*** Tab. Click ***Get Started*** .

2. This will open a Modal Box. For the sake of this example you may enter the Criteria as 4 and Alternative as 5.
   

3. After entering the Criteria and Alternative values click on `Edit the names of Criteria and Alternatives` . Enter the names of you choice. For now change all the names of all the Criterias and Alternatives ***compulsorily***. Hit `Confirm`. Again hit `Confirm`.

![Intro](ahp/src/images/Image1.png)

4. Enter the data such that the Consistency Ratio is Acceptable or Green.You may enter the data from the image below.After getting similar results hit `Send to the Database` ***Only once***.
   
   ![Criteria Image](ahp/src/images/Image2.png)

5. Click on the `Alternatives` Tab. For the sake of this example you may enter the following data : 
 
   1. For pagination 1. After getting similar results hit `Send to the Database`.
   
      ![Alt Image 1](ahp/src/images/Image3.png)
  
   2. For pagination 2.After getting similar results hit `Send to the Database` .
       
      ![Alt Image 2](ahp/src/images/Image4.png)
      
   3. For pagination 3.After getting similar results hit `Send to the Database` .
     
      ![Alt Image 3](ahp/src/images/Image5.png)
  
   4. For pagination 4.After getting similar results hit `Send to the Database`.
   
      ![Alt Image 4](ahp/src/images/Image6.png)
  
 6. Click `Final Result` . And hit `Get the final Result`. You should be looking at something like:
 
      ![Final Result Image 1](ahp/src/images/Image7.png)
      
      ![Final Result Image 2](ahp/src/images/Image8.png)

 7. This project primarily uses ReactJs as its main framework that enable this application to maintain its responsive and dynamic nature.
    
 9. For state management React-Redux is used as the main state management tool. Helps in managing the global scope of the Application.
     
 11. For routing and URL management, react-router is the primary liabrary used.
   
 12. The LocalStorage is used for pertsistance of the data like Criteria Names and Alternative Names.You can look for them from the applications tab of you 
     console.
     
     Also the Eigen vector Array of both the criteria and Alternatives (all of them) is sent to the local storage in order to enhance cross browser compatibility.
     
 13. This repository is up for contributions. You may suggest new features and bug fixes.
