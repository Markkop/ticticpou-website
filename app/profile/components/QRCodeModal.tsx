'use client';

import { useEffect, useState, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { X, QrCode, Download, Copy } from 'lucide-react';
import QRCode from 'qrcode';
import { toast } from 'sonner';

interface QRCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  userData: {
    userId: string;
    displayName: string;
    avatarUrl?: string;
  };
}

export default function QRCodeModal({ isOpen, onClose, userData }: QRCodeModalProps) {
  const [qrCodeUrl, setQrCodeUrl] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);

  const generateQRCode = useCallback(async () => {
    setIsLoading(true);
    try {
      const qrData = JSON.stringify({
        userId: userData.userId,
        displayName: userData.displayName,
        avatarUrl: userData.avatarUrl,
      });

      const qrCodeDataUrl = await QRCode.toDataURL(qrData, {
        width: 256,
        margin: 2,
        color: {
          dark: '#000000',
          light: '#FFFFFF',
        },
      });

      setQrCodeUrl(qrCodeDataUrl);
    } catch (error) {
      console.error('Error generating QR code:', error);
      toast.error('Erro ao gerar código QR');
    } finally {
      setIsLoading(false);
    }
  }, [userData]);

  useEffect(() => {
    if (isOpen && userData.userId) {
      generateQRCode();
    }
  }, [isOpen, userData, generateQRCode]);

  const downloadQRCode = () => {
    if (!qrCodeUrl) return;

    const link = document.createElement('a');
    link.href = qrCodeUrl;
    link.download = `qr-${userData.displayName}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success('Código QR baixado!');
  };

  const copyToClipboard = async () => {
    try {
      const qrData = JSON.stringify({
        userId: userData.userId,
        displayName: userData.displayName,
        avatarUrl: userData.avatarUrl,
      });
      
      await navigator.clipboard.writeText(qrData);
      toast.success('Dados copiados para a área de transferência!');
    } catch (error) {
      console.error('Error copying to clipboard:', error);
      toast.error('Erro ao copiar dados');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-background">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <QrCode className="w-5 h-5" />
            Código QR do Perfil
          </CardTitle>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
          >
            <X className="w-4 h-4" />
          </Button>
        </CardHeader>
        
        <CardContent className="space-y-4">
          {isLoading ? (
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : (
            <>
              <div className="flex flex-col items-center space-y-4">
                <div className="bg-white p-4 rounded-lg border">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img 
                    src={qrCodeUrl} 
                    alt={`QR Code para ${userData.displayName}`}
                    className="w-64 h-64"
                  />
                </div>
                
                <div className="text-center">
                  <h3 className="font-semibold">{userData.displayName}</h3>
                  <p className="text-sm text-muted-foreground">
                    Escaneie para adicionar em partidas
                  </p>
                </div>
              </div>

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={downloadQRCode}
                  className="flex-1"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Baixar
                </Button>
                <Button
                  variant="outline"
                  onClick={copyToClipboard}
                  className="flex-1"
                >
                  <Copy className="w-4 h-4 mr-2" />
                  Copiar dados
                </Button>
              </div>

              <div className="text-xs text-muted-foreground text-center">
                <p>Este código QR pode ser usado por embaixadores</p>
                <p>para adicionar você rapidamente em partidas oficiais.</p>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}