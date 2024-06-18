import { useUser } from "../../contexts/context-user/context-user";
import { profile } from "../../utils/profile/profile-image";

export const Ranking = () => {
  const { ranking } = useUser();

  return (
    <section className="relative flex gap-4 flex-col justify-between overflow-hidden rounded-md shadow-snipped border-[1px] border-[--color-one] border-solid max-w-96 w-full h-[788px] max-[1070px]:max-w-full">
      <h1 className="w-full text-2xl font-semibold text-[--color-one] text-center mt-6">
        Ranking
      </h1>
      <div>
        <div className="flex w-full justify-between items-center py-4 px-4 font-semibold border-b-[1px]">
          <div className="flex items-center gap-3">
            <span className="text-3xl text-[--color-one]">#1</span>
            <img
              src={(ranking && ranking[0]?.avatar) || profile}
              alt="profile"
              className="w-10 rounded-full"
            />
            <p>{(ranking && ranking[0]?.username) || "-----------"}</p>
          </div>
          <div>{(ranking && ranking[0]?.points + " pontos") || "--------"}</div>
        </div>

        <div className="flex w-full justify-between items-center py-4 px-4 font-semibold border-b-[1px]">
          <div className="flex items-center gap-3">
            <span className="text-3xl text-[#c0c0c0]">#2</span>
            <img
              src={(ranking && ranking[1]?.avatar) || profile}
              alt=""
              className="w-10 rounded-full"
            />
            <p>{(ranking && ranking[1]?.username) || "-----------"}</p>
          </div>
          <div>{(ranking && ranking[1]?.points + " pontos") || "--------"}</div>
        </div>
        <div className="flex w-full justify-between items-center py-4 px-4 font-semibold border-b-[1px]">
          <div className="flex items-center gap-3">
            <span className="text-3xl text-[#6e4d25]">#3</span>
            <img
              src={(ranking && ranking[2]?.avatar) || profile}
              alt=""
              className="w-10 rounded-full"
            />
            <p>{(ranking && ranking[2]?.username) || "-----------"}</p>
          </div>
          <div>{(ranking && ranking[2]?.points + " pontos") || "--------"}</div>
        </div>
        <ul>
          {ranking?.slice(3, 12).map((rank, index) => {
            const isLast = ranking.length > 11 && index === 11;
            return (
              <li
                className={`py-3 px-4 flex gap-5 items-center justify-between ${
                  !isLast && "border-b-[1px]"
                }`}
                key={index}
              >
                <div className="flex gap-5 items-center">
                  <span className="font-semibold text-xl">#{index + 4}</span>
                  <p>{rank.username}</p>
                </div>
                <div>
                  <span className="font-semibold">{rank.points} pontos</span>
                </div>
              </li>
            );
          })}
          {Array.from({ length: 9 - (ranking?.slice(3, 10).length || 0) }).map(
            (_, index) => {
              return (
                <li
                  className={`py-3 px-4 flex gap-5 items-center justify-between ${
                    index !== 7 && "border-b-[1px]"
                  }`}
                  key={index}
                >
                  <div className="flex gap-5 items-center">
                    <span className="font-semibold text-xl">
                      #{ranking && index + ranking?.length + 1}
                    </span>
                    <p>----------</p>
                  </div>
                  <div>
                    <span className="font-semibold">-------</span>
                  </div>
                </li>
              );
            }
          )}
        </ul>
      </div>
    </section>
  );
};
