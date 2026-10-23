import { fireSimCase } from "./firesim";
import { irisCase } from "./iris";
import { layoutPlusCase } from "./layoutplus";
import { puroSucoCase } from "./purosuco";

export const featuredCases = [irisCase, puroSucoCase, layoutPlusCase, fireSimCase] as const;

export { irisCase, puroSucoCase, layoutPlusCase, fireSimCase };
export type * from "./types";
