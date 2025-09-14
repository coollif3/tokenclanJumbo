@@ .. @@
 import { ThemeModeOption } from "./components/ThemeModeOptions";
 import { DropDownPopover } from "@app/_components/popovers/DropDownPopover";
 import { Button } from '@mui/material';
 import { useRouter } from 'next/navigation';
+import { UpgradeButton } from './components/UpgradeButton';
 
 function Header() {
   const { user } = useAuth();
@@ .. @@
         {user ? (
           <>
             <DropDownPopover />
+            <UpgradeButton />
             <AuthUserPopover />
           </>
         ) : (