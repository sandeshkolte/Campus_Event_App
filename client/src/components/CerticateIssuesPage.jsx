"use client";

import React, { useState, useRef, useCallback } from "react";
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

export default function CertificateGeneratorDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const [template, setTemplate] = useState(null);
  const [participants, setParticipants] = useState([
    { name: "John Doe", email: "john@example.com" },
    { name: "Jane Smith", email: "jane@example.com" },
    { name: "Bob Johnson", email: "bob@example.com" },
  ]);
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
    return "CERT-" + Math.random().toString(36).substr(2, 9).toUpperCase();
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
                .replace("{participant.name}", participant.name)
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
                  className="relative mt-4 border border-gray-300 rounded-md"
                  style={{
                    width: "100%",
                    height: "450px",
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
              <Textarea
                value={JSON.stringify(participants, null, 2)}
                onChange={(e) => setParticipants(JSON.parse(e.target.value))}
                rows={10}
                className="resize-none"
              />
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
