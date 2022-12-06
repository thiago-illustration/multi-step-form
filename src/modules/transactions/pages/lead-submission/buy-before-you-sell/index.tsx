import { z } from "zod";
import { MultiStepForm, useForm } from "ui/components";

import {
  ClientInfo,
  PropertyInfo,
  Confirmation,
} from "../../../components/lead-submission-steps";

const schema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z.string().email().min(1, { message: "Name is required" }),
  lastName: z.string().min(1, { message: "Last Name is required" }),
  accept: z.boolean({ required_error: "Accept is required" }),
  address: z.string().min(1, { message: "Address is required" }),
  city: z.string().min(1, { message: "City is required" }),
  state: z.string().min(1, { message: "State is required" }),
  zipcode: z.string().optional(),
});

const defaultValues = {
  name: "",
  email: "",
  lastName: "",
  accept: false,
  address: "",
  city: "",
  state: "",
  zipcode: "",
};

type FormData = z.infer<typeof schema>;

export const BBYS = () => {
  const methods = useForm<FormData>({ defaultValues, schema });

  const steps = [
    { title: "Client Info", component: <ClientInfo /> },
    { title: "Property Info", component: <PropertyInfo /> },
    { title: "Confirmation", component: <Confirmation /> },
  ];

  return (
    <MultiStepForm.Form<FormData>
      steps={steps}
      methods={methods}
      onSubmit={async (values) => {
        return new Promise((resolve) => {
          setTimeout(() => {
            console.log("submitting", values);
            resolve(true);
            window.location.pathname = "/";
          }, 2000);
        });
      }}
    />
  );
};
