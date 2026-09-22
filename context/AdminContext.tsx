"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

type AdminContextType = {
  isAuthenticated: boolean;
  login: (pin: string) => boolean;
  logout: () => void;
  // Events
  events: any[];
  addEvent: (event: any) => void;
  // Teams
  teams: any;
  updateTeam: (teamName: string, data: any) => void;
  // Gallery
  eventGallery: any[];
  addEventPhoto: (photo: any) => void;
  celebrationGallery: any[];
  addCelebrationPhoto: (photo: any) => void;
  // Support Tickets
  supportTickets: any[];
  addSupportTicket: (ticket: any) => void;
  // Resources
  resources: any[];
  addResource: (resource: any) => void;
};

const AdminContext = createContext<AdminContextType | undefined>(undefined);

const PIN = "ISTE@2024";

export const AdminProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [events, setEvents] = useState<any[]>([]);
  const [teams, setTeams] = useState<any>({});
  const [eventGallery, setEventGallery] = useState<any[]>([]);
  const [celebrationGallery, setCelebrationGallery] = useState<any[]>([]);
  const [supportTickets, setSupportTickets] = useState<any[]>([]);
  const [resources, setResources] = useState<any[]>([]);

  useEffect(() => {
    // Load from localStorage on mount
    const load = (key: string, setter: any, defaultValue: any) => {
      const data = localStorage.getItem(key);
      if (data) {
        setter(JSON.parse(data));
      } else {
        setter(defaultValue);
      }
    };

    load("iste_events", setEvents, []);
    load("iste_teams", setTeams, {});
    load("iste_event_gallery", setEventGallery, []);
    load("iste_celebration_gallery", setCelebrationGallery, []);
    load("iste_support_tickets", setSupportTickets, []);
    load("iste_resources", setResources, []);
  }, []);

  const save = (key: string, data: any) => {
    localStorage.setItem(key, JSON.stringify(data));
  };

  const login = (pin: string) => {
    if (pin === PIN) {
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
  };

  const addEvent = (event: any) => {
    const updated = [...events, { ...event, id: Date.now() }];
    setEvents(updated);
    save("iste_events", updated);
  };

  const updateTeam = (teamName: string, data: any) => {
    const updated = { ...teams, [teamName]: { ...teams[teamName], ...data } };
    setTeams(updated);
    save("iste_teams", updated);
  };

  const addEventPhoto = (photo: any) => {
    const updated = [...eventGallery, { ...photo, id: Date.now() }];
    setEventGallery(updated);
    save("iste_event_gallery", updated);
  };

  const addCelebrationPhoto = (photo: any) => {
    const updated = [...celebrationGallery, { ...photo, id: Date.now() }];
    setCelebrationGallery(updated);
    save("iste_celebration_gallery", updated);
  };

  const addSupportTicket = (ticket: any) => {
    const updated = [...supportTickets, { ...ticket, id: Date.now() }];
    setSupportTickets(updated);
    save("iste_support_tickets", updated);
  };

  const addResource = (resource: any) => {
    const updated = [...resources, { ...resource, id: Date.now() }];
    setResources(updated);
    save("iste_resources", updated);
  };

  return (
    <AdminContext.Provider
      value={{
        isAuthenticated,
        login,
        logout,
        events,
        addEvent,
        teams,
        updateTeam,
        eventGallery,
        addEventPhoto,
        celebrationGallery,
        addCelebrationPhoto,
        supportTickets,
        addSupportTicket,
        resources,
        addResource,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error("useAdmin must be used within an AdminProvider");
  }
  return context;
};
