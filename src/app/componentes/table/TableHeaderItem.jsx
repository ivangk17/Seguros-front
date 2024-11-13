export default function TableHeaderItem(props) {
  return (
    <th className={`whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-center ${props.visibilityClass}`}>
      {props.nombreColumna}
    </th>
  );
}