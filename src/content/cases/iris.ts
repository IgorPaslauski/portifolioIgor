import type { CaseBase } from "./types";

/** Reserved — no authorized brief/assets in-repo. Do not invent problem/outcome. */
export const irisCase: CaseBase & {
  problem: null;
  notice: string;
} = {
  id: "iris-publica",
  index: "01",
  title: "Íris Pública",
  subtitle: "Inteligência e transparência em contratações públicas.",
  status: "reserved",
  stack: [],
  sources: [],
  problem: null,
  notice:
    "Capítulo reservado. O case será escrito apenas com material autorizado — problema, contexto, decisões e evidências. Nada inventado.",
};
