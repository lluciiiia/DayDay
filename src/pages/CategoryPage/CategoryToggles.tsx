import { useState, useRef, useEffect } from "react";
import { useIonToast } from "@ionic/react";

export const CategoryToggles = () => {
  let popover = useRef<HTMLIonPopoverElement | null>(null);
  let [popoverOpen, setPopoverOpen] = useState(false);
  let [present] = useIonToast();
  let page = useRef(undefined);

  let [showModal, setShowModal] = useState(false);

  let [categories, setCategories] = useState<string[]>([]);
  let categoryRef = useRef<HTMLIonInputElement>(null);

  let [editMode, setEditMode] = useState(false);
  let [selectedCategory, setSelectedCategory] = useState("");
};
