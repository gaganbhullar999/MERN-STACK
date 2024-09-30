import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import { useState, useEffect } from "react";
import "reactjs-popup/dist/index.css";
import Axios from "axios";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import DataTable from "react-data-table-component";
import HistogramChart from "./components/HistogramChart";
import DataTableExtensions from "react-data-table-component-extensions";
function App() {
  const [listOfVehicles, setListOfVehicles] = useState([]);
  const MySwal = withReactContent(Swal);
  const columns = [
    {
      name: "No.",
      selector: (row, index) => index + 1,
    },
    {
      name: "Make",
      selector: (row) => row.make,
    },
    {
      name: "Model",
      selector: (row) => row.model,
    },
    {
      name: "Year",
      selector: (row) => row.year,
    },
    {
      name: "Price",
      selector: (row) => row.price,
    },
    {
      name: "Status",
      selector: (row) => row.status,
    },
    {
      name: "Actions",
      selector: (row) => (
        <>
          <button
            onClick={() => openPopup(row)}
            type="submit"
            class="font-medium text-blue-400 cursor-pointer "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
              />
            </svg>
          </button>
          <button
            onClick={() => deleteVehicle(row._id)}
            type="submit"
            class="font-medium ml-4 text-blue-400 dark:text-blue-500 cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </button>
        </>
      ),
    },
  ];

  useEffect(() => {
    Axios.get("http://localhost:4000/getVehicles").then((response) => {
      // will get response from api
      setListOfVehicles(response.data);
    });
  }, []);

  const updateList = (id, vehicle) => {
    for (let index = 0; index < listOfVehicles.length; index++) {
      if (listOfVehicles[index]._id === id) {
        listOfVehicles[index] = vehicle;
      }
    }

    setListOfVehicles([]);
    setListOfVehicles(listOfVehicles.map((e) => e));
  };

  const updateListSold = (id) => {
    for (let index = 0; index < listOfVehicles.length; index++) {
      if (listOfVehicles[index]._id === id) {
        listOfVehicles[index].status = "Sold";
      }
    }

    setListOfVehicles([]);
    setListOfVehicles(listOfVehicles.map((e) => e));
  };

  const refreshDeleted = (id) => {
    let i = -1;
    for (let index = 0; index < listOfVehicles.length; index++) {
      if (listOfVehicles[index]._id === id) {
        i = index;
      }
    }

    if (i !== -1) {
      listOfVehicles.splice(i, 1);
      setListOfVehicles([]);
      setListOfVehicles(listOfVehicles.map((e) => e));
    }
  };

  const openPopup = async (vehicle) => {
    const formValues = await Swal.fire({
      html:
        `<label class="ml-8"> Make : </label><input id="make" class="swal2-input" value="${vehicle.make}">` +
        `<label class="ml-6"> Model :</label><input id="model" class="swal2-input" value="${vehicle.model}">` +
        `<label  class="ml-10"> Year : </label><input id="year" class="swal2-input" value="${vehicle.year}">` +
        `<label class="ml-10"> Price: </label><input id="price" class="swal2-input" value="${vehicle.price}">`,

      confirmButtonText: "Update",
      cancelButtonText: "Mark As Sold",
      showCancelButton: true,

      preConfirm: () => {
        updateVehicle(vehicle._id, {
          make: document.getElementById("make").value,
          model: document.getElementById("model").value,
          year: document.getElementById("year").value,
          price: document.getElementById("price").value,
        });
        return null;
      },
    });
    console.log(formValues);
    if (!formValues.isConfirmed) {
      Axios.post(`http://localhost:4000/markAsSold`, { id: vehicle._id })
        .then((response) => {
          updateListSold(vehicle._id);
          return MySwal.fire(<p>Mark As Sold</p>);
        })
        .catch((err) => console.error(err));
    }
  };

  const updateVehicle = (id, vehicle) => {
    //front end data will get saved in db
    Axios.patch(`http://localhost:4000/vehicles/${id}`, vehicle)
      .then((response) => {
        updateList(id, response.data);
        return MySwal.fire(<p>Data Update</p>);
      })
      .catch((err) => console.error(err));
  };
  const deleteVehicle = (id) => {
    //front end data will get saved in db
    Axios.delete(`http://localhost:4000/vehicles/${id}`)
      .then((response) => {
        refreshDeleted(id);
        return MySwal.fire(<p>Data Deleted</p>);
      })
      .catch((err) => console.error(err));
  };
  return (
    <div className="flex">
      <Sidebar />
      <Header
        onSave={(data) => {
          listOfVehicles.push(data);
          setListOfVehicles(listOfVehicles.map((e) => e));
        }}
      >
        <HistogramChart />
        <DataTableExtensions
          columns={columns}
          data={listOfVehicles}
          print={false}
          export={false}
        >
          <DataTable
            title="Vehicles Records"
            columns={columns}
            data={listOfVehicles}
            direction="auto"
            fixedHeader
            fixedHeaderScrollHeight="500px"
            highlightOnHover
            pagination
            responsive
            striped
          />
        </DataTableExtensions>
      </Header>
    </div>
  );
}

export default App;
