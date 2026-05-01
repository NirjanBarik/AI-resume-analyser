
import React, {useState} from "react";

function App(){
  const [res,setRes]=useState(null);

  const upload=async(e)=>{
    const f=new FormData();
    f.append("file",e.target.files[0]);
    f.append("job_desc","test");

    const r=await fetch("http://localhost:8000/analyze",{method:"POST",body:f});
    setRes(await r.json());
  }

  return (
    <div>
      <h1>AI Resume Analyzer</h1>
      <input type="file" onChange={upload}/>
      {res && <pre>{JSON.stringify(res,null,2)}</pre>}
    </div>
  )
}

export default App;
