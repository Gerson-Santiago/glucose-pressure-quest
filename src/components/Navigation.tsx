// src/components/Navigation.tsx
import { useState } from "react";
// 1. Importar o ícone 'Plus'
import { Menu, X, Home, LineChart, History, Settings, HelpCircle, Plus } from "lucide-react"; 
import { NavLink } from "@/components/NavLink";
import { Button } from "@/components/ui/button";

export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  // 2. Atualizar a lista de itens de navegação
  const navItems = [
    // Link 'Home' agora é 'Dashboard'
    { to: "/", icon: Home, label: "Dashboard" }, 
    // Novo link para a página /add
    { to: "/add", icon: Plus, label: "Adicionar" }, 
    // Links existentes com acentuação corrigida
    { to: "/charts", icon: LineChart, label: "Gráficos" },
    { to: "/history", icon: History, label: "Histórico" },
    { to: "/settings", icon: Settings, label: "Configurações" },    
    { to: "/ajuda", icon: HelpCircle, label: "Ajuda" },
  ];

  return (
    <>
      <header className="bg-card border-b border-border sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between max-w-7xl">
          {/* 3. Corrigir acentuação do título */}
          <h1 className="text-xl font-bold text-foreground">Monitor de Saúde</h1>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Menu"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </header>

      {/* 4. Menu "gaveta" (sticky) para mobile */}
      {/* Adicionado 'overflow-y-auto' para o caso de muitas opções em telas pequenas */}
      {isOpen && (
        <nav className="bg-card border-b border-border sticky top-[73px] z-40 overflow-y-auto">
          <div className="container mx-auto px-4 py-2 max-w-7xl">
            <ul className="flex flex-col gap-2">
              {navItems.map((item) => (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    end
                    className="flex items-center gap-3 px-4 py-3 rounded-lg text-muted-foreground hover:bg-muted transition-colors"
                    activeClassName="bg-primary text-primary-foreground hover:bg-primary/90"
                    onClick={() => setIsOpen(false)} // Fecha o menu ao clicar
                  >
                    <item.icon className="h-5 w-5" />
                    <span className="font-medium">{item.label}</span>
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      )}
    </>
  );
};