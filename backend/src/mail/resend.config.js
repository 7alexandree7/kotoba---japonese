import { Resend } from "resend";
import { ENV_VARIABLES } from "../config/ENV_VARIABLES.js";

export const resend = new Resend(ENV_VARIABLES.RESEND_API_KEY);
