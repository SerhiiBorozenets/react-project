import React, {Fragment} from "react";
import Form from "react-bootstrap/Form";

const SearchFilter = ({ query, handleFilter, searchType, hidden }) => {
  return <div style={{marginRight: 10}}>
    { hidden ? null :
      <Form>
        <Form.Group onChange={handleFilter} value={query}>
          <Form.Control type="text" name="title" placeholder={`Search ${searchType}`} />
        </Form.Group>
      </Form>
    }
  </div>
}

export default SearchFilter