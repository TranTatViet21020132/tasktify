import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTranslation } from "react-i18next";
import vnFlag from '@/assets/images/vietnam.png';
import enFlag from '@/assets/images/united-kingdom.png';
import { supportedLngs } from "@/configs/i18n";
import { ChevronDown, ChevronUp } from "lucide-react";

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const handleLanguageChange = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement;
    const newLanguage = target.getAttribute('data-value') || 'vi';
    i18n.changeLanguage(newLanguage);
    localStorage.setItem('i18nextLng', newLanguage);
  };

  return (
    <DropdownMenu
      onOpenChange={(open) => setIsOpen(open)}
    >
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="flex items-center gap-2 w-fit px-2 active:outline-none">
          {i18n.resolvedLanguage === "vi" ? (
            <img
              src={vnFlag}
              alt="Tiếng Việt"
              className="w-5 aspect-square"
            />
          ) : (
            <img
              src={enFlag}
              alt="English"
              className="w-5 aspect-square"
            />
          )}
          {isOpen ? (
            <ChevronUp className="w-5 aspect-square" />
          ) : (
            <ChevronDown className="w-5 aspect-square" />
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-fit">
        {Object.entries(supportedLngs).map(([code, name]) => (
          <DropdownMenuItem
            data-value={code}
            key={code}
            onClick={handleLanguageChange}
          >
            {name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSwitcher;
