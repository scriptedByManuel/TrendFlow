import React from "react";
import { useParams } from "react-router-dom";
import ProductList from "../components/ProductList";

const CategoryProduct = () => {
  const { title } = useParams();
  const category = title;

  let heading = "";
  let description = "";

  switch (category) {
    case "Shirts":
      heading = "Shirts";
      description = "Relaxed fits for everyday wear.";
      break;

    case "Sweatshirts":
      heading = "Sweatshirts";
      description = "Cozy layers to keep you warm and stylish.";
      break;

    case "Hoodies":
      heading = "Hoodies";
      description = "Comfort meets cool — perfect for laid-back days.";
      break;

    case "Jackets":
      heading = "Jackets";
      description = "Layer up with style and confidence.";
      break;

    case "Bags":
      heading = "Bags";
      description = "Carry your essentials in timeless fashion.";
      break;
  }

  return (
    <section className="w-full py-[40px]">
      <div className="flex flex-col gap-[4px] w-1/2 mb-[40px]">
        <h1 className="text-2xl text-primary font-poppins font-bold capitalize">
          {heading}
        </h1>
        <p className="text-base text-secondary font-montserrat font-normal">
          {description}
        </p>
      </div>
      <ProductList
        skeletonCount={8}
        table="products"
        options={{
          filter: { column: "category", operator: "eq", value: category },
        }}
      />
    </section>
  );
};

export default CategoryProduct;
