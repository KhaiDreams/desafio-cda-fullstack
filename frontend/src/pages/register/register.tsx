import { useNavigate } from "react-router-dom";
import { useUser } from "../../contexts/context-user/context-user";
import { RegisterForm } from "./sub-components/form/register-form";
import { useEffect } from "react";
import { Loading } from "../../components/loading/loading";

const Register = () => {
  const navigate = useNavigate();
  const { user } = useUser();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [navigate, user]);

  if (user) {
    return null;
  }

  return (
    <main className="w-full flex h-screen gap-16">
      <section className="w-[60vw] login-side flex flex-col justify-center items-center shadow-snipped max-[900px]:hidden">
        <span className="absolute w-20 h-20 top-1/2 -translate-y-1/2 -right-10">
          <img src="/logo.png" alt="logo cda" />
        </span>
        <div className="flex flex-col max-h-[600px] h-full z-50 justify-between items-center w-full pr-12 pl-4 text-center">
          <h2 className="text-5xl text-[--color-one] font-extrabold max-[1400px]:text-3xl">
            Seja muito bem vindo ao Cidade Alta Rolepay.
          </h2>
          <div>
            <h3 className="text-3xl text-[--color-one] font-semibold mb-6 max-[1400px]:text-xl">
              Ação e aventura esperam por você:
            </h3>
            <p className="text-xl text-[--color-text] max-[1400px]:text-sm">
              Prepare-se para aventuras inesquecíveis no Cidade Alta Roleplay.
              Seja perseguindo seus sonhos, estabelecendo alianças ou
              desvendando mistérios, aqui cada dia é uma nova possibilidade.
            </p>
          </div>
          <h3 className="text-3xl text-[--color-one] font-semibold max-[1400px]:text-2xl">
            {" "}
            Venha fazer parte da nossa comunidade vibrante!
          </h3>
        </div>
      </section>
      <section className="w-full flex justify-center items-center my-4 px-4">
        <div className="w-full max-w-[500px] flex flex-col justify-center items-center gap-10 border-[1px] border-[--color-one] px-7 py-12 rounded-md shadow-snipped relative">
        <Loading/>
          <h1 className="w-full text-4xl font-semibold text-[--color-one] mb-5 text-center">
            Register
          </h1>
          <div className="w-full flex gap-5">
          </div>
          <RegisterForm />
        </div>
      </section>
    </main>
  );
};

export default Register;
