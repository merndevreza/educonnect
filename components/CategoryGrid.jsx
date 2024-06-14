import { cn } from "@/lib/utils";
import CategoryCard from "./CategoryCard";

const CategoryGrid = ({ categories, className }) => {
  return (
    <div
      className={cn(
        "mx-auto grid justify-center gap-4 grid-cols-2  md:grid-cols-3 2xl:grid-cols-4",
        className
      )}
    >
      {categories.map((category) =>  <CategoryCard key={category.id} category={category}/>)}
    </div>
  );
};

export default CategoryGrid;
