import { BsChevronRight } from "react-icons/bs";

function TitleOne() {
  return (
    <div className='title d-flex justify-content-between align-items-center'>
      <div>
        <h2>Patient</h2>
        <div className='path'>
          <span>Patient</span>
          <span><BsChevronRight /></span>
          <span>Patients List</span>
        </div>
      </div>
    </div>
  )
}
export default TitleOne;