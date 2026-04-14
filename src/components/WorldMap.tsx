import React from 'react';
import { MapPin, Globe } from 'lucide-react';

const locations = [
  { 
    name: 'Djibouti', 
    country: 'Djibouti',
    flag: '🇩🇯',
    description: 'Siège principal & équipe technique',
    hasPremium: false,
    gradient: 'linear-gradient(135deg, rgba(59, 130, 246, 0.15) 0%, rgba(34, 197, 94, 0.15) 50%, rgba(255, 255, 255, 0.1) 100%)',
    borderColor: 'rgba(59, 130, 246, 0.4)',
    glowColor: 'rgba(59, 130, 246, 0.3)',
    lineGradient: 'linear-gradient(90deg, transparent 0%, rgba(59, 130, 246, 0.6) 50%, transparent 100%)'
  },
  { 
    name: 'Nantes', 
    country: 'France',
    flag: '🇫🇷',
    description: 'Équipe technique et clients',
    gradient: 'linear-gradient(135deg, rgba(37, 99, 235, 0.15) 0%, rgba(255, 255, 255, 0.1) 33%, rgba(220, 38, 38, 0.15) 66%, rgba(37, 99, 235, 0.15) 100%)',
    borderColor: 'rgba(37, 99, 235, 0.4)',
    glowColor: 'rgba(37, 99, 235, 0.3)',
    lineGradient: 'linear-gradient(90deg, rgba(37, 99, 235, 0.4) 0%, rgba(255, 255, 255, 0.3) 33%, rgba(220, 38, 38, 0.4) 66%, rgba(37, 99, 235, 0.4) 100%)'
  },
  { 
    name: 'Antananarivo', 
    country: 'Madagascar',
    flag: '🇲🇬',
    description: 'Équipe technique et Innovation & R&D',
    hasPremium: false,
    gradient: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(220, 38, 38, 0.15) 50%, rgba(22, 163, 74, 0.15) 100%)',
    borderColor: 'rgba(220, 38, 38, 0.4)',
    glowColor: 'rgba(220, 38, 38, 0.3)',
    lineGradient: 'linear-gradient(90deg, transparent 0%, rgba(220, 38, 38, 0.6) 50%, rgba(22, 163, 74, 0.6) 100%)'
  },
  { 
    name: 'Paris', 
    country: 'France',
    flag: '🇫🇷',
    description: 'Clients et partenariats stratégiques',
    hasPremium: false,
    gradient: 'linear-gradient(135deg, rgba(37, 99, 235, 0.15) 0%, rgba(255, 255, 255, 0.1) 33%, rgba(220, 38, 38, 0.15) 66%, rgba(37, 99, 235, 0.15) 100%)',
    borderColor: 'rgba(37, 99, 235, 0.4)',
    glowColor: 'rgba(37, 99, 235, 0.3)',
    lineGradient: 'linear-gradient(90deg, rgba(37, 99, 235, 0.4) 0%, rgba(255, 255, 255, 0.3) 33%, rgba(220, 38, 38, 0.4) 66%, rgba(37, 99, 235, 0.4) 100%)'
  },
  { 
    name: 'Boston', 
    country: 'États-Unis',
    flag: '🇺🇸',
    description: 'Portefeuille clients premium et relations commerciales durables',
    hasPremium: true,
    gradient: 'linear-gradient(135deg, rgba(29, 78, 216, 0.15) 0%, rgba(255, 255, 255, 0.1) 33%, rgba(220, 38, 38, 0.15) 66%, rgba(29, 78, 216, 0.15) 100%)',
    borderColor: 'rgba(29, 78, 216, 0.4)',
    glowColor: 'rgba(29, 78, 216, 0.3)',
    lineGradient: 'linear-gradient(90deg, rgba(29, 78, 216, 0.4) 0%, rgba(255, 255, 255, 0.3) 33%, rgba(220, 38, 38, 0.4) 66%, rgba(29, 78, 216, 0.4) 100%)'
  },
  { 
    name: 'Sacramento', 
    country: 'États-Unis',
    flag: '🇺🇸',
    description: 'Portefeuille clients premium et croissance continue',
    hasPremium: true,
    gradient: 'linear-gradient(135deg, rgba(29, 78, 216, 0.15) 0%, rgba(255, 255, 255, 0.1) 33%, rgba(220, 38, 38, 0.15) 66%, rgba(29, 78, 216, 0.15) 100%)',
    borderColor: 'rgba(29, 78, 216, 0.4)',
    glowColor: 'rgba(29, 78, 216, 0.3)',
    lineGradient: 'linear-gradient(90deg, rgba(29, 78, 216, 0.4) 0%, rgba(255, 255, 255, 0.3) 33%, rgba(220, 38, 38, 0.4) 66%, rgba(29, 78, 216, 0.4) 100%)'
  },
  { 
    name: 'Abidjan', 
    country: 'Côte d\'Ivoire',
    flag: '🇨🇮',
    description: 'Clients et partenariats locaux',
    hasPremium: false,
    gradient: 'linear-gradient(135deg, rgba(249, 115, 22, 0.15) 0%, rgba(255, 255, 255, 0.1) 50%, rgba(22, 163, 74, 0.15) 100%)',
    borderColor: 'rgba(249, 115, 22, 0.4)',
    glowColor: 'rgba(249, 115, 22, 0.3)',
    lineGradient: 'linear-gradient(90deg, rgba(249, 115, 22, 0.4) 0%, rgba(255, 255, 255, 0.3) 50%, rgba(22, 163, 74, 0.4) 100%)'
  },
];

export default function WorldMap() {
  return (
    <div className="w-full">
      <p className="text-center text-theme-secondary text-sm md:text-base mb-6">
        7 villes connectées, une vision globale
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {locations.map((location, index) => (
          <div
            key={index}
            className="klik-card p-4 rounded-2xl hover:scale-[1.01] transition-all duration-200 group cursor-pointer border border-slate-700/80 bg-slate-950/88 relative overflow-hidden"
            style={{
              background: location.gradient,
              borderColor: location.borderColor,
            }}
          >
            {/* Drapeau en arrière-plan au hover */}
            <div 
              className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-20 transition-opacity duration-200 rounded-2xl pointer-events-none"
              style={{ 
                fontSize: '150px',
                lineHeight: '1',
                transform: 'scale(1.3)',
                filter: 'blur(14px)',
              }}
            >
              {location.flag}
            </div>
            
            {/* Effet glow avec couleurs du drapeau */}
            <div 
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-2xl blur-xl"
              style={{ background: location.gradient }}
            ></div>
            
            {/* Overlay sombre pour lisibilité */}
            <div className="absolute inset-0 bg-black/70 group-hover:bg-black/64 transition-all duration-300 rounded-2xl"></div>
            
            <div className="relative z-10">
              {/* Header avec drapeau et nom */}
              <div className="flex items-center gap-2.5 mb-3">
                <div className="text-3xl drop-shadow-lg">{location.flag}</div>
                <div>
                  <h3 className="text-lg font-bold text-white group-hover:text-violet-300 transition-colors drop-shadow-md">
                    {location.name}
                  </h3>
                  <p className="text-xs text-white/80">{location.country}</p>
                </div>
              </div>

              {/* Description */}
              <p className="text-white/90 text-xs leading-relaxed mb-3 drop-shadow-sm">
                {location.description}
              </p>

              {/* Pin icon */}
              <div className="flex items-center gap-2 text-white/70 group-hover:text-white transition-colors">
                <MapPin className="w-3.5 h-3.5" />
                <span className="text-xs font-medium">KLIK Présence</span>
              </div>
            </div>

            {/* Ligne décorative en bas avec couleurs du drapeau */}
            <div 
              className="absolute bottom-0 left-0 right-0 h-1.5 opacity-60 group-hover:opacity-100 transition-all duration-300"
              style={{ background: location.lineGradient }}
            ></div>
          </div>
        ))}
      </div>

      {/* Stats en bas */}
      <div className="mt-8 flex flex-wrap gap-4 justify-center items-center">
        <div className="flex items-center gap-2 klik-card px-4 py-2.5 rounded-full border border-slate-300 bg-zinc-100">
          <Globe className="w-5 h-5 text-black" />
          <span className="text-black font-semibold">7 Villes</span>
        </div>
        <div className="flex items-center gap-2 klik-card px-4 py-2.5 rounded-full border border-slate-300 bg-zinc-100">
          <MapPin className="w-5 h-5 text-black" />
          <span className="text-black font-semibold">4 Continents</span>
        </div>
        <div className="flex items-center gap-2 klik-card px-4 py-2.5 rounded-full border border-slate-300 bg-zinc-100">
          <div className="w-5 h-5 rounded-full bg-gradient-to-br from-violet-400 to-violet-600"></div>
          <span className="text-black font-semibold">Réseau Global</span>
        </div>
      </div>
    </div>
  );
}
