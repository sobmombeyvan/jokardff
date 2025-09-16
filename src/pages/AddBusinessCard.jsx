import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Label } from '../components/ui/Label';
import { Textarea } from '../components/ui/Textarea';
import { ChevronLeft, ChevronRight, Check, Eye, QrCode, CreditCard } from 'lucide-react';

const AddBusinessCard = () => {
  const navigate = useNavigate();
  const [currentTab, setCurrentTab] = useState('content');
  const [isLoading, setIsLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    // Content
    firstName: 'John',
    lastName: 'Doe',
    title: 'CEO',
    company: 'Ultimate International',
    email: 'john@example.com',
    phone: '+1 234 567 8900',
    website: 'https://example.com',
    address: '123 Business St, City, State 12345',
    
    // Design
    primaryColor: '#042418',
    secondaryColor: '#000000',
    fontFamily: 'system-ui',
    
    // QR Code
    qrSize: 250,
    qrColor: '#000000',
    
    // Card
    cardBackground: '#ffffff',
    cardRadius: 16
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      navigate('/dashboard/bcards');
    }, 2000);
  };

  const tabs = [
    { id: 'content', label: 'Contenu', number: 1 },
    { id: 'setting', label: 'Design / paramètres', number: 2 },
    { id: 'qrcode', label: 'Qr Code', number: 3 },
    { id: 'card', label: 'Carte', number: 4 }
  ];

  const previewTabs = [
    { id: 'preview', label: 'Preview', icon: Eye },
    { id: 'qrcode', label: 'QR Code', icon: QrCode },
    { id: 'card', label: 'Card', icon: CreditCard }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {isLoading && (
        <div className="fixed inset-0 bg-black/30 z-50 flex justify-center items-center flex-col text-white gap-4">
          <h2 className="text-3xl font-bold">Enregistrement</h2>
          <div className="animate-spin rounded-full h-20 w-20 border-b-2 border-white"></div>
        </div>
      )}

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between space-y-2 mb-8">
          <div>
            <h1 className="text-3xl font-bold">Cartes de visite numériques</h1>
            <nav className="flex" aria-label="Breadcrumb">
              <ol className="inline-flex items-center space-x-1 md:space-x-3">
                <li className="inline-flex items-center">
                  <a href="/dashboard" className="text-gray-700 hover:text-primary">
                    Tableau de bord
                  </a>
                </li>
                <li>
                  <div className="flex items-center">
                    <span className="mx-2.5 text-gray-400">/</span>
                    <a href="/dashboard/bcards" className="text-gray-700 hover:text-primary">
                      Carte de visite
                    </a>
                  </div>
                </li>
                <li>
                  <div className="flex items-center">
                    <span className="mx-2.5 text-gray-400">/</span>
                    <span className="text-gray-500">Ajouter une Carte</span>
                  </div>
                </li>
              </ol>
            </nav>
          </div>
        </div>

        <div className="flex items-start sm:gap-6 gap-4 sm:flex-row flex-col w-full">
          {/* Main Content */}
          <div className="sm:w-8/12 w-full">
            {/* Tab Navigation */}
            <div className="flex w-full border bg-black py-2 gap-2 rounded-lg mb-6">
              {tabs.map((tab, index) => (
                <React.Fragment key={tab.id}>
                  <button
                    onClick={() => setCurrentTab(tab.id)}
                    className={`flex items-center py-2 space-x-2 px-4 rounded-md transition-colors ${
                      currentTab === tab.id 
                        ? 'bg-white text-black' 
                        : 'text-white hover:bg-gray-800'
                    }`}
                  >
                    <span className={`h-5 w-5 rounded-full block text-white ${
                      currentTab === tab.id ? 'bg-black' : 'bg-gray-500'
                    }`}>
                      {tab.number}
                    </span>
                    <span className="sm:block hidden">{tab.label}</span>
                  </button>
                  {index < tabs.length - 1 && <ChevronRight className="text-white" />}
                </React.Fragment>
              ))}
            </div>

            {/* Tab Content */}
            {currentTab === 'content' && (
              <Card className="w-full">
                <CardHeader className="border-b">
                  <CardTitle>Contenu</CardTitle>
                  <CardDescription>
                    Personnalisez votre carte de visite digitale.
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-4 w-full space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">Prénom</Label>
                      <Input
                        id="firstName"
                        value={formData.firstName}
                        onChange={(e) => handleInputChange('firstName', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Nom</Label>
                      <Input
                        id="lastName"
                        value={formData.lastName}
                        onChange={(e) => handleInputChange('lastName', e.target.value)}
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="title">Titre</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => handleInputChange('title', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="company">Entreprise</Label>
                    <Input
                      id="company"
                      value={formData.company}
                      onChange={(e) => handleInputChange('company', e.target.value)}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Téléphone</Label>
                      <Input
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="website">Site web</Label>
                    <Input
                      id="website"
                      value={formData.website}
                      onChange={(e) => handleInputChange('website', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="address">Adresse</Label>
                    <Textarea
                      id="address"
                      value={formData.address}
                      onChange={(e) => handleInputChange('address', e.target.value)}
                    />
                  </div>
                </CardContent>
                <CardFooter className="justify-end border-t pt-4">
                  <Button onClick={() => setCurrentTab('setting')}>
                    <ChevronRight className="h-5 w-5" />
                  </Button>
                </CardFooter>
              </Card>
            )}

            {currentTab === 'setting' && (
              <Card>
                <CardHeader className="border-b">
                  <CardTitle>Design / Parametres</CardTitle>
                  <CardDescription>
                    Configurez votre carte digitale
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-4 w-full space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="primaryColor">Couleur primaire</Label>
                      <Input
                        id="primaryColor"
                        type="color"
                        value={formData.primaryColor}
                        onChange={(e) => handleInputChange('primaryColor', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="secondaryColor">Couleur secondaire</Label>
                      <Input
                        id="secondaryColor"
                        type="color"
                        value={formData.secondaryColor}
                        onChange={(e) => handleInputChange('secondaryColor', e.target.value)}
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="fontFamily">Police</Label>
                    <select
                      id="fontFamily"
                      className="w-full p-2 border rounded-md"
                      value={formData.fontFamily}
                      onChange={(e) => handleInputChange('fontFamily', e.target.value)}
                    >
                      <option value="system-ui">System UI</option>
                      <option value="Arial">Arial</option>
                      <option value="Helvetica">Helvetica</option>
                      <option value="Times New Roman">Times New Roman</option>
                    </select>
                  </div>
                </CardContent>
                <CardFooter className="justify-between border-t pt-4">
                  <Button onClick={() => setCurrentTab('content')}>
                    <ChevronLeft className="h-5 w-5" />
                  </Button>
                  <Button onClick={() => setCurrentTab('qrcode')}>
                    <ChevronRight className="h-5 w-5" />
                  </Button>
                </CardFooter>
              </Card>
            )}

            {currentTab === 'qrcode' && (
              <Card>
                <CardHeader className="border-b">
                  <CardTitle>Qr Code</CardTitle>
                  <CardDescription>
                    Personnalisez le qr code de votre carte digitale!
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-4 w-full space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="qrSize">Taille</Label>
                      <Input
                        id="qrSize"
                        type="number"
                        value={formData.qrSize}
                        onChange={(e) => handleInputChange('qrSize', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="qrColor">Couleur</Label>
                      <Input
                        id="qrColor"
                        type="color"
                        value={formData.qrColor}
                        onChange={(e) => handleInputChange('qrColor', e.target.value)}
                      />
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="justify-between border-t pt-4">
                  <Button onClick={() => setCurrentTab('setting')}>
                    <ChevronLeft className="h-5 w-5" />
                  </Button>
                  <Button onClick={() => setCurrentTab('card')}>
                    <ChevronRight className="h-5 w-5" />
                  </Button>
                </CardFooter>
              </Card>
            )}

            {currentTab === 'card' && (
              <Card>
                <CardHeader className="border-b">
                  <CardTitle>Carte physique</CardTitle>
                  <CardDescription>
                    Personnalisez votre carte physique à votre image.
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-4 w-full space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="cardBackground">Couleur de fond</Label>
                      <Input
                        id="cardBackground"
                        type="color"
                        value={formData.cardBackground}
                        onChange={(e) => handleInputChange('cardBackground', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="cardRadius">Rayon des coins</Label>
                      <Input
                        id="cardRadius"
                        type="number"
                        value={formData.cardRadius}
                        onChange={(e) => handleInputChange('cardRadius', e.target.value)}
                      />
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="justify-between border-t pt-4">
                  <Button onClick={() => setCurrentTab('qrcode')}>
                    <ChevronLeft className="h-5 w-5" />
                  </Button>
                  <Button onClick={handleSubmit}>
                    <Check className="h-5 w-5" />
                  </Button>
                </CardFooter>
              </Card>
            )}
          </div>

          {/* Preview Panel */}
          <div className="sticky top-16 sm:w-4/12 w-full">
            <div className="flex justify-between items-center space-x-2 mb-4">
              <div className="flex space-x-1">
                {previewTabs.map((tab) => (
                  <Button
                    key={tab.id}
                    size="sm"
                    variant="outline"
                    className="flex items-center"
                  >
                    <tab.icon className="h-4 w-4" />
                  </Button>
                ))}
              </div>
              <Button onClick={handleSubmit} size="sm">
                Enregistrer
              </Button>
            </div>

            <Card>
              <CardContent className="pt-6 sm:px-10">
                <div className="bg-white rounded-lg shadow-lg p-6 text-center" style={{
                  backgroundColor: formData.cardBackground,
                  borderRadius: `${formData.cardRadius}px`
                }}>
                  <div className="w-20 h-20 bg-gray-300 rounded-full mx-auto mb-4"></div>
                  <h3 className="text-xl font-bold" style={{ color: formData.primaryColor }}>
                    {formData.firstName} {formData.lastName}
                  </h3>
                  <p className="text-gray-600 mb-2">{formData.title}</p>
                  <p className="text-sm font-medium" style={{ color: formData.secondaryColor }}>
                    {formData.company}
                  </p>
                  <div className="mt-4 space-y-1 text-sm text-gray-600">
                    <p>{formData.email}</p>
                    <p>{formData.phone}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddBusinessCard;
