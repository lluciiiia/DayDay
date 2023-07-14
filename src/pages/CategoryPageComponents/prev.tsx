// import { useState, useRef, useEffect } from "react";
// import {
//   IonContent,
//   IonHeader,
//   IonTitle,
//   IonToolbar,
//   IonItem,
//   IonList,
//   IonSearchbar,
//   IonLabel,
//   IonReorder,
//   IonIcon,
//   IonButton,
//   IonPopover,
//   IonModal,
//   IonInput,
//   IonButtons,
//   useIonToast,
// } from "@ionic/react";
// import {
//   settingsOutline,
//   list,
//   closeCircleOutline,
//   informationCircleOutline,
//   checkmarkCircle,
// } from "ionicons/icons";
// import "../../main.css";
// import { CategoriesData } from "../../GetPutData";

// const CategoryPage = () => {
//   const popover = useRef<HTMLIonPopoverElement | null>(null);
//   const [popoverOpen, setPopoverOpen] = useState(false);
//   const [present] = useIonToast();
//   const page = useRef(undefined);

//   const [showModal, setShowModal] = useState(false);

//   const [categories, setCategories] = useState<string[]>([]);
//   const categoryRef = useRef<HTMLIonInputElement>(null);

//   const [editMode, setEditMode] = useState(false);
//   const [selectedCategory, setSelectedCategory] = useState("");

//   const [presentingElement, setPresentingElement] = useState<
//     HTMLElement | undefined
//   >(undefined);

//   const openPopover = (e: any) => {
//     const itemId = e.target.id;
//     if (itemId === "addCategory") {
//       setSelectedCategory(""); // Clear the selected category
//       setShowModal(true);
//     } else if (itemId === "editCategory") {
//       setSelectedCategory(categories[0]); // Set the selected category to the first category in the list
//       setEditMode(!editMode); // Toggle the edit mode
//     }
//     popover.current!.event = e;
//     setPopoverOpen(true);
//   };

//   useEffect(() => {
//     setPresentingElement(page.current);
//     // get data from backend
//     const categoriesData = new CategoriesData();
//     categoriesData
//       .getCategoriesData()
//       .then((data) => {
//         setCategories(data);
//       })
//       .catch((error) => {
//         console.error("Error fetching categories:", error);
//       });
//   }, []);

//   const handleDoneClick = () => {
//     const newCategory = categoryRef.current?.value as string;
//     if (newCategory) {
//       let updatedData;
//       if (selectedCategory) {
//         // Modify the existing category
//         const categoryIndex = categories.findIndex(
//           (category) => category === selectedCategory
//         );
//         updatedData = [...categories];
//         updatedData[categoryIndex] = newCategory;
//       } else {
//         // Add a new category
//         updatedData = [...categories, newCategory];
//       }
//       const categoriesData = new CategoriesData();
//       categoriesData.putCategoriesData(updatedData);
//       setCategories(updatedData);
//       setShowModal(false);
//     } else {
//       presentToast("Enter new category");
//     }
//   };

//   const presentToast = (message: string) => {
//     present({
//       message: message,
//       duration: 100,
//       position: "middle",
//     });
//   };

//   const handleDeleteCategory = (index: number) => {
//     const updatedData = categories.filter((_, i) => i !== index);
//     const categoriesData = new CategoriesData();
//     categoriesData.putCategoriesData(updatedData);
//     setCategories(updatedData);
//   };

//   return (
//     <IonContent scrollY={true}>
//       <div style={{ display: "flex", flexDirection: "row" }}>
//         <p
//           style={{
//             fontSize: "28px",
//             marginLeft: "15px",
//             fontWeight: "bold",
//             marginTop: "35px",
//             marginBottom: "10px",
//           }}>
//           Category
//         </p>

//         {editMode && (
//           <IonButtons style={{ marginTop: "27px", marginLeft: "190px" }}>
//             <IonButton onClick={() => setEditMode(false)}>Done</IonButton>
//           </IonButtons>
//         )}
//         <IonIcon
//           id="popover-button"
//           icon={settingsOutline}
//           onClick={openPopover}
//           style={{
//             display: editMode ? "none" : "block",
//             marginTop: "38px",
//             fontSize: "28px",
//             marginLeft: "210px",
//           }}
//         />

//         <IonPopover
//           ref={(ref) => {
//             popover.current = ref;
//           }}
//           trigger="popover-button"
//           dismissOnSelect={true}>
//           <IonContent scrollY={false}>
//             <IonList>
//               <IonItem
//                 button={true}
//                 detail={false}
//                 onClick={openPopover}
//                 id="addCategory">
//                 Add Category
//               </IonItem>
//               <IonItem
//                 button={true}
//                 detail={false}
//                 onClick={openPopover}
//                 id="editCategory">
//                 Edit Category
//               </IonItem>
//             </IonList>
//           </IonContent>
//         </IonPopover>
//       </div>

//       <IonSearchbar showClearButton="focus"></IonSearchbar>

//       <IonList>
//         {categories.map((category, index) => (
//           <IonItem key={index} style={{ padding: "7px", fontSize: "18px" }}>
//             {editMode &&
//               category !== "Default" &&
//               category !== "Achievement" && (
//                 <IonIcon
//                   icon={closeCircleOutline}
//                   style={{
//                     fontSize: "22px",
//                     marginRight: "10px",
//                   }}
//                   onClick={() => handleDeleteCategory(index)}
//                 />
//               )}
//             <IonLabel>{category}</IonLabel>
//             {editMode &&
//               category !== "Default" &&
//               category !== "Achievement" && (
//                 <IonIcon
//                   icon={informationCircleOutline}
//                   style={{ fontSize: "22px" }}
//                   onClick={() => {
//                     setSelectedCategory(category); // Set the selected category
//                     setShowModal(true);
//                   }}
//                 />
//               )}
//           </IonItem>
//         ))}
//       </IonList>

//       {showModal && (
//         <IonModal
//           isOpen={showModal}
//           onDidDismiss={() => setShowModal(false)}
//           presentingElement={presentingElement}>
//           <IonHeader>
//             <IonToolbar>
//               <IonButtons slot="start">
//                 <IonButton
//                   onClick={() => {
//                     setShowModal(false);
//                   }}>
//                   Close
//                 </IonButton>
//               </IonButtons>
//               <IonTitle>New Category</IonTitle>
//               <IonButtons slot="end">
//                 <IonButton onClick={handleDoneClick}>Done</IonButton>
//               </IonButtons>
//             </IonToolbar>
//           </IonHeader>

//           <IonContent scrollY={false}>
//             <div
//               style={{
//                 display: "flex",
//                 justifyContent: "center",
//                 alignItems: "center",
//                 marginTop: "20px",
//               }}>
//               <div
//                 style={{
//                   background: "rgba(70, 70, 70, 0.5)",
//                   width: "350px",
//                   height: "200px",
//                   borderRadius: "10px",
//                 }}>
//                 <div
//                   style={{
//                     display: "flex",
//                     justifyContent: "center",
//                     alignItems: "center",
//                     marginTop: "15px",
//                   }}>
//                   <IonIcon
//                     icon={list}
//                     style={{
//                       fontSize: "68px",
//                       background: "rgba(56, 128, 255)",
//                       padding: "15px",
//                       borderRadius: "50%",
//                     }}
//                   />
//                 </div>
//                 <div
//                   style={{
//                     display: "flex",
//                     justifyContent: "center",
//                     alignItems: "center",
//                     marginTop: "20px",
//                   }}>
//                   <IonInput
//                     ref={categoryRef}
//                     placeholder="Category Name"
//                     style={{
//                       background: "rgba(120, 120, 120, 0.4)",
//                       width: "300px",
//                       borderRadius: "10px",
//                       fontSize: "20px",
//                       color: "rgba(255, 255, 255, 0.5)",
//                       textAlign: "center",
//                     }}
//                     value={selectedCategory} // Set the initial value of the input field
//                   ></IonInput>
//                 </div>
//               </div>
//             </div>
//           </IonContent>
//         </IonModal>
//       )}
//     </IonContent>
//   );
// };

// export default CategoryPage;
