import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface IDeleteURLDialog {
  linkId: string;
  alertOpen: boolean;
  setAlertOpen: (val: boolean) => void;
}

export default function DeleteURLDialog({
  linkId,
  alertOpen,
  setAlertOpen,
}: IDeleteURLDialog) {
  const [loading, setLoading] = useState<boolean>(false);
  const mockPromise = (): Promise<void> => {
    return new Promise((resolve) => setTimeout(resolve, 3000));
  };

  const handleDelete = () => {
    setLoading(true);
    mockPromise().finally(() => {
      setLoading(false);
      setAlertOpen(false);
    });
  };

  return (
    <AlertDialog open={alertOpen} onOpenChange={setAlertOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            shortened url record, redirecting by that short link would not work
            anymore. {linkId}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={loading}>Cancel</AlertDialogCancel>
          <Button disabled={loading} onClick={handleDelete}>
            Continue
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
