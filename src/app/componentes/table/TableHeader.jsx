import TableHeaderItem from "./TableHeaderItem";

export default function TableHeader(props) {
  return (
    <thead className="ltr:text-left rtl:text-right">
      <tr>
        {props.cabeceras.map((cabecera, index) => {
          return (
            <TableHeaderItem
              key={index}
              nombreColumna={cabecera}
            />
          );
        })}
      </tr>
    </thead>
  );
}
