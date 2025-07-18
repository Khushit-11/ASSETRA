import React, { useState } from 'react';
import { OwnerLayout } from '../../components/owner/OwnerLayout';
import { Card } from '../../components/common/Layout';
import { Button } from '../../components/common/Button';
import { Upload, Shield, Camera, AlertTriangle } from 'lucide-react';

export const DamageDetection: React.FC = () => {
  const [beforeImage, setBeforeImage] = useState<string | null>(null);
  const [afterImage, setAfterImage] = useState<string | null>(null);
  const [notes, setNotes] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [securityDeduction, setSecurityDeduction] = useState<number | null>(null);
  const [analysisResult, setAnalysisResult] = useState<string>('');

  const handleImageUpload = (
    event: React.ChangeEvent<HTMLInputElement>,
    type: 'before' | 'after'
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        if (type === 'before') {
          setBeforeImage(result);
        } else {
          setAfterImage(result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const analyzeDamage = async () => {
    if (!beforeImage || !afterImage) {
      alert('Please upload both before and after images');
      return;
    }

    setIsAnalyzing(true);
    
    // Simulate AI damage analysis
    setTimeout(() => {
      const damageScenarios = [
        { deduction: 0, analysis: 'No visible damage detected. Product appears to be in excellent condition.' },
        { deduction: 150, analysis: 'Minor scratches detected on surface. Normal wear and tear.' },
        { deduction: 500, analysis: 'Moderate damage found: visible dents and scratches that affect appearance.' },
        { deduction: 1200, analysis: 'Significant damage detected: major scratches, dents, or broken components.' },
        { deduction: 2500, analysis: 'Severe damage found: substantial structural damage requiring professional repair.' },
        { deduction: 50, analysis: 'Very minor cosmetic issues detected. Minimal impact on functionality.' },
        { deduction: 800, analysis: 'Notable damage to exterior finish and some functional components affected.' }
      ];

      const randomScenario = damageScenarios[Math.floor(Math.random() * damageScenarios.length)];
      setSecurityDeduction(randomScenario.deduction);
      setAnalysisResult(randomScenario.analysis);
      setIsAnalyzing(false);
    }, 3000);
  };

  const resetAnalysis = () => {
    setBeforeImage(null);
    setAfterImage(null);
    setNotes('');
    setSecurityDeduction(null);
    setAnalysisResult('');
  };

  return (
    <OwnerLayout>
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 flex items-center">
              <Shield className="w-7 h-7 mr-2 text-emerald-600" />
              Damage Detection
            </h1>
            <p className="text-gray-600">
              Compare before and after images to detect damage and calculate security deductions
            </p>
          </div>
          <Button onClick={resetAnalysis} variant="outline">
            Reset Analysis
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Image Upload Section */}
          <div className="space-y-6">
            {/* Before Image */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Camera className="w-5 h-5 mr-2 text-blue-600" />
                Before Rental Image
              </h3>
              
              {beforeImage ? (
                <div className="relative">
                  <img
                    src={beforeImage}
                    alt="Before rental"
                    className="w-full h-48 object-cover rounded-lg border-2 border-gray-200"
                  />
                  <button
                    onClick={() => setBeforeImage(null)}
                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-red-600"
                  >
                    ×
                  </button>
                </div>
              ) : (
                <label className="block">
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 cursor-pointer transition-colors">
                    <Upload className="w-8 h-8 mx-auto text-gray-400 mb-2" />
                    <p className="text-sm text-gray-600">
                      Click to upload before rental image
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      PNG, JPG up to 10MB
                    </p>
                  </div>
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e, 'before')}
                  />
                </label>
              )}
            </Card>

            {/* After Image */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Camera className="w-5 h-5 mr-2 text-orange-600" />
                After Rental Image
              </h3>
              
              {afterImage ? (
                <div className="relative">
                  <img
                    src={afterImage}
                    alt="After rental"
                    className="w-full h-48 object-cover rounded-lg border-2 border-gray-200"
                  />
                  <button
                    onClick={() => setAfterImage(null)}
                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-red-600"
                  >
                    ×
                  </button>
                </div>
              ) : (
                <label className="block">
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-orange-400 cursor-pointer transition-colors">
                    <Upload className="w-8 h-8 mx-auto text-gray-400 mb-2" />
                    <p className="text-sm text-gray-600">
                      Click to upload after rental image
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      PNG, JPG up to 10MB
                    </p>
                  </div>
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e, 'after')}
                  />
                </label>
              )}
            </Card>
          </div>

          {/* Analysis Section */}
          <div className="space-y-6">
            {/* Notes */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Additional Notes (Optional)
              </h3>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Add any additional observations or context about the condition..."
                rows={4}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 transition-colors resize-vertical"
              />
            </Card>

            {/* Analysis Button */}
            <Card className="p-6">
              <Button
                onClick={analyzeDamage}
                disabled={isAnalyzing || !beforeImage || !afterImage}
                className="w-full"
                size="lg"
              >
                {isAnalyzing ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Analyzing Damage...
                  </>
                ) : (
                  <>
                    <Shield className="w-4 h-4 mr-2" />
                    Analyze Damage
                  </>
                )}
              </Button>
              
              {!beforeImage || !afterImage ? (
                <p className="text-sm text-amber-600 mt-2 text-center">
                  Please upload both images to enable analysis
                </p>
              ) : null}
            </Card>

            {/* Results */}
            {securityDeduction !== null && (
              <Card className="p-6 border-l-4 border-emerald-500">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <AlertTriangle className="w-5 h-5 mr-2 text-emerald-600" />
                  Analysis Results
                </h3>
                
                <div className="space-y-4">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      AI Analysis Summary
                    </label>
                    <p className="text-sm text-gray-800">{analysisResult}</p>
                  </div>
                  
                  <div className="bg-emerald-50 rounded-lg p-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Security Amount to Deduct
                    </label>
                    <div className="text-2xl font-bold text-emerald-600">
                      ₹{securityDeduction.toLocaleString()}
                    </div>
                    {securityDeduction === 0 && (
                      <p className="text-sm text-emerald-600 mt-1">
                        No deduction required - item returned in excellent condition
                      </p>
                    )}
                  </div>

                  {notes && (
                    <div className="bg-blue-50 rounded-lg p-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Your Notes
                      </label>
                      <p className="text-sm text-gray-800">{notes}</p>
                    </div>
                  )}
                </div>
              </Card>
            )}
          </div>
        </div>

        {/* Instructions */}
        <Card className="p-6 bg-blue-50 border-blue-200">
          <h3 className="text-lg font-semibold text-blue-900 mb-3">
            How Damage Detection Works
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-blue-800">
            <div className="flex items-start space-x-2">
              <div className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold mt-0.5">
                1
              </div>
              <div>
                <p className="font-medium">Upload Images</p>
                <p className="text-blue-700">Upload clear before and after rental images</p>
              </div>
            </div>
            <div className="flex items-start space-x-2">
              <div className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold mt-0.5">
                2
              </div>
              <div>
                <p className="font-medium">AI Analysis</p>
                <p className="text-blue-700">AI compares images to detect damage automatically</p>
              </div>
            </div>
            <div className="flex items-start space-x-2">
              <div className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold mt-0.5">
                3
              </div>
              <div>
                <p className="font-medium">Get Results</p>
                <p className="text-blue-700">Receive damage assessment and deduction amount</p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </OwnerLayout>
  );
};
