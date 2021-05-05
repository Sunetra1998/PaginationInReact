import { useEffect, useState } from "react";
import "./styles.css";

export default function App() {
  // `https://jsonplaceholder.typicode.com/posts?_limit=${}&_page=${}`

  const [dataArray, setDataArray] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);

  useEffect(() => {
    const apiCallFunction = async () => {
      const apiData = await fetch(
        `https://jsonplaceholder.typicode.com/posts?_limit=${5}&_page=${pageNumber}`
      );
      const apiDataJson = await apiData.json();
      console.log({ apiDataJson });
      const dataArrayCopy = [...apiDataJson];
      setDataArray(dataArrayCopy);
    };
    apiCallFunction();
  }, [pageNumber]);

  // const MAX_PAGE_NUMBER = 20
  // const pageNumberArray =

  const handlePrevious = () => {
    setPageNumber(pageNumber <= 1 ? pageNumber : pageNumber - 1);
  };

  const handleNext = () => {
    setPageNumber(pageNumber >= 20 ? pageNumber : pageNumber + 1);
  };

  return (
    <div className="App">
      <ul>
        {dataArray.map((data, idx) => (
          <li key={idx}>{data.id}</li>
        ))}
      </ul>
      <button disabled={pageNumber === 1} onClick={handlePrevious}>
        Previous
      </button>
      <button disabled={pageNumber === 20} onClick={handleNext}>
        Next
      </button>
    </div>
  );
}
