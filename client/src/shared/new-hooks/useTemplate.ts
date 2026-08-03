import { toast } from "react-toastify";
import { useSource } from "./useSource"
import type { DescriptionTemplate } from "../types/DescriptionTemplate";

export const useTemplate = () => {
  const {config, setTemplates, setTemplatesLoading} = useSource();
  const apiUrl : string = config ? config.api.link + "/templates" : "/templates";

  const getTemplates = async () : Promise<DescriptionTemplate[]> => {
    try {
      setTemplatesLoading(true);
      const response = await fetch(apiUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        },
      });

      if (!response.ok) {
        const message = await response.json().then(
          res => res.detail ?? "Something went wrong while fetching templates"
        );
        toast.error(message);
        return [];
      }

      const templates : DescriptionTemplate[] = await response.json();
      setTemplates(templates);
      return templates;
    } catch {
      toast.error("Something went wrong while fetching templates");
      return [];
    } finally {
      setTemplatesLoading(false);
    }
  } 

  const getTemplate = async (id: string) : Promise<DescriptionTemplate | null> => {
    try {
      const response = await fetch(`${apiUrl}/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      });

      if (!response.ok) {
        const message = await response.json().then(
          res => res.detail ?? "Something went wrong while fetching template"
        );
        toast.error(message);
        return null;
      }

      const template : DescriptionTemplate | null = await response.json();
      return template;
    } catch {
      toast.error("Something went wrong while fetching template");
      return null;
    }
  }

  const newTemplate = async (file: File) : Promise<DescriptionTemplate | null> => {
    try {
      const htmlContent : string = await file.text();
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({htmlContent})
      });

      if (!response.ok) {
        const message = await response.json().then(
          res => res.detail ?? "Something went wrong while adding a new template"
        );
        toast.error(message);
        return null;
      }

      const template : DescriptionTemplate = await response.json();
      setTemplates(prev => [...prev, template]);
      return template;
    } catch {
      toast.error("Something went wrong while adding a new template");
      return null;
    }
  }

  const updateTemplate = async (template: DescriptionTemplate) => {
    try {
      const response = await fetch(`${apiUrl}/${template.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(template)
      });

      if (!response.ok) {
        const message = await response.json().then(
          res => res.detail ?? "Something went wrong while updating selected template"
        );
        toast.error(message);
      }
    } catch {
      toast.error("Something went wrong while updating selected template");
    }
  }

  const deleteTemplate = async (id: string) => {
    try {
      const response = await fetch(`${apiUrl}/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        }
      });

      if (!response.ok) {
        const message = await response.json().then(
          res => res.detail ?? "Something went wrong while deleting selected template"
        );
        toast.error(message); 
        return;
      }

      setTemplates(prev => [...prev].filter(t => t.id !== id));
      return;
    } catch {
      toast.error("Something went wrong deleting selected template")
    }
  }

  return {
    getTemplates,
    getTemplate,
    newTemplate,
    updateTemplate,
    deleteTemplate
  }
}