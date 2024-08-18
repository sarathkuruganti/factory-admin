import {
  HomeIcon,
  ServerStackIcon,
  RectangleStackIcon,
  ShoppingBagIcon,
  DocumentTextIcon,
  ArchiveBoxIcon,
  ClipboardDocumentCheckIcon,
  InformationCircleIcon,
  UserCircleIcon,
} from "@heroicons/react/24/solid";
import { Home, Orders, Products, Invoice, RawMaterials, UsedMaterials, Account, Register } from "@/pages/dashboard";
import { SignIn} from "@/pages/auth";
import { AddNewProduct, InvoiceDetails, AddNewMaterials, AddConsumedMaterial, ViewOrder } from "@/pages/screen";

const icon = {
  className: "w-5 h-5 text-inherit",
};

export const routes = [
  {
    layout: "dashboard",
    pages: [
      {
        icon: <HomeIcon {...icon} />,
        name: "dashboard",
        path: "/home",
        element: <Home />,
      },
      {
        icon: <ShoppingBagIcon {...icon} />,
        name: "products",
        path: "/products",
        element: <Products />,
      },
      {
        icon: <ArchiveBoxIcon {...icon} />,
        name: "materials",
        path: "/materials",
        element: <RawMaterials />,
      },
      {
        icon: <ClipboardDocumentCheckIcon {...icon} />,
        name: "Consumed",
        path: "/Consumed",
        element: <UsedMaterials />,
      },
      {
        icon: <RectangleStackIcon {...icon} />,
        name: "orders",
        path: "/orders",
        element: <Orders />,
      },
      {
        icon: <DocumentTextIcon {...icon} />,
        name: "invoice",
        path: "/invoice",
        element: <Invoice />,
      },
      {
        icon: <InformationCircleIcon {...icon} />, // Changed the icon for register
        name: "register",
        path: "/register",
        element: <Register />,
      },
      {
        icon: <UserCircleIcon {...icon} />,
        name: "account",
        path: "/account",
        element: <Account />,
      },
    ],
  },
  {
    title: "auth pages",
    layout: "auth",
    pages: [
      {
        icon: <ServerStackIcon {...icon} />,
        name: "sign in",
        path: "/sign-in",
        element: <SignIn />,
      },
    ],
  },
  {
    layout: "screen",
    pages: [
      {
        name: "addnewproduct",
        path: "/addnewproduct",
        element: <AddNewProduct />,
      },
      {
        name: "invoicedetails",
        path: "/invoicedetails/:invoiceNumber",
        element: <InvoiceDetails />,
      },
      {
        name: "addnewmaterials",
        path: "/addnewmaterials",
        element: <AddNewMaterials />,
      },
      {
        name: "addconsumedmaterial",
        path: "/addconsumedmaterial",
        element: <AddConsumedMaterial />,
      },
      {
        name: "vieworder",
        path: "/vieworder",
        element: <ViewOrder />,
      },
    ],
  },
];

export default routes;
