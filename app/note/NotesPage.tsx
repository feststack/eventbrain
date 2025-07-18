"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Button,
  Flex,
  Heading,
  Text,
  TextField,
  View,
} from "@aws-amplify/ui-react";

import { Amplify } from "aws-amplify";
import { generateClient } from "aws-amplify/api";

import { listNotes } from "../../src/graphql/queries";
import {
  createNote as createNoteMutation,
  deleteNote as deleteNoteMutation,
} from "../../src/graphql/mutations";

import awsmobileRaw from "../../aws-exports";

Amplify.configure(awsmobileRaw);

const awsmobile = awsmobileRaw as unknown as {
  aws_appsync_apiKey: string;
  [key: string]: any;
};

const client = generateClient({
  apiKey: awsmobile.aws_appsync_apiKey,
});

type Note = {
  id: string;
  name: string;
  description?: string;
};

export default function NotesPage() {
  const [notes, setNotes] = useState<Note[]>([]);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    fetchNotes();
  }, []);

  async function fetchNotes() {
    try {
      const result: any = await client.graphql({
        query: listNotes,
        authMode: "apiKey",
      });
      console.log("fetchNotes result:", result);

      if ("errors" in result) {
        console.error("GraphQL errors:", result.errors);
        return;
      }

      if (!result.data || !result.data.listNotes) {
        console.error("Données manquantes dans la réponse GraphQL:", result);
        return;
      }

      const notesFromAPI: Note[] = result.data.listNotes.items;
      setNotes(notesFromAPI);
    } catch (err: any) {
      console.error("Erreur fetchNotes :", err.message || err);
    }
  }

  async function createNote(formData: FormData) {
    const data = {
      name: formData.get("name") as string,
      description: formData.get("description") as string,
    };
    try {
      await client.graphql({
        query: createNoteMutation,
        variables: { input: data },
        authMode: "apiKey",
      });
      fetchNotes();
    } catch (err) {
      console.error("Erreur createNote :", err);
    }
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    await createNote(form);
    if (formRef.current) {
      formRef.current.reset();
    }
  }

  async function deleteNote(id: string) {
    try {
      await client.graphql({
        query: deleteNoteMutation,
        variables: { input: { id } },
        authMode: "apiKey",
      });
      setNotes((prev) => prev.filter((note) => note.id !== id));
    } catch (err) {
      console.error("Erreur deleteNote :", err);
    }
  }

  return (
    <View className="p-8">
      <Heading level={1}>Notes</Heading>

      <form ref={formRef} style={{ margin: "3rem 0" }} onSubmit={handleSubmit}>
        <Flex direction="row" justifyContent="center" gap="1rem">
          <TextField
            name="name"
            label="Name"
            placeholder="Note Name"
            labelHidden
            variation="quiet"
            required
          />
          <TextField
            name="description"
            label="Description"
            placeholder="Note Description"
            labelHidden
            variation="quiet"
            required
          />
          <Button type="submit" variation="primary">
            Create Note
          </Button>
        </Flex>
      </form>

      <Heading level={2}>Current Notes</Heading>
      <View margin="3rem 0">
        {notes.map((note) => (
          <Flex
            key={note.id}
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            padding="1rem"
            style={{ borderBottom: "1px solid #ccc" }}
          >
            <Text as="strong">{note.name}</Text>
            <Text>{note.description}</Text>
            <Button variation="link" onClick={() => deleteNote(note.id)}>
              Delete
            </Button>
          </Flex>
        ))}
      </View>
    </View>
  );
}
