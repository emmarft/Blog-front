import React, { useRef, useEffect } from 'react';
import EditorJS, { OutputData } from '@editorjs/editorjs';
import Paragraph from '@editorjs/paragraph';

interface EditorProps {
  data?: OutputData;
  onChange: (data: OutputData) => void;
}

const Editor: React.FC<EditorProps> = ({ data, onChange }) => {
  const editorRef = useRef<EditorJS | null>(null);
  const editorHolder = useRef<HTMLDivElement>(null);

  // Initialiser l'éditeur
  const initializeEditor = async () => {
    try {
      if (!editorHolder.current || editorRef.current) return; // Si l'éditeur existe déjà, ne rien faire

      const editor = new EditorJS({
        holder: editorHolder.current as HTMLElement,
        data: data,
        tools: {
          paragraph: {
            class: Paragraph as unknown as any,
            config: {
              placeholder: 'Start typing here...',
            },
            inlineToolbar: true,
          },
        },
        onChange: async () => {
          const outputData = await editor.save();
          onChange(outputData);
        },
      });

      editorRef.current = editor;
      console.log("Editor.js initialisé");
    } catch (error) {
      console.error("Erreur lors de l'initialisation d'Editor.js :", error);
    }
  };

  // Détruire l'éditeur en toute sécurité
  const destroyEditor = () => {
    if (editorRef.current && typeof editorRef.current.destroy === 'function') {
      editorRef.current.destroy();
      editorRef.current = null;
      console.log("Editor.js détruit");
    } else {
      console.warn("L'éditeur n'est pas initialisé ou la méthode destroy est introuvable.");
    }
  };

  useEffect(() => {
    // Initialiser l'éditeur au chargement du composant
    initializeEditor();

    // Nettoyer l'éditeur au démontage du composant
    return () => {
      destroyEditor();
    };
  }, []); // Déclenché une seule fois lors du premier rendu
  

  return (
    <div>
      <div id="editorjs" ref={editorHolder} style={{ minHeight: '300px' }}></div>
    </div>
  );
};

export default React.memo(Editor);
