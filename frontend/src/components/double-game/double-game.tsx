import { ButtonGift } from "../ui/button/button-gift/button-gift";

export const MemoryGame = () => {
  return (
    <div className="px-2 rounded-md shadow-snipped border-[1px] border-[--color-one] border-solid w-full h-full flex flex-col justify-between">
      {" "}
      <div>
        <h1 className="w-full text-2xl font-semibold text-[--color-one] text-center mt-6">
          Double
        </h1>
        <p className="text-xs w-full mt-5 text-white/50">
          Em Double, você aposta em uma cor (preto, branco ou vermelho) e uma roleta gira para determinar o resultado. As cores preto e vermelho pagam o dobro da aposta, enquanto o branco paga 14 vezes o valor apostado. A roleta tem 14 espaços, com 7 pretos, 6 vermelhos e 1 branco.
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
