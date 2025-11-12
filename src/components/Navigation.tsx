import { useState } from "react";
import { Menu, X, Home, LineChart, History, Settings } from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { Button } from "@/components/ui/button";

export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { to: "/", icon: Home, label: "Home" },
    { to: "/charts", icon: LineChart, label: "Gráficos" },
    { to: "/history", icon: History, label: "Histórico" },
    { to: "/settings", icon: Settings, label: "Configurações" },
  ];

  return (
    <>
      <header className="bg-card border-b border-border sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between max-w-7xl">
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

      {isOpen && (
        <nav className="bg-card border-b border-border sticky top-[73px] z-40">
          <div className="container mx-auto px-4 py-2 max-w-7xl">
            <ul className="flex flex-col gap-2">
              {navItems.map((item) => (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    end
                    className="flex items-center gap-3 px-4 py-3 rounded-lg text-muted-foreground hover:bg-muted transition-colors"
                    activeClassName="bg-primary text-primary-foreground hover:bg-primary/90"
                    onClick={() => setIsOpen(false)}
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
