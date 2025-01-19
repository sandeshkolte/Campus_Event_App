"use client";

import React, { useState, useRef, useCallback, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Award, PlusCircle, X } from "lucide-react";
import { Slider } from "@radix-ui/react-slider";
import axios from "axios";
import { baseUrl } from "@/common/common";

export default function CertificateGeneratorDialog({ event }) {
  const [isOpen, setIsOpen] = useState(false);
  const [template, setTemplate] = useState(null);
  // const [participants, setParticipants] = useState([
  //   { name: "Sandesh Kolte", email: "sandeshkolte11@gmail.com" },
  //   { name: "Ritesh Doijad", email: "riteshdoijad218@gmail.com" },
  //   { name: "Bhupendra Chandanmalagar", email: "bhupendra@gmail.com" },
  // ]);

  const [loading, setLoading] = useState(false)
  const [data, setData] = useState([])

  useEffect(() => {
    const fetchParticipants = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${baseUrl}/api/user/get-allparticipants/${event._id}`);
        setData(response.data.response);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchParticipants();
  }, [event._id]);

  const participants = data;
  const [generatedCertificates, setGeneratedCertificates] = useState([]);
  const [textElements, setTextElements] = useState([
    {
      id: "name",
      label: "Participant Name",
      value: "{participant.name}",
      position: { x: 50, y: 50 },
      size: 18,
    },
    {
      id: "certificateNumber",
      label: "Certificate Number",
      value: "{certificateNumber}",
      position: { x: 50, y: 90 },
      size: 14,
    },
  ]);
  const [draggingElement, setDraggingElement] = useState(null);
  const [newFieldLabel, setNewFieldLabel] = useState("");
  const [newFieldValue, setNewFieldValue] = useState("");
  const templateRef = useRef(null);

  const handleTemplateUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setTemplate(e.target?.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragStart = (id) => () => {
    setDraggingElement(id);
  };

  const handleDrag = useCallback(
    (e) => {
      e.preventDefault();
      if (draggingElement && templateRef.current) {
        const rect = templateRef.current.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        setTextElements((prev) =>
          prev.map((el) =>
            el.id === draggingElement ? { ...el, position: { x, y } } : el
          )
        );
      }
    },
    [draggingElement]
  );

  const handleDragEnd = () => {
    setDraggingElement(null);
  };

  const generateCertificateNumber = () => {
    const timestamp = Math.floor(Date.now() / 1000); // Convert to seconds (10-digit timestamp)
    const randomNumber = Math.floor(100000 + Math.random() * 900000); // Generate a 6-digit random number
    const number = timestamp-randomNumber
    return `CERT-${number}`;
  };

  const addNewField = () => {
    if (newFieldLabel && newFieldValue) {
      const newId = `field_${Date.now()}`;
      setTextElements((prev) => [
        ...prev,
        {
          id: newId,
          label: newFieldLabel,
          value: newFieldValue,
          position: { x: 50, y: 50 },
          size: 14,
        },
      ]);
      setNewFieldLabel("");
      setNewFieldValue("");
    }
  };

  const removeField = (id) => {
    setTextElements((prev) => prev.filter((el) => el.id !== id));
  };

  const generateCertificates = () => {
    const certificates = participants.map((participant) => {
      const certificateNumber = generateCertificateNumber();
      return `
        <div style="position: relative; width: 800px; height: 600px; background-image: url(${template}); background-size: cover;">
          ${textElements
          .map(
            (el) => `
            <div style="position: absolute; top: ${el.position.y}%; left: ${el.position.x}%; transform: translate(-50%, -50%); font-size: ${el.size}px; font-weight: bold; text-align: center;">
              ${el.value
                .replace("{participant.name}", `${participant.firstname} ${participant.lastname}`)
                .replace("{certificateNumber}", certificateNumber)}
            </div>
          `
          )
          .join("")}
        </div>
      `;
    });
    setGeneratedCertificates(certificates);
  };


  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="flex sm:mr-5 border-gray-100 border-2 items-center gap-2"
        >
          <Award className="h-4 w-4" />
          Open Certificate Generator
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-4 sm:p-8">
        <DialogHeader>
          <DialogTitle>Event Certificate Generator</DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Upload Certificate Template</CardTitle>
            </CardHeader>
            <CardContent>
              <Input
                type="file"
                accept="image/*"
                onChange={handleTemplateUpload}
              />
              {template && (
                <div
                  ref={templateRef}
                  className="relative mt-4 border border-gray-300 rounded-md w-full h-full"
                  style={{
                    width: "full",
                    height: "480px",
                    backgroundImage: `url(${template})`,
                    backgroundSize: "cover",
                  }}
                  onDragOver={handleDrag}
                >
                  {textElements.map((el) => (
                    <div
                      key={el.id}
                      draggable
                      onDragStart={handleDragStart(el.id)}
                      onDragEnd={handleDragEnd}
                      style={{
                        position: "absolute",
                        top: `${el.position.y}%`,
                        left: `${el.position.x}%`,
                        transform: "translate(-50%, -50%)",
                        cursor: "move",
                        padding: "5px",
                        backgroundColor: "rgba(255, 255, 255, 0.7)",
                        border: "1px dashed #000",
                        fontSize: `${el.size}px`,
                      }}
                    >
                      {el.label}
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Certificate Information Fields</CardTitle>
            </CardHeader>
            <CardContent>
              {textElements.map((el) => (
                <div key={el.id} className="mb-4 flex flex-wrap items-center">
                  <div className="flex-grow mb-2 sm:mb-0">
                    <Label>{el.label}</Label>
                    <Input
                      value={el.value}
                      onChange={(e) =>
                        setTextElements((prev) =>
                          prev.map((item) =>
                            item.id === el.id
                              ? { ...item, value: e.target.value }
                              : item
                          )
                        )
                      }
                    />
                  </div>
                  <Slider
                    className="w-32 mx-4"
                    min={10}
                    max={40}
                    step={1}
                    value={[el.size]}
                    onValueChange={(value) => {
                      setTextElements((prev) =>
                        prev.map((item) =>
                          item.id === el.id ? { ...item, size: value[0] } : item
                        )
                      );
                    }}
                  />
                  {el.id !== "name" && el.id !== "certificateNumber" && (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeField(el.id)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
              <div className="flex items-end gap-2 mt-4 flex-wrap">
                <div className="flex-grow">
                  <Label>New Field Label</Label>
                  <Input
                    value={newFieldLabel}
                    onChange={(e) => setNewFieldLabel(e.target.value)}
                    placeholder="e.g., Event Name"
                  />
                </div>
                <div className="flex-grow mt-2 sm:mt-0">
                  <Label>New Field Value</Label>
                  <Input
                    value={newFieldValue}
                    onChange={(e) => setNewFieldValue(e.target.value)}
                    placeholder="e.g., Web Development Conference 2023"
                  />
                </div>
                <Button
                  onClick={addNewField}
                  className="mt-2 sm:mt-0"
                >
                  <PlusCircle className="h-4 w-4 mr-2" />
                  Add Field
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Participants</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="max-h-64 overflow-y-auto">
                {participants.length > 0 ? (
                  <ul className="space-y-4">
                    {participants.map((participant, index) => (
                      <li key={index} className="flex w-[280px] max-w-[330px] p-3 rounded-md h-11 text-sm bg-gray-100 justify-between">
                        <div>

                          <p>{participant.firstname} {participant.lastname}</p>
                          {/* <p>{participant.email}</p> */}
                        </div>
                        <div className="text-xs text-white flex gap-2">
                          <div className="bg-purple-600 p-1 rounded-3xl">
                            {participant.yearOfStudy ?? "N/A"}
                          </div>
                          <div className="bg-indigo-600 p-1 rounded-3xl">
                            {participant.branch ?? "N/A"}
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-500">No participants available.</p>
                )}
              </div>
            </CardContent>
          </Card>


          <Button onClick={generateCertificates} disabled={!template} className="w-full sm:w-auto">
            Generate Certificates
          </Button>

          {generatedCertificates.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Generated Certificates</CardTitle>
              </CardHeader>
              <CardContent>
                {generatedCertificates.map((cert, index) => (
                  <div
                    key={index}
                    dangerouslySetInnerHTML={{ __html: cert }}
                    className="mb-4"
                  />
                ))}
              </CardContent>
            </Card>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
