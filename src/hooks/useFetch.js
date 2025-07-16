import { useEffect,useState } from "react";


export function useFetch(fetchFn,initialValue) { 

const [isFetching,setIsFetching] = useState(false);
const [error,setError] = useState();
const [fetchedData, setFetchedData] = useState(initialValue);
//a custom hook is a fxn it can accept params so we can accept somethng more generic than 
//writing await fetchUserPlaces() directly in the component
     useEffect(() => {
        async function fetchData() {
          
          setIsFetching(true);
          try {
          
            const places =await fetchFn()
            setFetchedData(places);
          } catch (error) {
            setError({ message: error.message || 'Failed to fetch data' });
          }
    
          setIsFetching(false);
        }
    
        fetchData();
      }, [fetchFn]);

      return {
        isFetching,
        fetchedData,
        setFetchedData, //this will be used to update the fetchedData state from outside this hook,
        // u could also wrap this state updating fxn in a custom fxn that adds more validation or logic to 
        //restrict the data that can be set, but for now we just return it
        error
      }
}

// to make this useFetch hook functional,

// we also need to manage some state in there,

// because every component that later uses this custom hook

// should of course also get that state