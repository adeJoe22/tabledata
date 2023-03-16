import { useState } from "react";
import styled from "styled-components";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";

export default function DataTable({ rows = [] }) {
  const columns = Object.keys(rows[0]);

  const [sortBy, setSortBy] = useState({
    column: columns[0],
    asc: true,
  });

  const [query, setQuery] = useState("");
  const [count, setCount] = useState(3);

  function sort(rows) {
    const { column, asc } = sortBy;

    return rows.sort((a, b) => {
      if (a[column].toString() > b[column].toString()) return asc ? -1 : 1;
      if (b[column].toString() > a[column].toString()) return asc ? 1 : -1;
      return 0;
    });
  }

  function filter(rows) {
    return rows.filter((row) =>
      columns.some(
        (column) => row[column].toLowerCase().indexOf(query.toLowerCase()) > -1
      )
    );
  }

  const sortFilter = () => sort(filter(rows));

  return (
    <Container>
      <Search
        placeholder="Search here"
        type={"text"}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <Table>
        <tr>
          {columns.map((column) => (
            <th>
              <HeadWrap
                onClick={() =>
                  setSortBy((prev) => ({
                    column,
                    asc: !prev.asc,
                  }))
                }
              >
                <div>{column}</div>
                <div>
                  {sortBy.column === column &&
                    (sortBy.asc ? <BiChevronDown /> : <BiChevronUp />)}
                </div>
              </HeadWrap>
            </th>
          ))}
        </tr>
        {sortFilter()
          .slice(0, count)
          .map((row) => (
            <tr>
              {columns.map((column) => (
                <td>{row[column]}</td>
              ))}
            </tr>
          ))}
      </Table>
      {sortFilter().length > count && (
        <More>
          {" "}
          <button onClick={() => setCount((prev) => prev + 3)}>More</button>
        </More>
      )}
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 5px;
`;
const Table = styled.table`
  width: 100%;
  border-collapse: collapse;

  th {
    background-color: #474747;
    padding: 12px;
    text-align: left;
    color: #ffffff;
  }

  tr {
    border-bottom: 1px solid #bbb;
  }

  td {
    background-color: #ebebeb;
    padding: 8px;
    :nth-child(even) {
      background-color: #ffffff;
    }
  }
`;
const HeadWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 2px;
  cursor: pointer;
`;

const Search = styled.input`
  width: 97%;
  border: 1px solid #afafaf;
  color: #3d3d3d;
  padding: 12px;
  ::placeholder {
    color: #3d3d3d;
  }
`;

const More = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  button {
    padding: 8px 20px;
    background-color: transparent;
    border: none;
    transition: all 0.3s;
    cursor: pointer;
    :hover {
      background-color: black;
      color: #fff;
    }
  }
`;
