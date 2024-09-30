import { useState } from "react";
import Axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
function Modal({ close, onSave }) {
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState("");
  const [price, setPrice] = useState("");
  const MySwal = withReactContent(Swal);

  const createVehicle = () => {
    //data will get saved in db
    Axios.post("http://localhost:4000/createVehicle", {
      make,
      model,
      year,
      price,
      //status: 'Live'
    })
      .then((response) => {
        //console.log(response)
        close();
        onSave(response.data);
        return MySwal.fire(<p>Data Saved</p>);
      })
      .catch((err) => console.error(err));
  };

  let years = [];
  for (let i = 0; i < 33; i++) {
    years.push(1990 + i);
  }

  return (
    <div className="mt-5 md:mt-0 md:col-span-2">
      <div className="shadow overflow-hidden sm:rounded-md">
        <div className="w-full lg:flex justify-center items-center flex-col  mb-5 sm:mb-10">
          <h1 className="text-l sm:mt-4 sm:text-2xl md:text-2xl lg:text-3xl xl:text-2xl text-center text-darkblue font-sans leading-7 md:leading-10">
            Add New Vehicle Details
          </h1>
        </div>
        <div className="px-8 bg-white sm:p-6">
          <div className="grid  gap-9">
            <div className="col-span-12  pb-2 sm:pb-5 border-b border-teal-500 sm:col-span-3">
              <input
                className="appearance-none bg-transparent border-none w-full text-gray text-xs sm:text-xl leading-tight focus:outline-none"
                type="text"
                placeholder="Make"
                onChange={(event) => {
                  setMake(event.target.value); 
                }}
              />
            </div>

            <div className="col-span-6   pb-2 sm:pb-5 border-b border-teal-500 sm:col-span-3">
              <input
                className="appearance-none bg-transparent border-none w-full text-gray text-xs sm:text-xl  leading-tight focus:outline-none"
                type="text"
                placeholder="Modal"
                onChange={(event) => {
                  setModel(event.target.value); 
                }}
              />
            </div>
            <div className="col-span-6   pb-2 sm:pb-5 border-b border-teal-500 sm:col-span-3">
              <select
                onChange={(event) => {
                  setYear(event.target.value); 
                }}
                className=" w-28 border-2  mt-1 mb-1 p-2 border-gray-200 rounded outline-none focus:border-blue-500 text-l sm:mt-4 pr-8 sm:text-2xl md:text-2xl lg:text-3xl xl:text-xl  text-gray font-sans leading-7 md:leading-10"
              >
                {years.map((e) => (
                  <option>{e.toString()}</option>
                ))}
              </select>
            </div>
            <div className="col-span-6   pb-2 sm:pb-5 border-b border-teal-500 sm:col-span-3">
              <input 
                className="appearance-none bg-transparent border-none w-full text-gray text-xs sm:text-xl  leading-tight focus:outline-none"
                type="Number"
                placeholder="Price"
                onChange={(event) => {
                  setPrice(event.target.value); 
                }}
                
              />
             
            </div>
          </div>
        </div>

        <div className="flex justify-center  my-4 sm:py-8 items-center ">
          <button
            onClick={createVehicle}
            type="submit"
            className="bg-darkblue  rounded-buttonRadius font-sans text-center hover:bg-darkblue text-white  py-2 px-8 sm:px-14 rounded"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
