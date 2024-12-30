import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
  } from "@/components/ui/breadcrumb"

  import React from 'react'
import { Link } from "react-router-dom"
  
  const BreadCrumb = ({name}) => {
    return (
      <div className="pb-5 pt-2" >
        <Breadcrumb>
  <BreadcrumbList>
    <BreadcrumbItem>
      <Link to="/" className={"text-lg text-gray-700 hover:underline hover:text-gray-950 "} >Home</Link>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    {/* <BreadcrumbItem>
      <BreadcrumbLink href="/components">Components</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator /> */}
    <BreadcrumbItem>
      <BreadcrumbPage className={"text-lg text-gray-700 hover:underline-offset-1 hover:text-gray-950 "}  >{name}</BreadcrumbPage>
    </BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>

      </div>
    )
  }
  
  export default BreadCrumb