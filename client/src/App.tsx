import "./App.css";
import { z } from "zod";
import { Button } from "./components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./components/ui/form";
import { Input } from "./components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "./components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "./components/ui/calendar";
import { format } from "date-fns";
import { cn, converetOptionMultiple } from "./lib/utils";
import MultipleSelector, { Option } from "./components/ui/MultipleSelector";
import { useTreatments } from "./data/queries/treatment/treatment";
import { useMedications } from "./data/queries/medication/medication";
import { useCreateTransaction } from "./data/queries/transaction/transaction";
import { ReqTransactionType } from "./data/types/transaction/transactionType";

const formSchema = z.object({
  patientName: z.string().min(1, "Name is required"),
  patientId: z.string().min(1, "Patient ID is required"),
  date: z.date({ message: "Date of Treatment is required" }),
  cost: z.number().min(0, "Cost of Treatment is required"),
  treatmentId: z.array(z.string()).min(1, "Treatment is required"),
  medicationId: z.array(z.string()).min(1, "Medication is required"),
});

function App() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      patientName: "",
      patientId: "",
      treatmentId: [],
      medicationId: [],
      cost: 0,
    },
  });
  const { data: listTreatments } = useTreatments();
  const { data: listMedication } = useMedications();
  const createTransaction = useCreateTransaction();

  const multiChange = (e: Option[], type: "treatments" | "medication") => {
    const value = e.map((item: Option) => item.value);
    if (type === "treatments") {
      form.setValue("treatmentId", value);
    } else if (type === "medication") {
      form.setValue("medicationId", value);
    }
  };

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    const payload: ReqTransactionType = {
      ...data,
      date: new Date(data.date.setHours(23, 59, 59)).toISOString(),
    };
    await createTransaction.mutateAsync(payload);
  };

  return (
    <>
      <div className="flex items-center justify-center w-full h-screen">
        <Form {...form}>
          <form
            className="flex flex-col gap-y-2 border p-4 w-md "
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <h1 className="font-bold text-2xl">Form Patient</h1>
            <div className="flex flex-col gap-y-3">
              <FormField
                control={form.control}
                name="patientName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Patient Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Patient name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="patientId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Patient ID</FormLabel>
                    <FormControl>
                      <Input placeholder="Patient ID" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Date Treatment</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date > new Date() || date < new Date("1900-01-01")
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {listTreatments && (
                <FormField
                  control={form.control}
                  name="treatmentId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Treatment Description</FormLabel>
                      <FormControl>
                        <MultipleSelector
                          {...field.onChange}
                          onChange={(e) => multiChange(e, "treatments")}
                          defaultOptions={converetOptionMultiple(
                            listTreatments,
                            "id",
                            "name"
                          )}
                          placeholder="Select Treatment you like"
                          emptyIndicator={
                            <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
                              no results found.
                            </p>
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              {listMedication && (
                <FormField
                  control={form.control}
                  name="medicationId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Medication Prescribed</FormLabel>
                      <FormControl>
                        <MultipleSelector
                          {...field.onChange}
                          onChange={(e) => multiChange(e, "medication")}
                          defaultOptions={converetOptionMultiple(
                            listMedication,
                            "id",
                            "name"
                          )}
                          placeholder="Select medication you like"
                          emptyIndicator={
                            <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
                              no results found.
                            </p>
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              <FormField
                control={form.control}
                name="cost"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cost of Treatment</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Cost Treatment"
                        type="number"
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex items-center justify-end gap-x-4">
              <Button variant={"ghost"} className="cursor-pointer">
                Cancel
              </Button>
              <Button type="submit" className="cursor-pointer">
                Submit
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </>
  );
}

export default App;
