import {
  FacebookOutlined,
  Instagram,
  LinkedIn,
  Mail,
  MessageOutlined,
  NotificationsActiveRounded,
  Refresh,
  Settings,
  TaskAltOutlined,
  Twitter,
  YouTube,
  CurrencyExchange,
  CurrencyBitcoin,
  Calculate,
  WarningAmber,
  PrivacyTip,
  Policy,
  ContactMail,
} from "@mui/icons-material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { SxProps, Theme } from "@mui/material";

const APP_ICONS = [
  {
    name: "sample",
    Component: EditOutlinedIcon,
    props: { sx: { fontSize: 20 } },
  },
  {
    name: "facebook-outlined",
    Component: FacebookOutlined,
    props: { sx: { fontSize: 20 } },
  },
  {
    name: "twitter",
    Component: Twitter,
    props: { sx: { fontSize: 20 } },
  },
  {
    name: "instagram",
    Component: Instagram,
    props: { sx: { fontSize: 20 } },
  },
  {
    name: "google",
    Component: Instagram,
    props: { sx: { fontSize: 20 } },
  },
  {
    name: "youtube",
    Component: YouTube,
    props: { sx: { fontSize: 20 } },
  },
  {
    name: "linkedin",
    Component: LinkedIn,
    props: { sx: { fontSize: 20 } },
  },
  {
    name: "refresh",
    Component: Refresh,
    props: { sx: { fontSize: 20 } },
  },
  {
    name: "settings",
    Component: Settings,
    props: { sx: { fontSize: 20 } },
  },
  {
    name: "message-outlined",
    Component: MessageOutlined,
  },
  {
    name: "mail",
    Component: Mail,
  },
  {
    name: "task-alt-outlined",
    Component: TaskAltOutlined,
  },
  {
    name: "notifications-active-rounded",
    Component: NotificationsActiveRounded,
  },
  {
    name: "exchanges",
    Component: CurrencyExchange,
  },
  {
    name: "blockchains",
    Component: CurrencyBitcoin,
  },
  {
    name: "tvevRatio",
    Component: Calculate,
  },
  {
    name: "disclaimer",
    Component: WarningAmber,
  },
  {
    name: "privacy",
    Component: PrivacyTip,
  },
  {
    name: "terms",
    Component: Policy,
  },
  {
    name: "contact",
    Component: ContactMail,
  },
];

export { APP_ICONS };
