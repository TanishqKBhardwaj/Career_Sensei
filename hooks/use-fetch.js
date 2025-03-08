
const { useState } = require("react")
const { toast } = require("sonner")

const useFetch=(cb)=>{
    const [data,setData]=useState(undefined)
    const [loading,setLoading]=useState(null)
    const [error,setError]=useState(null)

    const fn=async(...args)=>{
        setLoading(true);
        setError(null);

        try {
            const response=await cb(...args);
             setData(response);
             console.log(response)
            setError(null);
        } catch (error) {
            setError(error)
            toast.error(error.message)
        }finally{
            setLoading(false);
        }
    }
    return {data,loading,fn,setData}
}
export default useFetch