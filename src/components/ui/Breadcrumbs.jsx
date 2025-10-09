import { Link, useLocation } from "react-router-dom";
import useSupabaseFetch from "../../hooks/useSupabaseFetch";

const Breadcrumbs = () => {
    const location = useLocation();
    const pathSegments = location.pathname.split("/").filter(Boolean);

    // Don't show breadcrumbs on homepage
    if (location.pathname === "/") return null;

    // Detect if we are on a category product detail route: /categories/:title/:id
    const isCategoryProductDetail =
        pathSegments[0] === "categories" && pathSegments.length === 3;

    // Declare placeholders
    let product = null;

    const result = isCategoryProductDetail
        ? useSupabaseFetch("products", {
            single: true,
            filter: { column: "id", operator: "eq", value: pathSegments[2] },
        })
        : { data: null, loading: false, error: null };

    product = result.data

    const commonClasses =
        "text-base font-medium font-montserrat capitalize leading-6 align-middle";

    return (
        <div className="flex items-center gap-[16px] pb-[20px] border-b border-[#E4E4E7]">
            <Link to="/" className={`${commonClasses} text-primary`}>
                Home
            </Link>

            {pathSegments.map((value, index) => {
                const to = `/${pathSegments.slice(0, index + 1).join("/")}`;
                const isLast = index === pathSegments.length - 1;

                let label = value;

                // Handle product detail label inside categories
                if (isCategoryProductDetail && isLast) {
                    label =  product?.name;
                }

                // Handle product detail under /products/:id
                if (pathSegments[0] === "products" && pathSegments.length === 2 && isLast) {
                    label = "Product Detail";
                }

                return (
                    <div key={to} className="flex items-center gap-[16px]">
                        <span className={commonClasses}>/</span>
                        {isLast ? (
                            <span className={`${commonClasses} text-secondary`}>{label}</span>
                        ) : (
                            <Link to={to} className={`${commonClasses} text-primary`}>
                                {label}
                            </Link>
                        )}
                    </div>
                );
            })}
        </div>
    );
};

export default Breadcrumbs;
