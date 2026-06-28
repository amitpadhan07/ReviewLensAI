"use client";

import React, { useState } from "react";
import {
  Button,
  Input,
  Modal,
  Toast,
  Loader,
} from "../../components/ui";
import { Code, Eye, Laptop, Send, Trash2, CheckCircle } from "lucide-react";

export default function ShowcasePage() {
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Toast States
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [toastVariant, setToastVariant] = useState<"success" | "error" | "info" | "warning">("info");

  // Dynamic Button Loading State
  const [isSubmitLoading, setIsSubmitLoading] = useState(false);

  // Dynamic Input States
  const [username, setUsername] = useState("");
  const [usernameError, setUsernameError] = useState("");

  const triggerToast = (msg: string, variant: typeof toastVariant) => {
    setToastMessage(msg);
    setToastVariant(variant);
  };

  const handleSubmitDemo = () => {
    if (!username) {
      setUsernameError("Username field cannot be left empty.");
      triggerToast("Form submission failed!", "error");
      return;
    }
    setUsernameError("");
    setIsSubmitLoading(true);
    triggerToast("Form submitting...", "info");
    
    setTimeout(() => {
      setIsSubmitLoading(false);
      triggerToast("Form submitted successfully!", "success");
    }, 2000);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-12 py-10 px-4 sm:px-0 text-left">
      {/* Page Header */}
      <div className="border-b border-stone-200 pb-5 space-y-2">
        <h1 className="text-3xl font-extrabold text-stone-900 tracking-tight flex items-center">
          <Laptop className="h-7 w-7 mr-2.5 text-emerald-700" />
          <span>UI Component Library Showcase</span>
        </h1>
        <p className="text-stone-500 text-sm max-w-2xl leading-relaxed">
          Explore and interact with the reusable UI components built for the ReviewLens AI platform.
          All components reside in <code className="bg-stone-100 text-stone-700 px-1.5 py-0.5 rounded text-xs">src/components/ui/</code>.
        </p>
      </div>

      {/* Grid Container */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* SECTION 1: BUTTONS */}
        <section className="bg-white border border-stone-200 rounded-xl p-6 shadow-sm space-y-5">
          <div className="border-b border-stone-100 pb-3 flex items-center justify-between">
            <h3 className="font-extrabold text-stone-800 text-sm tracking-wide uppercase">1. Button Component</h3>
            <span className="text-xs bg-emerald-50 text-emerald-800 font-semibold px-2 py-0.5 rounded-full border border-emerald-100">
              Interactive
            </span>
          </div>
          
          <div className="space-y-4">
            {/* Variants */}
            <div className="space-y-2">
              <p className="text-xs font-bold text-stone-400 uppercase tracking-wider">Style Variants</p>
              <div className="flex flex-wrap gap-2.5">
                <Button variant="primary">Primary</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="danger">Danger</Button>
              </div>
            </div>

            {/* Sizes */}
            <div className="space-y-2">
              <p className="text-xs font-bold text-stone-400 uppercase tracking-wider">Sizes</p>
              <div className="flex flex-wrap items-center gap-2.5">
                <Button size="sm">Small (sm)</Button>
                <Button size="md">Medium (md)</Button>
                <Button size="lg">Large (lg)</Button>
              </div>
            </div>

            {/* Interactive States */}
            <div className="space-y-2">
              <p className="text-xs font-bold text-stone-400 uppercase tracking-wider">Loading & Disabled States</p>
              <div className="flex flex-wrap gap-2.5">
                <Button isLoading variant="primary">Loading Primary</Button>
                <Button disabled variant="outline">Disabled</Button>
                <Button 
                  onClick={handleSubmitDemo}
                  isLoading={isSubmitLoading} 
                  variant="primary"
                  className="shadow-sm"
                >
                  Click to Simulate Fetch
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: INPUT FIELDS */}
        <section className="bg-white border border-stone-200 rounded-xl p-6 shadow-sm space-y-5">
          <div className="border-b border-stone-100 pb-3">
            <h3 className="font-extrabold text-stone-800 text-sm tracking-wide uppercase">2. Input Component</h3>
          </div>
          
          <div className="space-y-4">
            {/* Basic Input */}
            <Input 
              placeholder="Enter something basic..." 
              aria-label="Basic input"
            />

            {/* Labeled Input */}
            <Input 
              label="User Profile Name" 
              placeholder="e.g. amitpadhan07"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                if (e.target.value) setUsernameError("");
              }}
              error={usernameError}
              helperText="Choose a unique profile handle."
            />

            {/* Disabled Input */}
            <Input 
              label="System Status (Read Only)" 
              disabled 
              value="System operational (connected to Atlas)" 
            />
          </div>
        </section>

        {/* SECTION 3: LOADERS */}
        <section className="bg-white border border-stone-200 rounded-xl p-6 shadow-sm space-y-5">
          <div className="border-b border-stone-100 pb-3">
            <h3 className="font-extrabold text-stone-800 text-sm tracking-wide uppercase">3. Loader Component</h3>
          </div>
          
          <div className="space-y-6">
            {/* Sizes */}
            <div className="space-y-2">
              <p className="text-xs font-bold text-stone-400 uppercase tracking-wider">Sizes</p>
              <div className="flex items-center gap-6">
                <div className="flex flex-col items-center">
                  <Loader size="sm" />
                  <span className="text-[10px] text-stone-400 mt-1">sm</span>
                </div>
                <div className="flex flex-col items-center">
                  <Loader size="md" />
                  <span className="text-[10px] text-stone-400 mt-1">md</span>
                </div>
                <div className="flex flex-col items-center">
                  <Loader size="lg" />
                  <span className="text-[10px] text-stone-400 mt-1">lg</span>
                </div>
              </div>
            </div>

            {/* Colors */}
            <div className="space-y-2">
              <p className="text-xs font-bold text-stone-400 uppercase tracking-wider">Themes</p>
              <div className="flex items-center gap-6">
                <Loader size="md" color="emerald" label="Emerald Theme" />
                <Loader size="md" color="stone" label="Stone Theme" />
                <div className="bg-stone-800 p-3 rounded-lg flex items-center">
                  <Loader size="md" color="white" label="White text" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: MODALS & TOASTS */}
        <section className="bg-white border border-stone-200 rounded-xl p-6 shadow-sm space-y-5">
          <div className="border-b border-stone-100 pb-3">
            <h3 className="font-extrabold text-stone-800 text-sm tracking-wide uppercase">4 & 5. Modal & Toast Components</h3>
          </div>
          
          <div className="space-y-5">
            {/* Modal Show Trigger */}
            <div className="space-y-2">
              <p className="text-xs font-bold text-stone-400 uppercase tracking-wider">Modal Dialog Box</p>
              <div className="p-4 bg-stone-50 border border-stone-150 rounded-lg flex items-center justify-between">
                <span className="text-xs text-stone-500 font-medium">Trigger an overlay dialog</span>
                <Button 
                  onClick={() => setIsModalOpen(true)} 
                  variant="outline"
                  size="sm"
                  className="flex items-center"
                >
                  <Eye className="h-4 w-4 mr-1.5" />
                  Show Modal
                </Button>
              </div>
            </div>

            {/* Toast Triggers */}
            <div className="space-y-2">
              <p className="text-xs font-bold text-stone-400 uppercase tracking-wider">Toast Notifications</p>
              <div className="grid grid-cols-2 gap-2">
                <Button 
                  onClick={() => triggerToast("Successfully processed data!", "success")} 
                  variant="secondary"
                  size="sm"
                  className="justify-start border border-stone-200"
                >
                  🟢 Success Toast
                </Button>
                <Button 
                  onClick={() => triggerToast("Failed to connect to Mongo server.", "error")} 
                  variant="secondary"
                  size="sm"
                  className="justify-start border border-stone-200"
                >
                  🔴 Error Toast
                </Button>
                <Button 
                  onClick={() => triggerToast("Database capacity is at 85%.", "warning")} 
                  variant="secondary"
                  size="sm"
                  className="justify-start border border-stone-200"
                >
                  🟡 Warning Toast
                </Button>
                <Button 
                  onClick={() => triggerToast("Review sync in progress in background.", "info")} 
                  variant="secondary"
                  size="sm"
                  className="justify-start border border-stone-200"
                >
                  🔵 Info Toast
                </Button>
              </div>
            </div>
          </div>
        </section>

      </div>

      {/* RENDER MODAL */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Showcase Modal Dialog"
        footer={
          <>
            <Button onClick={() => setIsModalOpen(false)} variant="ghost">
              Cancel
            </Button>
            <Button 
              onClick={() => {
                setIsModalOpen(false);
                triggerToast("Action confirmed successfully!", "success");
              }} 
              variant="primary"
            >
              Confirm Action
            </Button>
          </>
        }
      >
        <div className="space-y-3">
          <p>
            This modal demonstrates the modular design of our <code className="bg-stone-100 text-stone-800 px-1 rounded">Modal</code> component. It blocks layout interaction by applying a soft blurred backdrop overlay.
          </p>
          <div className="bg-emerald-50 border border-emerald-150 p-3.5 rounded-lg flex items-start gap-2.5">
            <CheckCircle className="h-5 w-5 text-emerald-600 flex-shrink-0 mt-0.5" />
            <div className="space-y-0.5">
              <h4 className="text-emerald-950 font-bold text-xs">Accessibility & Usability Built-In</h4>
              <p className="text-emerald-900 text-xs leading-relaxed">
                Clicking outside the dialog or pressing the <kbd className="bg-emerald-100/80 px-1 rounded font-bold text-[10px]">ESC</kbd> key automatically cancels and closes the window.
              </p>
            </div>
          </div>
        </div>
      </Modal>

      {/* RENDER TOAST */}
      {toastMessage && (
        <Toast
          message={toastMessage}
          variant={toastVariant}
          onClose={() => setToastMessage(null)}
        />
      )}
    </div>
  );
}
