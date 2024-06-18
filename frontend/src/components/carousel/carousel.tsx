import { Splide, SplideSlide } from "@splidejs/react-splide";
import { useUser } from "../../contexts/context-user/context-user";

export const Carousel = ({
  category,
}: {
  category: "ouro" | "prata" | "bronze";
}) => {
  const { user } = useUser();

  const category_color = {
    ouro: "--color-one",
    prata: "#c0c0c0",
    bronze: "#6e4d25",
  };

  return (
    <Splide
      options={{
        type: "slide",
        perPage: 5,
        perMove: 1,
        gap: "1rem",
        arrows: false,
        pagination: false,
        breakpoints: {
          768: {
            perPage: 3,
          },
          480: {
            perPage: 2,
          },
        },
      }}
    >
      {user?.emblems &&
        user?.emblems
          .filter((em) => em.category === category)
          .map((em, index) => (
            <SplideSlide key={index}>
              <div className="flex flex-col items-center gap-2">
                <img
                  src={em.image}
                  alt={em.category}
                  className={`border-solid border-4 border-[${category_color[category]}] rounded-full w-14 h-14 shadow-snipped`}
                />
                <p className=" text-center text-[9px] uppercase font-extrabold">
                  {index + 1}&ordm; {em.slug}
                </p>
              </div>
            </SplideSlide>
          ))}
      {user?.emblems &&
        user?.emblems.filter((em) => em.category === category).length === 0 && (
          <p className="text-center text-xs font-semibold my-[33px] w-full">
            Ainda sem emblemas? Jogue agora mesmo.
          </p>
        )}
    </Splide>
  );
};
