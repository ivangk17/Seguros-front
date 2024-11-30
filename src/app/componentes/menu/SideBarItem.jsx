import Link from "next/link";

export default function SideBarItem(props) {
  const { item, closeSidebar } = props;
  const handleClick = (e) => {
    if (item.onClick) {
      e.preventDefault();
      item.onClick();
    }
    if (closeSidebar) {
      closeSidebar();
    }
  };

  return (
    <li>
      <Link
        href={item.url}
        className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
        onClick={handleClick}
      >
        {item.descripcion}
      </Link>
    </li>
  );
}
