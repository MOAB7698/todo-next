"use client";

import { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@store/store";
import { addTask } from "../state/slice";

export function useAddTask() {
  const dispatch = useDispatch<AppDispatch>();
  const [title, setTitle] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const submit = useCallback(async () => {
    if (!title.trim()) return;
    setSubmitting(true);
    try {
      await dispatch(addTask({ title: title.trim() })).unwrap();
      setTitle("");
    } finally {
      setSubmitting(false);
    }
  }, [dispatch, title]);

  return { title, setTitle, submit, submitting };
}
