"use client"

import { useState, useEffect } from "react"
import axios from "axios"
import { useSelector } from "react-redux"
import { baseUrl } from "@/common/common"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MoreHorizontal, Search, Filter } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Skeleton } from "@/components/ui/skeleton"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function AdminToggle() {
  const [users, setUsers] = useState([])
  const [searchQuery, setSearchQuery] = useState("")
  const [yearFilter, setYearFilter] = useState("all")
  const [loading, setLoading] = useState(true)
  const userInfo = useSelector((state) => state.auth?.userInfo)

  useEffect(() => {
    if (userInfo?.role === "superadmin") {
      fetchStudents(userInfo?.branch, userInfo?.role)
    }
  }, [userInfo])

  const fetchStudents = async (branch, role) => {
    setLoading(true)
    try {
      const response = await axios.post(`${baseUrl}/api/admin/students`, { branch, role })
      const usersWithFullname = response.data.map((user) => ({
        ...user,
        fullname: `${user.firstname} ${user.lastname}`,
      }))
      setUsers(usersWithFullname)
      // console.log(response.data)
    } catch (error) {
      console.error("Error fetching students:", error)
    } finally {
      setLoading(false)
    }
  }

  const toggleUserRole = async (userId, currentRole) => {
    try {
      const newRole = currentRole === "user" ? "admin" : "user"
      await axios.put(`${baseUrl}/api/admin/update-role/${userId}`, { role: newRole })
      fetchStudents(userInfo.branch, userInfo.role)
    } catch (error) {
      console.error("Error updating role:", error)
    }
  }

  const filteredUsers = users?.filter((user) => {
    // Filter by search query (name or email)
    const matchesSearch =
      (user.fullname && user.fullname.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (user.email && user.email.toLowerCase().includes(searchQuery.toLowerCase()))

    // Filter by year of study
    const matchesYear = yearFilter === "all" || (user?.yearOfStudy && user.yearOfStudy.toString() === yearFilter)

    // Return users that match both filters
    return matchesSearch && matchesYear
  })

  // Skeleton loader component
  const TableSkeleton = () => (
    <div className="space-y-3">
      {[1, 2, 3, 4, 5].map((item) => (
        <div key={item} className="flex items-center space-x-4 py-3">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
        </div>
      ))}
    </div>
  )

  return (
    <div className="space-y-4 h-[calc(100vh-200px)]">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-start gap-3 mt-5 lg:mt-0">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search users..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            disabled={loading}
          />
        </div>

        <div className="flex items-center gap-2">
          <Select value={yearFilter} onValueChange={setYearFilter} disabled={loading}>
            <SelectTrigger className="w-[180px]">
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                <SelectValue placeholder="Filter by year" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Years</SelectItem>
              <SelectItem value="1st">1st Year</SelectItem>
              <SelectItem value="2nd">2nd Year</SelectItem>
              <SelectItem value="3rd">3rd Year</SelectItem>
              <SelectItem value="4th">4th Year</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="rounded-md border">
        {loading ? (
          <div className="p-4">
            <div className="flex items-center space-x-4 py-3">
              <Skeleton className="h-5 w-24" />
              <Skeleton className="h-5 w-16 ml-auto" />
              <Skeleton className="h-5 w-24" />
              <Skeleton className="h-5 w-16" />
            </div>
            <TableSkeleton />
          </div>
        ) : (
          <div className="lg:max-h-[400px] overflow-y-auto">
            <Table className="min-w-full">
              <TableHeader className="sticky top-0 shadow-md">
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Year of Study</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers?.length > 0 ? (
                  filteredUsers?.map((user) => (
                    <TableRow key={user._id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarImage
                              src={user?.image || "/placeholder.svg?height=40&width=40"}
                              alt={user.fullname}
                            />
                            <AvatarFallback>
                              {user.fullname ? user.fullname.substring(0, 2).toUpperCase() : "NA"}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{user.fullname ? user.fullname : "NA"} </div>
                            <div className="text-sm text-muted-foreground">{user.email}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={user.role === "admin" ? "bg-black text-white" : "bg-white text-black"}>
                          {user.role}
                        </Badge>
                      </TableCell>
                      <TableCell>{user?.yearOfStudy ? user?.yearOfStudy : "N/A"} year</TableCell>
                      <TableCell className="text-right">
                        {userInfo?.role === "superadmin" && (
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4 mr-5 lg:mr-0" />
                                <span className="sr-only">Open menu</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => toggleUserRole(user._id, user.role)}>
                                Change to {user.role === "admin" ? "User" : "Admin"}
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        )}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center py-6">
                      No users found. Try a different search or filter.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        )}
      </div>

      <div className="text-sm text-muted-foreground text-end">
        {!loading && `Showing ${filteredUsers.length} of ${users.length} users`}
      </div>
    </div>
  )
}

