import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useUser } from "../../contexts/context-user/context-user";

export const Loading = () => {
const {loading} = useUser()
  return (
    <>
      {loading && (
        <span className="absolute w-full h-full bg-black/80 z-40 flex justify-center items-center rounded-md">
          <AiOutlineLoading3Quarters className="text-3xl animate-spin" />
        </span>
      )}
    </>
  );
};
