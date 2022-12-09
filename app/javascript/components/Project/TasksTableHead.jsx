import React, {useState} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faSort} from '@fortawesome/free-solid-svg-icons'
import {handleSorting} from '../helpers/helpers'

const TasksTableHead = ({columns, project, setProject}) => {
  const titles = columns.map( ({ label, accessor, sortable }) => {
    const cl = sortable
      ? sortField === accessor && order === "asc"
        ? "up"
        : sortField === accessor && order === "desc"
          ? "down"
          : "col-head"
      : "";
    return <th scope='col' className={cl} key={accessor} onClick={sortable ? () => handleSortingChange(accessor) : null}>
      {label} {accessor === "actions" ? '' : <FontAwesomeIcon icon={faSort} />}
    </th>
  })
  const [sortField, setSortField] = useState("");
  const [order, setOrder] = useState("asc");
  const handleSortingChange = (accessor) => {
    const sortOrder = accessor === sortField && order === "asc" ? "desc" : "asc";
    setSortField(accessor);
    setOrder(sortOrder);
    handleSorting(accessor, sortOrder, project, setProject);
  };

  return (
    <thead>
      <tr>
        {titles}
      </tr>
    </thead>
  )
}

export default TasksTableHead