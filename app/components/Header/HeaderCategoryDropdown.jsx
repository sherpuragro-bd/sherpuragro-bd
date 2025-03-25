import { getAllCategories } from "@/actions/admin/Category";
import NavLink from "../ui/NavLink";

const HeaderCategoryDropdown = async () => {
  const allCategories = await getAllCategories();

  return (
    <>
      <ul className="absolute overflow-hidden max-h-0 opacity-0 group-hover:max-h-[500px] group-hover:opacity-100 transition-all duration-700 ease-in-out flex flex-col font-light bg-white border top-36 w-[200px] py-2 rounded-xl">
        {allCategories.map((category) => (
          <NavLink
            activeClass="bg-primary/20 text-primary"
            className="px-5 py-1 hover:bg-primary/20 hover:text-primary transition-all"
            key={category.nameCategory}
            href={`/categories/${category.permalLink}`}
          >
            {category.nameCategory}
          </NavLink>
        ))}
      </ul>
    </>
  );
};

export default HeaderCategoryDropdown;
