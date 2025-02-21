import * as React from "react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function Page() {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <Card className="w-[400px]">
        <CardHeader>
          <CardTitle className="py-6 text-center">COS 101: Intro to programming I</CardTitle>
          <CardDescription>Fill in your details to proceed.</CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              {/* Matric Number Input */}
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="matric">Matric Number</Label>
                <Input className="focus:outline-none" id="matric" placeholder="Enter your matric number" />
              </div>
              
              {/* Password Input */}
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password">Password</Label>
                <Input className="outlin" id="password" type="password" placeholder="Enter your password" />
              </div>
              
              {/* Department Select */}
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="department">Department</Label>
                <Select>
                  <SelectTrigger id="department">
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent className="bg-white" position="popper">
                    <SelectItem value="computer-science">Computer Science</SelectItem>
                    <SelectItem value="engineering">Engineering</SelectItem>
                    <SelectItem value="business">Business Administration</SelectItem>
                    <SelectItem value="medicine">Medicine</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              {/* Lecturer Select */}
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="lecturer">Lecturer</Label>
                <Select>
                  <SelectTrigger id="lecturer">
                    <SelectValue placeholder="Select lecturer" />
                  </SelectTrigger>
                  <SelectContent className="bg-white" position="popper">
                    <SelectItem value="dr-smith">Dr. Smith</SelectItem>
                    <SelectItem value="prof-johnson">Prof. Johnson</SelectItem>
                    <SelectItem value="dr-williams">Dr. Williams</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button className="bg-primary text-[#eef6ee] rounded-full" type="submit">Enter Exam</Button>
        </CardFooter>
      </Card>
    </div>
  )
}
