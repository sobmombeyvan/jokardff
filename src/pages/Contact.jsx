import React, { useState } from 'react';
import { Input } from '../components/ui/Input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, SelectGroup } from '../components/ui/Select';
import { Textarea } from '../components/ui/Textarea';
import { Button } from '../components/ui/Button';
import { Mail } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
    alert('Thank you for your message! We will get back to you shortly.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <section className="container max-auto flex flex-col items-center gap-6 sm:gap-7 py-12">
      <div className="flex flex-col gap-3 items-center">
        <div className="flex items-center justify-center rounded-xl h-16 w-16 bg-primary mb-2">
          <Mail className="h-9 w-9 text-secondary" />
        </div>
        <span className="font-bold uppercase text-primary text-center">contact us</span>
        <h2 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl text-balance text-center mt-4">
          Have additional inquiries?
        </h2>
        <p className="text-lg text-muted-foreground text-balance sm:max-w-2xl text-center">
          Please complete the form below & we'll get back to you shortly
        </p>
      </div>
      
      <div className="text-black sm:w-1/2 bg-[black] w-[100%]">
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <Input 
            type="text" 
            placeholder="Name" 
            value={formData.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            required
          />
          <Input 
            type="email" 
            placeholder="Email" 
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            required
          />
          <Select onValueChange={(value) => handleInputChange('subject', value)}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Please Select" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="Ideas & Features">Ideas & Features</SelectItem>
                <SelectItem value="Problem & Troubleshooting">Problem & Troubleshooting</SelectItem>
                <SelectItem value="Shipping & Billing">Shipping & Billing</SelectItem>
                <SelectItem value="Collaboration & Partnership">Collaboration & Partnership</SelectItem>
                <SelectItem value="Book a Demo Call">Book a Demo Call</SelectItem>
                <SelectItem value="Other">Other</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <Textarea 
            placeholder="Type your message here." 
            value={formData.message}
            onChange={(e) => handleInputChange('message', e.target.value)}
            required
          />
          <Button 
            type="submit" 
            className="inline-flex items-center text-white justify-center whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-11 rounded-md px-8 w-full mt-6 text-base"
          >
            Submit
          </Button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
