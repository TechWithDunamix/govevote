"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { toast } from "@/components/ui/use-toast"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { getLGAs, getWards, getSenatorialZones, getPollingUnits } from "@/lib/nigeria-data"

interface Voter {
  id: string
  full_name: string
  state: string
  lga: string
  ward: string
  senatorial_zone: string
  polling_unit: string
  pvc_number: string
  nin: string
  is_pvc_verified: boolean
  is_nin_verified: boolean
  created_at: string
  updated_at: string
}

interface VoterDetailModalProps {
  voter: Voter
  isOpen: boolean
  onClose: () => void
  onUpdate: () => void
}

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
  is_pvc_verified: z.boolean(),
  is_nin_verified: z.boolean(),
})

export default function VoterDetailModal({ voter, isOpen, onClose, onUpdate }: VoterDetailModalProps) {
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      full_name: voter.full_name,
      state: voter.state,
      lga: voter.lga,
      ward: voter.ward,
      senatorial_zone: voter.senatorial_zone,
      polling_unit: voter.polling_unit,
      pvc_number: voter.pvc_number,
      nin: voter.nin,
      is_pvc_verified: voter.is_pvc_verified,
      is_nin_verified: voter.is_nin_verified,
    },
  })

  const watchState = form.watch("state")
  const watchLGA = form.watch("lga")
  const watchWard = form.watch("ward")

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)

    try {
      const token = localStorage.getItem("adminToken")

      const response = await fetch(`/api/admin/voter/${voter.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(values),
      })

      if (!response.ok) {
        throw new Error("Failed to update voter")
      }

      toast({
        title: "Success",
        description: "Voter information has been updated successfully.",
      })

      onUpdate()
      onClose()
    } catch (error) {
      console.error("Update error:", error)
      toast({
        title: "Update Failed",
        description: "There was an error updating the voter information. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Voter Details</DialogTitle>
          <DialogDescription>View and edit voter information. Click save when you're done.</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="full_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
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
                          <SelectValue placeholder="Select LGA" />
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
                          <SelectValue placeholder="Select ward" />
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
                          <SelectValue placeholder="Select senatorial zone" />
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
                  <Select onValueChange={field.onChange} defaultValue={field.value} disabled={!watchLGA || !watchWard}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select polling unit" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {watchLGA &&
                        watchWard &&
                        getPollingUnits("Anambra", watchLGA, watchWard).map((unit) => (
                          <SelectItem key={unit} value={unit}>
                            {unit}
                          </SelectItem>
                        ))}
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
                      <Input {...field} />
                    </FormControl>
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
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="is_pvc_verified"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                    <div className="space-y-0.5">
                      <FormLabel>PVC Verification</FormLabel>
                    </div>
                    <FormControl>
                      <Switch checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="is_nin_verified"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                    <div className="space-y-0.5">
                      <FormLabel>NIN Verification</FormLabel>
                    </div>
                    <FormControl>
                      <Switch checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Saving..." : "Save Changes"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
