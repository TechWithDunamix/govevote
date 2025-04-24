"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/components/ui/use-toast"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { getLGAs, getWards, getSenatorialZones, getPollingUnits } from "@/lib/nigeria-data"

const formSchema = z.object({
  full_name: z.string().min(3, {
    message: "Full name must be at least 3 characters.",
  }),
  state: z.string().optional(),
  lga: z.string({
    required_error: "Please select a Local Government Area.",
  }),
  ward: z.string({
    required_error: "Please select a Ward.",
  }),
  senatorial_zone: z.string({
    required_error: "Please select a Senatorial Zone.",
  }),
  polling_unit: z.string({
    required_error: "Please select a Polling Unit.",
  }),
  pvc_number: z.string().min(8, {
    message: "PVC number must be at least 8 characters.",
  }),
  nin: z.string().min(11, {
    message: "NIN must be at least 11 characters.",
  }),
})

export default function RegisterPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      full_name: "",
      state: "Anambra", // Pre-select Anambra
      lga: "",
      ward: "",
      senatorial_zone: "",
      polling_unit: "",
      pvc_number: "",
      nin: "",
    },
  })

  // Add the watchWard variable to track the selected ward for polling unit selection

  const watchState = form.watch("state")
  const watchLGA = form.watch("lga")
  const watchWard = form.watch("ward")

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)

    try {
      const response = await fetch("/api/voters", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      })

      if (!response.ok) {
        throw new Error("Failed to register voter")
      }

      const data = await response.json()

      toast({
        title: "Registration Successful",
        description: "Your voter registration has been submitted successfully.",
      })

      router.push("/registration-success")
    } catch (error) {
      console.error("Registration error:", error)
      toast({
        title: "Registration Failed",
        description: "There was an error submitting your registration. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto py-10 px-4">
      <Card className="max-w-3xl mx-auto">
        <CardHeader className="bg-gradient-to-r from-blue-700 to-blue-500 text-white rounded-t-lg">
          <CardTitle className="text-2xl">Voter Registration</CardTitle>
          <CardDescription className="text-blue-100">
            Register to participate in the Nigerian electoral process
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="full_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your full name" {...field} />
                    </FormControl>
                    <FormDescription>Enter your name as it appears on your official documents.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="state"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>State</FormLabel>
                      <FormControl>
                        <Input value="Anambra" disabled className="bg-gray-100" />
                      </FormControl>
                      <FormDescription>Registration is only available for Anambra State</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="lga"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Local Government Area</FormLabel>
                      <Select
                        onValueChange={(value) => {
                          field.onChange(value)
                          form.setValue("ward", "")
                        }}
                        defaultValue={field.value}
                        disabled={!watchState}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select your LGA" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {watchState &&
                            getLGAs(watchState).map((lga) => (
                              <SelectItem key={lga} value={lga}>
                                {lga}
                              </SelectItem>
                            ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="ward"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Ward</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        disabled={!watchState || !watchLGA}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select your ward" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {watchState &&
                            watchLGA &&
                            getWards(watchState, watchLGA).map((ward) => (
                              <SelectItem key={ward} value={ward}>
                                {ward}
                              </SelectItem>
                            ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="senatorial_zone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Senatorial Zone</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value} disabled={!watchState}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select your senatorial zone" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {watchState &&
                            getSenatorialZones(watchState).map((zone) => (
                              <SelectItem key={zone} value={zone}>
                                {zone}
                              </SelectItem>
                            ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="polling_unit"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Polling Unit</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      disabled={!watchState || !watchLGA || !watchWard}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your polling unit" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {watchState &&
                          watchLGA &&
                          watchWard &&
                          getPollingUnits(watchState, watchLGA, watchWard).map((unit) => (
                            <SelectItem key={unit} value={unit}>
                              {unit}
                            </SelectItem>
                          ))}
                      </SelectContent>
                      <SelectContent>
                          <SelectItem value="other">Other</SelectItem>
                          <SelectItem value="none">None</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="pvc_number"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>PVC Number</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your PVC number" {...field} />
                      </FormControl>
                      <FormDescription>Your Permanent Voter's Card number</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="nin"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>NIN</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your NIN" {...field} />
                      </FormControl>
                      <FormDescription>Your National Identification Number</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" disabled={isLoading}>
                {isLoading ? "Submitting..." : "Register to Vote"}
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex justify-center border-t pt-6">
          <p className="text-sm text-gray-500">
            By registering, you confirm that all provided information is accurate and true.
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}
