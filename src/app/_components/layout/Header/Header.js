'use client';

'use client';

import { ThemeModeOption } from "./components/ThemeModeOptions";
import { DropDownPopover } from "@app/_components/popovers/DropDownPopover";
import { Button } from '@mui/material';
import { useRouter } from 'next/navigation';
import { UpgradeButton } from './components/UpgradeButton';
import { useAuth } from '@app/_contexts/AuthContext';

function Header() {
  const { user } = useAuth();
  const router = useRouter();

  return (
    <div className="header">
      {user ? (
        <>
          <DropDownPopover />
          <UpgradeButton />
          <AuthUserPopover />
        </>
      ) : (
        <Button 
          variant="contained" 
          onClick={() => router.push('/auth/login')}
        >
          Login
        </Button>
      )}
    </div>
  );
}

export { Header };