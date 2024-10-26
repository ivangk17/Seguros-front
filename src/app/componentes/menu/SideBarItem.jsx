import Link from "next/link";

export default function SideBarItem(props) {
  const { item } = props;
  return (
    <li>
      <Link
        href={item.url}
        className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
      >
        {item.descripcion}
      </Link>
    </li>
  );
}
