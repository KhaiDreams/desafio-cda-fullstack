import { ButtonGift } from "../ui/button/button-gift/button-gift";

export const MinerGame = () => {
  return (
    <div className="px-2 rounded-md shadow-snipped border-[1px] border-[--color-one] border-solid w-full h-full flex flex-col justify-between">
      {" "}
      <div>
        <h1 className="w-full text-2xl font-semibold text-[--color-one] text-center mt-6">
          Mines
        </h1>
        <p className="text-xs w-full mt-5 text-white/50">
          Um clássico, quando você ficava sem internet, provavelmente já abriu esse jogo para passar o tempo!
          Você joga em uma grade cheia de quadrados, alguns dos quais escondem minas. O objetivo é clicar nos quadrados que não têm minas para aumentar o multiplicador da aposta. Quanto mais quadrados seguros você clicar, maior o seu ganho, mas se clicar em uma mina, você perde a aposta. Você pode parar e retirar seus ganhos a qualquer momento antes de clicar em uma mina.
        </p>
      </div>
      <div className="flex flex-col gap-4 mb-4">
        <p className="w-full text-center text-xs text-red-600">
          JOGO AINDA EM DESENVOLVIMENTO, POR ENQUANTO PEGUE EMBLEMAS ALEATORIOS.
        </p>
        <div className="max-w-64 mx-auto w-full">
          <ButtonGift />
        </div>
      </div>
    </div>
  );
};
