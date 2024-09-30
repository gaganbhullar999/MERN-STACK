import "reactjs-popup/dist/index.css";
import Popup from "reactjs-popup";
import Modal from "../components/NewEntry";
function Header(props) {
  return (
    <div className="min-h-screen w-full bg-white">
      <nav className="flex items-left justify-between px-5 bg-white  border-b">
        <div className="flex items-center py-2 -mx-1 md:mx-0">
          <div className="flex flex-col mt-2 md:flex-row md:mt-0 md:mx-1">
            <Popup
              trigger={
                <button className=" rounded-buttonRadius font-sans text-centertext-darkblue bg-orange font-semibold  py-2 px-4 rounded">
                  Add New Vehicle
                </button>  
              }
              modal
              nested
            >
              {(close) => <Modal close={close} onSave={props.onSave} />}
            </Popup>
          </div>
        </div>
      </nav>

      {props.children}
    </div>
  );
}

export default Header;
