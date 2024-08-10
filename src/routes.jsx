import {
  HomeIcon,
  ServerStackIcon,
  RectangleStackIcon,
  ShoppingBagIcon,
  DocumentTextIcon,
  ArchiveBoxIcon,
  ClipboardDocumentCheckIcon,
} from "@heroicons/react/24/solid";
import { Home, Orders, Products, Invoice, RawMaterials, UsedMaterials } from "@/pages/dashboard";
import { SignIn, SignUp } from "@/pages/auth";
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
        name: "raw materials",
        path: "/rawmaterials",
        element: <RawMaterials />,
      },
      {
        icon: <ClipboardDocumentCheckIcon {...icon} />,
        name: "used materials",
        path: "/usedmaterials",
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
      {
        icon: <RectangleStackIcon {...icon} />,
        name: "sign up",
        path: "/sign-up",
        element: <SignUp />,
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
