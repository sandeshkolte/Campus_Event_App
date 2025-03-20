"use client";

import { DialogDescription } from "@/components/ui/dialog";

import { useState, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import {
  Upload,
  Save,
  MoveHorizontal,
  Type,
  Trash2,
  AlertCircle,
} from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";

import axios from "axios";
import { baseUrl } from "@/common/common";
import { toast } from "react-toastify";

export default function CertificateTemplateUploader({ event }) {
  const [isOpen, setIsOpen] = useState(false);
  const [template, setTemplate] = useState(null);
  const [activeTab, setActiveTab] = useState("edit");
  const [selectedElement, setSelectedElement] = useState(null);
  const [textElements, setTextElements] = useState([
    {
      id: "name",
      label: "Participant Name",
      value: "{participant.name}",
      position: { x: 50, y: 45 },
      size: 24,
      color: "#000000",
      enabled: true,
    },
    {
      id: "certificateNumber",
      label: "Certificate Number",
      value: "{certificateNumber}",
      position: { x: 50, y: 80 },
      size: 14,
      color: "#000000",
      enabled: true,
    },
    {
      id: "yearOfStudy",
      label: "Year of Study",
      value: "{participant.yearOfStudy}",
      position: { x: 25, y: 65 },
      size: 18,
      color: "#000000",
      enabled: false,
    },
    {
      id: "branch",
      label: "Branch",
      value: "{participant.branch}",
      position: { x: 75, y: 65 },
      size: 18,
      color: "#000000",
      enabled: false,
    },
  ]);
  const [draggingElement, setDraggingElement] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const templateRef = useRef(null);

  // Sample user data for preview
  const sampleUser = {
    name: "Ritesh Doijad",
    certificateNumber: "CERT-2025-12345",
    yearOfStudy: "4th Year",
    branch: "CSE",
  };

  // Handle template upload
  const handleTemplateUpload = async (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        toast({
          title: "Invalid file type",
          description: "Please upload an image file",
          variant: "destructive",
        });
        return;
      }

      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "event_certificate_template"); // Replace with your Cloudinary upload preset

      try {
        const response = await axios.post(
          "https://api.cloudinary.com/v1_1/diayircfv/image/upload",
          formData
        ); // Replace with your Cloudinary cloud name
        const imageUrl = response.data.secure_url;
        setTemplate(imageUrl);
        toast({
          title: "Upload successful",
          description: "Template uploaded successfully",
        });
      } catch (error) {
        console.error("Error uploading to Cloudinary:", error);
        toast({
          title: "Upload failed",
          description: "An error occurred while uploading the template",
          variant: "destructive",
        });
      }
    }
  };

  // Dragging functionality
  const handleDragStart = (id) => (e) => {
    e.stopPropagation();
    setDraggingElement(id);
    setSelectedElement(id);
  };

  const handleDrag = useCallback(
    (e) => {
      e.preventDefault();
      if (draggingElement && templateRef.current) {
        const rect = templateRef.current.getBoundingClientRect();
        const x = Math.max(
          0,
          Math.min(100, ((e.clientX - rect.left) / rect.width) * 100)
        );
        const y = Math.max(
          0,
          Math.min(100, ((e.clientY - rect.top) / rect.height) * 100)
        );

        setTextElements((prev) =>
          prev.map((el) =>
            el.id === draggingElement ? { ...el, position: { x, y } } : el
          )
        );
      }
    },
    [draggingElement]
  );

  const handleDragEnd = () => setDraggingElement(null);

  // Handle element selection
  const handleElementClick = (id) => (e) => {
    e.stopPropagation();
    setSelectedElement(id);
  };

  // Clear selection when clicking on the template background
  const handleTemplateClick = () => {
    setSelectedElement(null);
  };

  // Toggle field enabled state
  const toggleFieldEnabled = (id) => {
    setTextElements((prev) =>
      prev.map((el) => (el.id === id ? { ...el, enabled: !el.enabled } : el))
    );
  };

  // Update field color
  const updateFieldColor = (id, color) => {
    setTextElements((prev) =>
      prev.map((el) => (el.id === id ? { ...el, color } : el))
    );
  };

  // Save template & fields to backend
  const saveTemplate = async () => {
    if (!template) {
      toast({
        title: "Missing template",
        description: "Please upload a certificate template image",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsLoading(true);

      console.log(
        "Event Certificate data: ",
        event._id,
        template,
        textElements
      );

      await axios.post(`${baseUrl}/api/event/save-certificate-template`, {
        eventId: event._id,
        backgroundImage: template,
        fields: textElements,
      });

      toast({
        title: "Success",
        description: "Certificate template saved successfully",
      });
      setIsLoading(false);
      setIsOpen(false);
    } catch (error) {
      console.error("Error saving template:", error);
      toast({
        title: "Error saving template",
        description:
          error.response?.data?.message || "An unexpected error occurred",
        variant: "destructive",
      });
      setIsLoading(false);
    }
  };

  // Get the currently selected element
  const selectedElementData = textElements.find(
    (el) => el.id === selectedElement
  );

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="flex sm:mr-5 border-gray-200 border items-center gap-2"
        >
          <Upload className="h-4 w-4" />
          Upload Certificate Template
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto p-4 sm:p-6">
        <DialogHeader>
          <DialogTitle className="text-xl">
            Certificate Template Setup
          </DialogTitle>
          <DialogDescription>
            Upload a template image and position text elements to create
            certificates for your event participants.
          </DialogDescription>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="edit">Edit Template</TabsTrigger>
            <TabsTrigger value="preview">Preview Certificate</TabsTrigger>
          </TabsList>

          <TabsContent value="edit" className="space-y-6 mt-4">
            {/* Upload Template Section */}
            <Card>
              <CardHeader>
                <CardTitle>Certificate Template</CardTitle>
                <CardDescription>
                  Upload an image to use as your certificate background
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4">
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={handleTemplateUpload}
                    className="flex-1"
                  />
                  {template && (
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => setTemplate(null)}
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Remove
                    </Button>
                  )}
                </div>

                {template ? (
                  <div
                    ref={templateRef}
                    className="relative mt-4 border border-gray-300 rounded-md w-full"
                    style={{
                      width: "100%",
                      height: "480px",
                      backgroundImage: `url(${template})`,
                      backgroundSize: "contain",
                      backgroundPosition: "center",
                      backgroundRepeat: "no-repeat",
                      backgroundColor: "#f8f8f8",
                    }}
                    onDragOver={handleDrag}
                    onClick={handleTemplateClick}
                  >
                    {textElements
                      .filter((el) => el.enabled)
                      .map((el) => (
                        <div
                          key={el.id}
                          draggable={true}
                          onDragStart={handleDragStart(el.id)}
                          onDragEnd={handleDragEnd}
                          onClick={handleElementClick(el.id)}
                          style={{
                            position: "absolute",
                            top: `${el.position.y}%`,
                            left: `${el.position.x}%`,
                            transform: "translate(-50%, -50%)",
                            cursor: "move",
                            padding: "5px",
                            backgroundColor:
                              selectedElement === el.id
                                ? "rgba(59, 130, 246, 0.2)"
                                : "rgba(255, 255, 255, 0.5)",
                            border:
                              selectedElement === el.id
                                ? "2px solid #3b82f6"
                                : "1px dashed #000",
                            fontSize: `${el.size}px`,
                            color: el.color,
                            borderRadius: "4px",
                            zIndex: selectedElement === el.id ? 10 : 1,
                            userSelect: "none",
                          }}
                        >
                          {el.label}
                        </div>
                      ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-60 bg-gray-100 rounded-md mt-4">
                    <AlertCircle className="h-12 w-12 text-gray-400 mb-2" />
                    <p className="text-gray-500">No template uploaded</p>
                    <p className="text-gray-400 text-sm">
                      Upload an image to start designing your certificate
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Element Properties */}
            {selectedElementData && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Type className="h-4 w-4 mr-2" />
                    Field Properties: {selectedElementData.label}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="">
                    <div>
                      <Label htmlFor="fieldLabel">Field Label</Label>
                      <Input
                        id="fieldLabel"
                        value={selectedElementData.label}
                        onChange={(e) =>
                          setTextElements((prev) =>
                            prev.map((item) =>
                              item.id === selectedElementData.id
                                ? { ...item, label: e.target.value }
                                : item
                            )
                          )
                        }
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <Label htmlFor="fontSize">
                        Font Size: {selectedElementData.size}px
                      </Label>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="fontColor">Font Color</Label>
                    <div className="flex items-center gap-2 mt-1">
                      <Input
                        id="fontColor"
                        type="color"
                        value={selectedElementData.color}
                        onChange={(e) =>
                          updateFieldColor(
                            selectedElementData.id,
                            e.target.value
                          )
                        }
                        className="w-12 h-8 p-1"
                      />
                      <Input
                        value={selectedElementData.color}
                        onChange={(e) =>
                          updateFieldColor(
                            selectedElementData.id,
                            e.target.value
                          )
                        }
                        className="flex-1"
                      />
                    </div>
                  </div>

                  <div className="flex justify-between items-center pt-2">
                    <div className="flex items-center">
                      <MoveHorizontal className="h-4 w-4 mr-2 text-gray-500" />
                      <span className="text-sm text-gray-500">
                        Drag to position on template
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Certificate Fields Section */}
            <Card>
              <CardHeader>
                <CardTitle>Certificate Fields</CardTitle>
                <CardDescription>
                  Enable or disable fields on your certificate template
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {textElements.map((el) => (
                    <div
                      key={el.id}
                      className={`p-3 border rounded-md cursor-pointer transition-colors ${
                        selectedElement === el.id
                          ? "border-primary bg-primary/5"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                      onClick={handleElementClick(el.id)}
                    >
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-3">
                          <div className="flex items-center space-x-2">
                            <div
                              className="relative flex items-center justify-center w-5 h-5 rounded-sm border border-gray-300 bg-white hover:bg-gray-100 focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <Checkbox
                                id={`enable-${el.id}`}
                                checked={el.enabled}
                                onCheckedChange={() =>
                                  toggleFieldEnabled(el.id)
                                }
                                className="h-4 w-4 data-[state=checked]:bg-gray-900 data-[state=checked]:text-white"
                              />
                            </div>
                            <Label
                              htmlFor={`enable-${el.id}`}
                              className="font-medium"
                              onClick={(e) => e.stopPropagation()}
                            >
                              {el.label}
                            </Label>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="text-xs text-gray-500">
                            {el.size}px
                          </div>
                          <div
                            className="w-4 h-4 rounded-full border border-gray-300"
                            style={{ backgroundColor: el.color }}
                          />
                        </div>
                      </div>
                      <div className="text-sm text-gray-500 mt-1">
                        {el.value}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="preview" className="space-y-6 mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Certificate Preview</CardTitle>
                <CardDescription>
                  Preview how the certificate will look with sample data
                </CardDescription>
              </CardHeader>
              <CardContent>
                {template ? (
                  <div
                    className="relative border border-gray-300 rounded-md w-full"
                    style={{
                      width: "100%",
                      height: "480px",
                      backgroundImage: `url(${template})`,
                      backgroundSize: "contain",
                      backgroundPosition: "center",
                      backgroundRepeat: "no-repeat",
                      backgroundColor: "#f8f8f8",
                    }}
                  >
                    {textElements
                      .filter((el) => el.enabled)
                      .map((el) => {
                        // Replace placeholders with sample data
                        let displayValue = el.value;
                        if (el.id === "name") {
                          displayValue = sampleUser.name;
                        } else if (el.id === "certificateNumber") {
                          displayValue = sampleUser.certificateNumber;
                        } else if (el.id === "yearOfStudy") {
                          displayValue = sampleUser.yearOfStudy;
                        } else if (el.id === "branch") {
                          displayValue = sampleUser.branch;
                        }

                        return (
                          <div
                            key={el.id}
                            style={{
                              position: "absolute",
                              top: `${el.position.y}%`,
                              left: `${el.position.x}%`,
                              transform: "translate(-50%, -50%)",
                              fontSize: `${el.size}px`,
                              color: el.color,
                              textAlign: "center",
                              fontWeight: ["name", "yearOfStudy", "branch"].includes(el.id) ? "bold" : "normal",
                              textShadow: "0 0 1px rgba(255,255,255,0.5)",
                            }}
                          >
                            {displayValue}
                          </div>
                        );
                      })}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-60 bg-gray-100 rounded-md">
                    <AlertCircle className="h-12 w-12 text-gray-400 mb-2" />
                    <p className="text-gray-500">No template uploaded</p>
                    <p className="text-gray-400 text-sm">
                      Upload a template in the Edit tab first
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <DialogFooter className="mt-6">
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button onClick={saveTemplate} disabled={!template || isLoading}>
            {isLoading ? (
              <span className="flex items-center">
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Saving...
              </span>
            ) : (
              <>
                <Save className="h-4 w-4 mr-2" />
                Save And Upload Template
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
